import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
// import Login from "./login";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit(e) {
        console.log("submit event: ", e);
        e.preventDefault();
        axios
            .post("/register", {
                // image_id: this.state.image_id,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                bio: this.state.bio,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("POST /register data: ", data);
                if (data.success) {
                    // Redirect | Login
                    console.log("POST to registration success");
                    location.replace("/");
                } else {
                    this.setState = {
                        error: true
                    };
                }
            })
            .catch(err => {
                console.log("error in POST /register: ", err);
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
                <article
                    className="card-body mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    <h2 className="card-title mt-3 text-center">
                        <em>R I P P L E</em>
                    </h2>
                    <div className="text-center">
                        <img
                            className="profile-pic-small"
                            src="/logo.png"
                            alt="logo"
                        />
                    </div>

                    <h6 className="card-title mt-3 text-center">
                        <em>Throw a pebble in the pond and make a ripple...</em>
                    </h6>
                    <div className="dropdown-divider"></div>
                    <h5 className="card-title mt-3 text-center">
                        Get started with your free account
                    </h5>

                    <form className="form-group input-group">
                        {this.state.error && (
                            <p className="error">
                                Ooops! Something went wrong. Please try again.
                            </p>
                        )}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    {" "}
                                    <i className="fa fa-user"></i>{" "}
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Firstname"
                                type="text"
                                name="firstname"
                                onChange={e => this.handleChange(e.target)}
                            />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    {" "}
                                    <i className="fa fa-user"></i>{" "}
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Lastname"
                                type="text"
                                name="lastname"
                                onChange={e => this.handleChange(e.target)}
                            />
                        </div>
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
                                    <i className="fas fa-edit"></i>{" "}
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Biography"
                                type="text"
                                name="bio"
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
                            Register
                        </button>
                    </form>
                    <div>
                        <p className="text-center">
                            Already a member? <Link to="/login">Log in</Link>
                        </p>
                    </div>
                </article>
            </div>
        );
    }
}
