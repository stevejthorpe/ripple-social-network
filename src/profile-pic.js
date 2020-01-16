import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imageUrl,
    toggleUploader
}) {
    imageUrl = imageUrl || "/default-profile-pic.png";

    return (
        <div>
            <img
                className="card-img-top"
                src={imageUrl}
                alt={`${firstname} ${lastname}`}
                onClick={toggleUploader}
            />
        </div>
    );
}

// className="profile-pic-medium"
