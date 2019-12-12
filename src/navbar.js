import React from "react";
import { Link } from "react-router-dom";
// import OnlineUsers from "./online-users";

// import { useSelector } from "react-redux";

export default function NavBar() {
    // const onlineUsers = useSelector(state => state && state.onlineUsersArr);
    // console.log("OnlineUsersArr in component: ", onlineUsers);
    //
    // let total = onlineUsers.length;

    return (
        <ul className="nav-bar">
            <div>
                <Link to="/friends">Friends</Link>
            </div>
            <div>
                <Link to="/chat">Chat</Link>
            </div>

            <div>
                <Link to="/newusers">Find Users</Link>
            </div>
            <div>
                <Link to="/logout">Logout</Link>
            </div>
            <div>
                <Link to="/">Profile</Link>
            </div>
            <div>
                <Link to="/onlineusers">| Users Online</Link>
            </div>
        </ul>
    );
}
