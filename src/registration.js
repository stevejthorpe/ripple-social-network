import React from "react";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit() {
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
                if (data.sucess) {
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
    // <label></label>

    render() {
        return (
            <form className="reg-form">
                {this.state.error && <div className="error">Ooops!</div>}
                <input
                    name="firstname"
                    autoComplete="firtname"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="lastname"
                    autoComplete="lastname"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    type="email"
                    autoComplete="email"
                    name="email"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    autoComplete="biography"
                    name="bio"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={() => this.submit()}>Register</button>
            </form>
        );
    }
}
// <input type="hidden" name="_csrf" value="{{csrfToken}}" />
