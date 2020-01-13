import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendButton({ otherId }) {
    console.log("otherId in friendbutton: ", otherId);
    const [buttonText, setButtonText] = useState("Make friend request");

    useEffect(() => {
        console.log("btn mounted ", otherId);
        (async () => {
            axios
                .get(`/friendshipstatus/${otherId}`)
                .then(({ data }) => {
                    console.log("Resp: ", data);
                    setButtonText(data.buttontext);
                })
                .catch(err => {
                    console.log("Error in GET/friendshipstatus: ", err);
                });
        })();
    }, []);

    function submit() {
        console.log("Clicked on the button: ", buttonText, otherId);
        // Can do logic here and send to one of three diff post Routes
        // Or make a post to one route and let the route do the logic
        if (buttonText == "Make friend request") {
            try {
                axios
                    .post(`/send-friend-request/${otherId}`)
                    .then(({ data }) => {
                        console.log("resp: ", data);
                        setButtonText(data.buttontext);
                    })
                    .catch(err => {
                        console.log("Error in POST/send-friend-request: ", err);
                    });
            } catch (err) {
                console.log(err);
            }
        }
        if (buttonText == "Accept friend request") {
            try {
                axios
                    .post(`/accept-friend-request/${otherId}`)
                    .then(({ data }) => {
                        console.log("resp: ", data);
                        setButtonText(data.buttontext);
                    })
                    .catch(err => {
                        console.log(
                            "Error in POST/accept-friend-request: ",
                            err
                        );
                    });
            } catch (err) {
                console.log(err);
            }
        }
        if (buttonText == "Cancel friend request" || buttonText == "Unfriend") {
            try {
                axios
                    .post(`/end-friendship/${otherId}`)
                    .then(({ data }) => {
                        console.log("resp: ", data);
                        setButtonText(data.buttontext);
                    })
                    .catch(err => {
                        console.log("Error in POST/end-friendship: ", err);
                    });
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
