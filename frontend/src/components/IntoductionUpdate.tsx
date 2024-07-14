
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";


export const IntroductionUpdate = ({setUpdatedIntro}:{setUpdatedIntro:any}) => {

    const [intro,setIntro]=useState("")

    const updateIntro = async (event:any) => {
        event.preventDefault(); // Prevent the default form submission

        try {
            await axios.put(
                `${BACKEND_URL}/api/v1/user/profile/intro`,
                { intro: intro },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setUpdatedIntro(intro);
            setIntro("")
        } catch (error) {
            console.error('Error updating introduction:', error);
            // Optionally handle the error, e.g., show a message to the user
        }
    };

    console.log(intro);

    return (
        <div className="w-full">
            <div className="relative h-24 w-full min-w-[200px]">
                <form onSubmit={updateIntro}> {/* Add onSubmit handler */}
                    <div className="w-full mb-4 rounded-lg">
                        <div className="px-1 py-1 bg-white rounded-t-lg ">
                            <label htmlFor="comment" className="sr-only">Your Introduction</label>
                            <textarea
                                onChange={(e) => { setIntro(e.target.value); }}
                                id="comment"
                                className="w-full focus:ring-0 border-2"
                                placeholder="Write about yourself..."
                                required
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 ">
                            <button
                                type="submit" // Ensure this is a submit button
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                            >
                                Save Intro
                            </button>
                        </div>
                    </div>
                </form>
                <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"></path>
                    </svg>
                    Write a catchy Introduction about yourself for readers too read, not too long.
                </p>
            </div>
        </div>
    );
}
