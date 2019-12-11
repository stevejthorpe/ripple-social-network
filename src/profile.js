// ProfilePic
// BioEditer
import React from "react";
import ProfilePic from "./profile-pic";
import { BioEditor } from "./bio-editor";
import { FriendButton } from "./friendbutton";

export function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="profile">
            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                imageUrl={props.imageUrl}
                onClick={props.toggleUploader}
            />
            <BioEditor
                firstname={props.firstname}
                lastname={props.lastname}
                bio={props.bio}
                setBio={props.setBio}
            />
        </div>
    );
}

// <FriendButton />
