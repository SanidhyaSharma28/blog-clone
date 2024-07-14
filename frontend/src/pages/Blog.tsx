import { useParams } from "react-router-dom"
import { useBlog, } from "../hooks"
import { ContentCard } from "../components/ContentCard"
import { Appbar } from "../components/Appbar";
import { BackButton } from "../components/BackButton";

export const Blog=()=> {
  
  
  
  const {id}=useParams()
  
  
  const {loading,blog}=useBlog({
    id:id || ""
  })
  console.log(blog);
  
  
  if (loading) {
    
    return (<>
<div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
    </div>
</div>
    </>
    )
  }
  
  return (
    <div>
        <Appbar/>
        <BackButton link="/blogs"/>
        {blog ? (
          <ContentCard blog={blog} />
        ) : (
            <div>
                Blog not found. Check URL Again and check id passed as parameter
            </div>
        )}
    </div>
);
  }
  