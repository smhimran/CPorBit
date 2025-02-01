import NotificationListItem from "../NotificationListItem";
import {Link} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";

function NotificationsList({setShowNotifications}) {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem("auth_token");

    useEffect(() => {
        axios
            .get("/api/notifications/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                setNotifications(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="absolute -right-50 top-10 md:right-0 z-20 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="rounded-lg">
                <div className="">
                    {notifications.length === 0 ? (
                        <p className="text-center text-gray-700 dark:text-gray-200 font-bold text-md m-2 p-2">
                            No notifications
                        </p>
                    ) : (
                        <ul
                            className="list-none w-11/12 mx-auto"
                            onClick={() => setShowNotifications(false)}
                        >
                            {notifications.map(
                                (notification, index) => (
                                    <NotificationListItem
                                        id={notification.id}
                                        notification_type={
                                            notification.notification_type
                                        }
                                        is_read={notification.is_read}
                                        index={index}
                                        key={index}
                                    />
                                )
                            )}
                        </ul>
                    )}
                </div>
                <div className="text-center py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500">
                    <Link
                        to="/notifications"
                        className="text-decoration-none text-primary dark:text-gray-200 font-bold"
                        onClick={() => setShowNotifications(false)}
                    >
                        Show all
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotificationsList;
