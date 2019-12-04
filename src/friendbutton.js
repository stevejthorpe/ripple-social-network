import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendButton({ otherId }) {
    console.log("otherId in friendbutton: ", otherId);
    const [buttonText, setButtonText] = useState("I will be the btn text");

    useEffect(() => {
        console.log("btn mounted ", otherId);
        axios
            .get(`/friendshipstatus/${otherId}`)
            .then(({ data }) => {
                console.log("Resp: ", data);
                // setButtonText(data.buttontext);
            })
            .catch(err => {
                console.log("Error in GET/friendshipstatus: ", err);
            });
    }, []);

    function submit() {
        console.log("Ckicked on the button: ", buttonText);
        // Can do logic here and send to one of three diff post Routes
        // Or make a post to one route and let the route do the logic
    }

    return (
        <div>
            <button className="btn" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
