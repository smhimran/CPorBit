import React from "react";
import zoro from "../../images/zoro_lost.png";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="py-4 flex justify-center">
                <img className="h-96 rounded-md shadow-md" src={zoro} alt="Lost Zoro illustration"/>
            </div>
            <div className="mt-6 text-center">
                <h1 className="text-3xl font-extrabold text-primary">
                    Oops! You're lost too...
                </h1>
                <p className="mt-2 text-base text-gray-500">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <div className="mt-4 flex justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 text-base font-medium text-white bg-primary rounded-full flex items-center space-x-2"
                    >
                        <span>Go to Homepage</span>
                        <span><i className="fa fa-arrow-circle-right text-white"></i></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;