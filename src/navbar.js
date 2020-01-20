import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// import ProfilePic from "./profile-pic";
// import NavBar from "./navbar";

const Header = props => {
    const onlineUsers = useSelector(state => state && state.onlineUsersArr);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    let total = 0;

    if (!onlineUsers) {
        return null;
    } else {
        total = onlineUsers.length;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md">
                <a
                    className="navbar-brand"
                    href="https://github.com/stevejthorpe/ripple-social-network"
                >
                    <img
                        className="img-thumbnail rounded float-left profile-pic-tiny"
                        src="/logo.png"
                        alt="ripple logo"
                    />
                </a>

                <h1>
                    <em className="">r i p p l e</em>
                </h1>

                <button
                    className="custom-toggler navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navBarContent"
                    aria-controls="navBarContent"
                    aria-expanded={!isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div
                    className={`${
                        isNavCollapsed ? "collapse" : ""
                    } navbar-collapse`}
                    id="navBarContent"
                >
                    <Link className="nav-link" to="/friends">
                        Friends
                    </Link>
                    <Link className="nav-link" to="/chat">
                        Chat
                    </Link>
                    <Link className="nav-link" to="/newusers">
                        Find Users
                    </Link>
                    <Link className="nav-link" to="/">
                        Profile
                    </Link>
                    <Link className="nav-link" to="/onlineusers">
                        <span className="badge badge-info">{total}</span> <i className="fas fa-users"></i>
                    </Link>
                    <Link className="nav-link" to="/logout">
                        Logout
                    </Link>
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item avatar">
                            <a className="nav-link p-0" href="#">
                                <img
                                    className="avatar rounded-circle d-flex align-self-center mr-2 z-depth-1 profile-pic-tin"
                                    src={props.imageUrl}
                                    alt="avatar image"
                                    onClick={props.toggleUploader}
                                    height="40"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
