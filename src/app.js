import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profile-pic";
import FindPeople from "./findpeople";
import Uploader from "./uploader";
import { Profile } from "./profile";
import Header from "./header";
import { OtherProfile } from "./otherprofile";
import Friends from "./friends";
import Chat from "./chat";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateImg = this.updateImg.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    async componentDidMount() {
        let { data } = await axios.get("/user.json");
        console.log("App | getUserData: ", data);
        let { id, image, firstname, lastname, email, bio } = data;
        this.setState(
            {
                id: id,
                imageUrl: image,
                firstname: firstname,
                lastname: lastname,
                email: email,
                bio: bio
            },
            () =>
                console.log("APP | componentDidMount this.state: ", this.state)
        );
    }
    toggleUploader() {
        console.log("toggleUploader running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    updateImg(imageUrl) {
        console.log("updateImg running");
        this.setState({
            imageUrl: imageUrl
        });
        this.toggleUploader();
    }
    setBio(bio) {
        console.log("setBio running");
        this.setState({
            bio: bio
        });
    }
    render() {
        if (!this.state.firstname) {
            return null;
        }
        return (
            <div className="outer">
                {this.state.uploaderIsVisible && (
                    <Uploader
                        updateImg={this.updateImg}
                        toggleUploader={this.toggleUploader}
                    />
                )}
                <BrowserRouter>
                    <Header
                        id={this.state.id}
                        imageUrl={this.state.imageUrl}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        toggleUploader={this.toggleUploader}
                    />

                    <div className="app">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <>
                                    <Profile
                                        id={this.state.id}
                                        imageUrl={this.state.imageUrl}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        bio={this.state.bio}
                                        toggleUploader={this.toggleUploader}
                                        setBio={this.setBio}
                                    />
                                </>
                            )}
                        />
                        <Route path="/newusers" component={FindPeople} />
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route
                            exact
                            path="/friends"
                            render={() => <Friends />}
                        />
                        <Route exact path="/chat" component={Chat} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
// <Route path="/newusers" render={() => <FindPeople />} />

// <Route path="/friends" component={Friends} />

// <Profile
//     id={this.state.id}
//     imageUrl={this.state.imageUrl}
//     firstname={this.state.firstname}
//     lastname={this.state.lastname}
//     bio={this.state.bio}
//     toggleUploader={this.toggleUploader}
//     setBio={this.setBio}
// />
//
// <ProfilePic
//     firstname={this.state.firstname}
//     lastname={this.state.lastname}
//     imageUrl={this.state.imageUrl}
//     toggleUploader={this.toggleUploader}
// />
