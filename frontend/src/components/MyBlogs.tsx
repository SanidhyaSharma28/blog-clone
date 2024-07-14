import { useCallback, useEffect, useState } from "react";
import { usePersonal } from "../hooks";
import { BlogCard } from "./BlogCard";


export const MyBlogs = () => {
    const { loading, blogs } = usePersonal();
    const [currentPage, setCurrentPage] = useState(0);
    const blogsPerPage = 2;

    useEffect(() => {
        setCurrentPage(0); // Reset to the first page whenever blogs change
    }, [blogs]);

    const displayedBlogs = blogs.slice(
        currentPage * blogsPerPage,
        (currentPage + 1) * blogsPerPage
    );

    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [currentPage, totalPages]);

    const goToPrevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentPage]);


    if (blogs.length===0) {
        return(
            <div>
                You have not posted any blog yet.
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center">
                <div>Loading......</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className="w-full max-w-5xl overflow-y-auto"
                style={{ maxHeight: "80vh" }}
            >
                {displayedBlogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.createdAt}
                    />
                ))}
            </div>
            <div className="flex mt-4">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className="mr-2 p-2 bg-blue-500 text-white rounded"
                >
                    Previous
                </button>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
            <div className="mt-2">
                Page {currentPage + 1} of {totalPages}
            </div>
        </div>
    );
};
