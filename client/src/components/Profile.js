import React, {useEffect, useState} from "react";
import ProfileBody from "./Profile/ProfileBody";
import ProfileSidebar from "./Profile/ProfileSidebar";
import {Redirect, useParams} from "react-router-dom";
import axios from "axios";

function Profile() {
    const {username} = useParams();
    const [userExists, setUserExists] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/api/standings/profile/${username}/`)
            .then(res => {
                if (res.status === 404) {
                    setUserExists(false)
                } else {
                    setIsLoading(false)
                }
            })
            .catch(err => {
                setUserExists(false)
                setIsLoading(false)
            })
    }, [username]);

    if (userExists) {
        return (
            <>
                {
                    isLoading ? (
                            <div className="mt-5 flex justify-center items-center">
                                <div
                                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        )
                        :
                        (

                            <div className="dark:bg-gray-800  py-4 h-screen">
                                <div className="container px-6 mx-auto">
                                    <div className="profileContainer">
                                        <ProfileSidebar username={username}/>
                                        <ProfileBody/>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </>
        );
    } else {
        return <Redirect to="/not-found"/>
    }

}

export default Profile;
