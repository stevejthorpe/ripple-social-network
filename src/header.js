import React from "react";

import ProfilePic from "./profile-pic";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log("props | header: ", props);
        this.state = {};
    }
    render() {
        return (
            <div className="header">
                <img
                    className="welcome-logo-small"
                    src="/logo.png"
                    alt="logo"
                />
                <p>
                    <em>r i p p l e</em>
                </p>

                <img
                    className="profile-pic-small"
                    src={this.props.imageUrl}
                    alt="profile pic"
                    onClick={this.props.toggleUploader}
                />
            </div>
        );
    }
}

//
// <ProfilePic
//     src={this.props.imageUrl}
//     onClick={this.props.toggleUploader}
//     className="profile-pic-small"
// />;
