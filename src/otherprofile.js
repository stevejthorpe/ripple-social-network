import React from "react";
import axios from "./axios";

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
                    this.props.history.push("/");
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

        // try {
        //     console.log("In componentDidMount");
        //     let { data } = await axios.get(
        //         `api/user/` + this.props.match.params.id
        //     );
        //     console.log("/geturserprofile data: ", data);
        // } catch (err) {
        //     console.log("Error: ", err);
        // }

        // let { id, image, firstname, lastname, email, bio } = data;

        // Figure out of the users id is the same as the users id. If so, redirect to / route.
        // make req to server for login in user id.(req.session)

        // if (this.props.match.params.id == req.session.userId) {
        //     this.props.history.push("/");
        // }
    }
    // getUserProfile() {
    //     console.log("getUserProfile is running");
    //     try {
    //
    //     } catch (err) {
    //         console.log("Error | getUserProfile: ", err);
    //     }
    // }
    render() {
        return (
            <div className="user-profile">
                <img src={this.state.imageUrl} />
                <div>
                    <h1 className="user-profile-aside">
                        {this.state.firstname} {this.state.lastname}
                    </h1>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
