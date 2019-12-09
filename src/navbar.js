import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <ul className="nav-bar">
            <div>
                <Link to="/friends">Friends</Link>
            </div>
            <div>
                <Link to="/newusers">Find Users</Link>
            </div>
            <div>
                <Link to="/logout">Logout</Link>
            </div>
        </ul>
    );
}
