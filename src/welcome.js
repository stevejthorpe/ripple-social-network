import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container">
                <div className="nav">
                    <img
                        className="profile-pic-small"
                        src="/logo.png"
                        alt="logo"
                    />
                    <h1>Welcome to R I P P L E</h1>
                    <p>Throw a pebble in the pond and make a ripple...</p>
                </div>

                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
