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

    render() {
        return (
            <div className="card bg-light d-flex align-items-center">
                <h2 className="card-title mt-3 text-center">log in</h2>
                <article className="card-body mx-auto">
                    {this.state.error && (
                        <p className="error">
                            Oops, something went wrong. Please try again.
                        </p>
                    )}

                    <div className="dropdown-divider"></div>

                    <form className="form-group input-group">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    {" "}
                                    <i className="fa fa-envelope"></i>{" "}
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Email"
                                type="text"
                                name="email"
                                onChange={e => this.handleChange(e.target)}
                            />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    {" "}
                                    <i className="fa fa-lock"></i>{" "}
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Password"
                                type="text"
                                name="password"
                                onChange={e => this.handleChange(e.target)}
                            />
                        </div>

                        <button
                            className="btn btn-primary btn-block"
                            onClick={e => {
                                this.submit(e);
                            }}
                        >
                            Login
                        </button>
                    </form>
                    <div>
                        <p className="text-center">
                            Take me back to <Link to="/">registration</Link>
                        </p>
                    </div>
                </article>
            </div>
        );
    }
}
