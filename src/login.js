import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("In POST /login");
                console.log("POST /login data: ", data);
            })
            .catch(err => {
                console.log("Error in POST /login: ", err);
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    render() {
        return (
            <div>
                <h1>I am the login</h1>
                <Link to="/">Take me to registration</Link>
                <form>
                    <label htmlFor="email">
                        Email:
                        <input
                            type="email"
                            autoComplete="email"
                            name="email"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            autoComplete="current-password"
                            name="password"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>
                    <button
                        className="ripple"
                        onClick={e => {
                            e.preventDefault();
                            this.submit();
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}
