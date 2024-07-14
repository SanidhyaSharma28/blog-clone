import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../hooks';

export const Appbar = () => {
    
    const {user } = useData();
    const navigate=useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMouseEnter = () => {
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setMenuOpen(false);
    };

    const logout=async()=>{
        localStorage.removeItem("token")
        navigate('/signin')
    }

    return (
        <div className="flex justify-between py-2 border-b-2 px-5">
            <div onClick={()=>{
                navigate('/blogs')
            }} className="flex flex-col justify-center text-3xl font-bold font-serif cursor-pointer">
                Medium
            </div>
            <div className='flex '>
                <div className='flex flex-col justify-center'>
                <Link to={`/publish`}>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Write a Blog</button>
                </Link>
                </div>
            <div
                data-popover-target="menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Avatar name={user?.name ||"Anonymous"} />

                {menuOpen && (
                    <ul
                    role="menu"
                    data-popover="menu"
                    data-popover-placement="bottom"
                    className="absolute z-10 max-w-max overflow-auto rounded-md border border-blue-gray-50 bg-white pt-1 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                    >
                        <li
                            role="menuitem"
                            onClick={()=>{
                                navigate('/profile')
                            }}
                            className="text-lg pl-1 block cursor-pointer select-none whitespace-nowrap border-b-2 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                            >
                            Profile
                        </li>
                        <li
                            role="menuitem"
                            onClick={logout}
                            className="text-lg block cursor-pointer select-none whitespace-nowrap px-1 border-b-2 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                            >
                            Logout
                        </li>
                    </ul>
                )}
            </div>
        </div>
</div>
    );
};

const Avatar = ({ name }: { name: string }) => {
    return (
        <div className="relative mr-7 inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-none">
                {name[0]}
            </span>
        </div>
    );
};
