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
        <ul className="nav-bar">
            <div>
                <Link className="nav-link" to="/friends">Friends</Link>
            </div>
            |
            <div>
                <Link className="nav-link" to="/chat">Chat</Link>
            </div>
            |
            <div>
                <Link  className="nav-link" to="/newusers">Find Users</Link>
            </div>
            |
            <div>
                <Link  className="nav-link" to="/">Profile</Link>
            </div>
            |
            <div>
                <Link  className="nav-link" to="/onlineusers">{total} Online users</Link>
            </div>
            |
            <div>
                <Link  className="nav-link" to="/logout">Logout</Link>
            </div>
        </ul>
    );
}
