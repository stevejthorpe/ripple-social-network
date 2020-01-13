import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imageUrl,
    toggleUploader
}) {
    imageUrl = imageUrl || "/default-profile-pic.png";

    return (
        <picture className="pic-box">
            <img
                className="img-fluid img-thumbnail profile-pic-medium "
                src={imageUrl}
                alt={`${firstname} ${lastname}`}
                onClick={toggleUploader}
            />
        </picture>
    );
}

// className="profile-pic-medium"
