import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs=()=> {
  const { loading, blogs } = useBlogs();
  
  

  
  if (loading) {
    return <div>
        <Appbar  /> 
        
        <div  className="flex justify-center">
            <div className="w-screen max-w-5xl">
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </div>
        </div>
    </div>
}


return (
    
    <>
        <Appbar />
        
        <div className="flex justify-center">
            <div className="w-screen max-w-5xl">
            {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt}
                />)}
            </div>
        </div>
    </>
  )
}
