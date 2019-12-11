import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // async submit(e) {
    //     e.preventDefault();
    //     try {
    //         const { data } = axios.post("/login", {
    //             email: this.state.email,
    //             password: this.state.password
    //         });
    //         console.log("This: ", this.state);
    //
    //         data ? location.replace("/") : this.setState({ error: true });
    //     } catch (err) {
    //         console.log("Login error: ", err);
    //         this.setState({
    //             error: true
    //         });
    //     }
    // }
    submit(e) {
        e.preventDefault();
        // console.log("This: ", this.state);
        // console.log(this.state.email);
        // console.log(this.email);
        // console.log(this.state.password);
        // console.log(this.password);

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
                    location.replace("/"); // Replace history, cant go back.
                } else {
                    console.log("Error in login | POST/login");
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("Error in POST / login: ", err);
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

                <form className="login-form">
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
                        onClick={e => {
                            this.submit(e);
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
