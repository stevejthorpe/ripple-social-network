import React from "react";

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
                    {this.props.firstname} {this.props.lastname}
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
