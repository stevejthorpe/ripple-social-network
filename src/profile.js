// ProfilePic
// BioEditer
import React from "react";
import ProfilePic from "./profile-pic";
import { BioEditor } from "./bio-editor";

export function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div>
            <h1>
                I am the profile component! {props.firstname} {props.lastname}
            </h1>
            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                imageUrl={props.imageUrl}
            />
            <BioEditor bio={props.bio} setBio={props.setBio} />
        </div>
    );
}
