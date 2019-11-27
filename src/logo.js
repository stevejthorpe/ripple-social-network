import React from "react";

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <img className="welcome-logo" src="/logo.png" alt="logo" />;
    }
}
