import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("In POST /login");
                console.log("POST /login data: ", data);
                if (data.success) {
                    console.log("login worked | redirect to /");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("Error in POST /login: ", err);
                this.setState = {
                    error: true
                };
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    // handleChange({ target }) {
    //     this.setState({
    //         [target.name]: target.value
    //     });
    // }
    render() {
        return (
            <div>
                <h3>login</h3>
                {this.state.error && (
                    <p className="error">
                        Oops, something went wrong. Please try again.
                    </p>
                )}

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
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Login
                    </button>
                </form>
                <div>
                    <p>
                        Take me back to <Link to="/">registration</Link>
                    </p>
                </div>
            </div>
        );
    }
}
