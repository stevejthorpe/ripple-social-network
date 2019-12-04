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
            <img
                src={imageUrl}
                alt={`${firstname} ${lastname}`}
                onClick={toggleUploader}
                className="profile-pic-medium"
            />
        </div>
    );
}
