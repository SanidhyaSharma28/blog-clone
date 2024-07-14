import { formatDateAndTimeIST } from "../assets/formatDate";

interface Blog {
    "content": string;
    "title": string;
    "id": string
    "createdAt":string
    "author": {
        "name": string
        "intro":string    
    }
}


export const ContentCard = ({ blog }: {blog: Blog}) => {
    
    return <div>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold ">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on {formatDateAndTimeIST(blog.createdAt)}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg border-b-2">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar  name={blog.author.name || "Anonymous" } />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                {blog.author.intro || "Random catch phrase about the author's ability to grab the user's attention"}
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}

const Avatar = ({ name }: { name: string }) => {
    return (
        <div className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xl font-medium text-gray-600 dark:text-gray-300 leading-none">
                {name[0]}
            </span>
        </div>
    );
};