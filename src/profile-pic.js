import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imageUrl,
    toggleUploader
}) {
    imageUrl = imageUrl || "user.png";
    return (
        <div>
            <h3>
                Profile Pic :: {firstname} {lastname}
            </h3>
            <img
                src={imageUrl}
                alt="profile pic"
                onClick={toggleUploader}
                className="profile-pic-medium"
            />
        </div>
    );
}
