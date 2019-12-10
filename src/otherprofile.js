import React from "react";
import axios from "./axios";
import { FriendButton } from "./friendbutton";
import ProfilePic from "./profile-pic";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match: ", this.props.match);
        console.log("this.props.match.params.id: ", this.props.match.params.id);

        axios
            .get("/api/user/" + this.props.match.params.id)
            .then(({ data }) => {
                console.log("Data: ", data);
                if (this.props.match.params.id == data.id) {
                    return this.props.history.push("/");
                } else {
                    this.setState({
                        firstname: data.user.firstname,
                        lastname: data.user.lastname,
                        imageUrl: data.user.image,
                        bio: data.user.bio
                    });
                }
            })
            .catch(err => {
                console.log("Error in GET api/user: ", err);
            });
    }
    render() {
        return (
            <div className="user-profile">
                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    imageUrl={this.state.imageUrl}
                />

                <div>
                    <h1 className="user-profile-aside">
                        {this.state.firstname} {this.state.lastname}
                    </h1>
                    <p>{this.state.bio}</p>
                </div>
                <FriendButton
                    className="btn profile-btn"
                    otherId={this.props.match.params.id}
                />
            </div>
        );
    }
}
