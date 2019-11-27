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
                    // Something
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
            <div>
                <h3>Register now.</h3>
                <form className="reg-form">
                    {this.state.error && <div className="error">Ooops!</div>}
                    <label htmlFor="firstname">
                        Firstname:
                        <input
                            name="firstname"
                            autoComplete="firtname"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>
                    <label htmlFor="lastname">
                        Lastname:
                        <input
                            name="lastname"
                            autoComplete="lastname"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input
                            type="email"
                            autoComplete="email"
                            name="email"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>
                    <label htmlFor="biography">
                        Bio:
                        <input
                            autoComplete="biography"
                            name="bio"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            autoComplete="new-password"
                            name="password"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </label>

                    <button
                        className="ripple"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Register
                    </button>
                </form>
                <div>
                    <p>
                        Already a member? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}
