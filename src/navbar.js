import React from "react";
import { Link } from "react-router-dom";
// import OnlineUsers from "./online-users";

import { useSelector } from "react-redux";

export default function NavBar() {
    const onlineUsers = useSelector(state => state && state.onlineUsersArr);
    console.log("OnlineUsersArr in component: ", onlineUsers);

    let total = 0;

    if (!onlineUsers) {
        return null;
    } else {
        total = onlineUsers.length;
    }

    return (
        <nav className="nav navbar navbar-expand-sm navbar-light bg-light justify-content-center">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/friends">
                        Friends
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/chat">
                        Chat
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/newusers">
                        Find Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/onlineusers">
                        {total} Online Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
