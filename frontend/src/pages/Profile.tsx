import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { UserProfile } from "../components/UserProfile";
import { useData } from "../hooks";

export const Profile = () => {
    const { loading, user } = useData();
    const [updatedIntro, setUpdatedIntro] = useState("");

    useEffect(() => {
        if (user) {
            setUpdatedIntro(user.intro); // Set updatedIntro when user data is available
        }
    }, [user]); // Only run this effect when user changes

    console.log("updated:", updatedIntro);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Appbar  />
            <div className="grid grid-cols-8 h-screen">
                <div className="col-span-5 border-r-2 pt-20 h-full pl-48 pr-20">
                    <UserProfile
                        setUpdatedIntro={setUpdatedIntro}
                        name={user?.name || "Anonymous"}
                    />
                </div>
                <div className="col-span-3">
                    <div className="ml-10 mt-10">
                        <div className="flex">
                            <Avatar name={user?.name || "Anonymous"} />
                            <div className="ml-5">
                                <div className="mt-3 font-semibold text-lg">{user?.name}</div>
                                <div className="font-thin">{user?.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 max-w-xs">
                            {updatedIntro || "User has not added any intro right now"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Avatar = ({ name }:{name:string}) => {
    return (
        <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-4xl font-medium text-gray-600 dark:text-gray-300 leading-none">
                {name[0]}
            </span>
        </div>
    );
};
