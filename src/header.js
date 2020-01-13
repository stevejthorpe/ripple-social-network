import React from "react";

import ProfilePic from "./profile-pic";
import NavBar from "./navbar";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log("props | header: ", props);
        this.state = {};
    }
    render() {
        return (
            <>
                <div className="nav-bar navbar navbar-expand-sm navbar-light bg-light">
                    <img
                        className="img-thumbnail rounded float-left profile-pic-tiny"
                        src="/logo.png"
                        alt="logo"
                    />
                    <h1>
                        <em>r i p p l e</em>
                    </h1>

                    <NavBar />

                    <img
                        className="img-thumbnail rounded float-right profile-pic-tiny"
                        src={this.props.imageUrl}
                        alt="profile pic"
                        onClick={this.props.toggleUploader}
                    />
                </div>
            </>
        );
    }
}

//
// <ProfilePic
//     src={this.props.imageUrl}
//     onClick={this.props.toggleUploader}
//     className="profile-pic-small"
// />;
