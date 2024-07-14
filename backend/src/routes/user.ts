import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signupInput,signinInput } from "100xsani2-medium-common";
import z from "zod"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
      userId:string,
    }
}>();


const introductionInput=z.object({
  intro:z.string().max(350,"Introduction cant be longer than 350")
})




userRouter.use('/profile/*',async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
  }

  const token = jwt.split(' ')[1];
  try {
      const payload = await verify(token, c.env.JWT_SECRET);
      if (payload) {
          c.set('userId', String(payload.id));
          await next();
      } else {
          c.status(403);
          return c.json({ message: "You are not logged in" });
      }
  } catch (error) {
      c.status(403);
      return c.json({ message: "You are not logged in" });
  }
});


// Routes:-
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success}=signupInput.safeParse(body)
    if (!success) {
      c.status(411)
      c.json({
        "message":"Incorrect Inputs"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name:body.name
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token
    })
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success}=signinInput.safeParse(body)
    if (!success) {
      c.status(411)
      c.json({
        "message":"Incorrect Inputs"
      })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
    password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})

userRouter.put('/profile/intro', async (c) => {
  const userId = c.get('userId');
  console.log('User ID:', userId); // Check the userId

  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, error } = introductionInput.safeParse(body);
  
  if (!success) {
      c.status(411);
      return c.json({
          message: "Incorrect Inputs",
          errors: error.errors,
      });
  }

  if (!userId) {
      c.status(403);
      return c.json({ error: "User ID not found" });
  }

  await prisma.user.update({
      where: { id: userId },
      data: { intro: body.intro },
  });

  return c.json({ intro: body.intro });
});
userRouter.get('/profile', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    
    const user = await prisma.user.findUnique({
        where: {
          id:c.get('userId')
        },
        select:{
          name:true,
          email:true,
          intro:true,
          id:true
        }
        
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    
    return c.json({ user});
})
