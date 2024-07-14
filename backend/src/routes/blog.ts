import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { createBlogInput,updateBlogInput } from "100xsani2-medium-common";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        if (payload) {
            c.set('userId',String(payload.id));
            await next()
        }
        else{
            c.status(403);
            return c.json({
                message:"You are not logged in"
            })
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }

});

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success}=createBlogInput.safeParse(body)
    if (!success) {
      c.status(411)
      c.json({
        "message":"Incorrect type of blog inputs"
      })
    }
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success}=updateBlogInput.safeParse(body)
    if (!success) {
      c.status(411)
      c.json({
        "message":"Incorrect Inputs for updating the blog"
      })
    }
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
		select:{
			
			content:true,
			title:true,
			id:true,
			createdAt:true,
			authorId:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json({posts});
})

blogRouter.get('/personal', async (c) => {
	
	const userId = c.get('userId');
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
		const posts = await prisma.post.findMany({
			where: {
				authorId:userId
			},
			select:{
				title:true,
				content:true,
				id:true,
				createdAt:true,
				author:{
					select:{
						name:true
					}
				}
			}
		});
		return c.json({posts});
    } catch (error) {
		c.status(411)
        return c.json({
			error:error
        })
    }
	
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
		const post = await prisma.post.findFirst({
				where: {
					id:String(id)
				},
				select:{
					title:true,
					content:true,
					id:true,
					createdAt:true,
					author:{
						select:{
							name:true,
							intro:true
						}
					}
				}
			});
			return c.json({post});
	} catch (error) {
		c.status(411)
		return c.json({
			error:error
		})
	}

})

blogRouter.delete('bulk',async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
		
        const deleteResult = await prisma.post.deleteMany({

        });

        return c.json({
            message: `Deleted ${deleteResult.count} blog(s)`,
        });
    } catch (error) {
        console.error('Error deleting posts:', error);
        return c.json({ error: 'Failed to delete blog posts' });
    }

})

