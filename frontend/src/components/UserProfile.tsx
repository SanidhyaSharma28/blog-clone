import { useState } from "react";
import { IntroductionUpdate } from "./IntoductionUpdate"
import { MyBlogs } from "./MyBlogs";

export const UserProfile=({name,setUpdatedIntro}:{name:string,setUpdatedIntro:any})=>{
    const [activeTab, setActiveTab] = useState('about'); // State to manage active tab

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <div>
                <div className="flex m-l-15 m-r-8 text-4xl font-semibold">
                    {name}
                </div>
                <div className="mt-10 border-b-2 text-lg mb-4">
                <div className="mt-6 flex space-x-6">
                <TabButton
                    label="About"
                    isActive={activeTab === 'about'}
                    onClick={() => handleTabClick('about')}
                />
                <TabButton
                    label="My Blogs"
                    isActive={activeTab === 'myblogs'}
                    onClick={() => handleTabClick('myblogs')}
                />
            </div>
                </div>
                <div>
                {activeTab === 'about' && <IntroductionUpdate  setUpdatedIntro={setUpdatedIntro}  />}
                {activeTab === 'myblogs' && <div className="mt-6"><MyBlogs/></div>}
                </div>
        </div>
    )
}


const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => {
    return (
        <button
            className={`px-4 py-2 text-sm font-medium ${isActive ? 'text-gray-800 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};