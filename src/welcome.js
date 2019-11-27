import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Register from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="welcome-div">
                <h1>Welcome to R I P P L E</h1>
                <img className="welcome-logo" src="/logo.png" alt="logo" />
                <p>Throw a pebble in the pond and make a ripple...</p>
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
