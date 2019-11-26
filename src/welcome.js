import React from "react";
import Register from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Welcome to R I P P L E</h1>
                <img className="welcome-logo" src="/logo.png" alt="logo" />
                <p>Throw a pebble in the pond and make a ripple...</p>
                <h3>Register now.</h3>
                <div>
                    <Register />
                </div>
            </div>
        );
    }
}
