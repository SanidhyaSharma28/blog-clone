import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


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
interface Quote {
    "quote": string;
    "author": string;
    "profession": string ;
  }
interface User {
    "email": string;
    "id": string;
    "intro": string ;
    "name":string
  }
  


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}
export const usePersonal = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/personal`, {
            headers: {
                
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
    }, [blogs])

    return {
        loading,
        blogs
    }
}





export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useData = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        user
    }

}

export const useQuote=({quotes}:{quotes:Quote[]})=>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setHidden(true); // Slide out animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length); // Cycle through quotes array
        setHidden(false); // Slide in animation
      }, 100);
    }, 4000); // Interval time between switching quotes

    return () => clearInterval(interval);
  }, [quotes]);

  const currentQuote = quotes[currentIndex];
  const nextQuote = quotes[(currentIndex+1)%quotes.length];
  return{
    currentQuote,
    hidden,
    nextQuote
  }

}