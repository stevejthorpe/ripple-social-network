// ProfilePic
// BioEditer
import React from "react";
import ProfilePic from "./profile-pic";
import { BioEditor } from "./bio-editor";
// import { FriendButton } from "./friendbutton";

export function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-3">
                    <ProfilePic
                        className="card-img"
                        firstname={props.firstname}
                        lastname={props.lastname}
                        imageUrl={props.imageUrl}
                        onClick={props.toggleUploader}
                    />
                </div>
                <div className="col-md-4">
                    <BioEditor
                        firstname={props.firstname}
                        lastname={props.lastname}
                        bio={props.bio}
                        setBio={props.setBio}
                    />
                </div>
            </div>
        </div>
    );
}

// <FriendButton />
