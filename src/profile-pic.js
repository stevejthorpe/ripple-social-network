import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imageUrl,
    toggleUploader
}) {
    imageUrl = imageUrl || "/default-profile-pic.png";

    return (
        <div className="pic-box">
            <img
                src={imageUrl}
                alt={`${firstname} ${lastname}`}
                onClick={toggleUploader}
                className="profile-pic-medium"
            />
        </div>
    );
}
