import { Link } from "react-router-dom"
import { formatDateAndTimeIST } from "../assets/formatDate"

interface BlogCardProps{
    title:string,
    id:string,
    content:string,
    authorName:string,
    publishedDate:string
}

export const BlogCard=({id,authorName,title,content,publishedDate}:BlogCardProps)=>{
    console.log(publishedDate);
    
    publishedDate=formatDateAndTimeIST(publishedDate)
    return (<div className="border-b my-2 border-slate-200 mt-10 w-full ">
        <div className="flex">
            <Avatar name={authorName}/>    
            <div className="pl-2 flex flex-col justify-center" >
                {authorName}
            </div> 
            <div className="flex flex-col justify-center pl-2 pt-1">
                <Circle/>
            </div>
            <div className="font-thin pl-2 text-slate-600 flex flex-col justify-center">
             {publishedDate}
            </div>
        </div>
        <Link to={`/blog/${id}`}>
        <div className="text-xl font-semibold mb-2 mt-2 cursor-pointer">
            {title}
        </div>
        </Link>
        <div className="font-serif">
            {content.length>100 ? content.slice(0,200)+".......":content}
        </div>
        <div className="my-8 font-thin text-sm text-slate-500">
            {`${Math.ceil(content.length/100)} minutes read`}
        </div>
    </div>)
}


const Circle=()=>{
    return(
        <div className="h-1 w-1 rounded-full bg-slate-600">
            
        </div>
    )
}

const Avatar = ({ name }: { name: string }) => {
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-none">
                {name[0]}
            </span>
        </div>
    );
};
