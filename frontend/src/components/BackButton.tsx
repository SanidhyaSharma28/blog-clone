import { useNavigate } from "react-router-dom"


export const BackButton=({link}:{link:string})=>{
    const navigate=useNavigate();
    const goback=()=>{
        navigate(link)

    }

    return(
        <div>
            <button onClick={goback} className="m-2 inline-flex items-center px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white text-sm font-medium rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
	            Go to blogs
            </button>
        </div>
    )
}

