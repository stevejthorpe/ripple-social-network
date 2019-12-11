import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profile-pic";

import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();

    const msgs = useSelector(state => state && state.msgs);
    console.log("Chat messages: ", msgs);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [msgs]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            console.log("e.target.value: ", e.target.value);
            console.log("e.key: ", e.key);
            socket.emit("chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chat">
            <h1>Chat Room...</h1>
            <div className="chat-container" ref={elemRef}>
                {msgs &&
                    msgs.map(item => (
                        <div className="message-box" key={item.id}>
                            <div className="chat-pic-box">
                                <Link to={`/user/${item.id}`}>
                                    <img
                                        className="profile-pic-tiny"
                                        src={item.image}
                                    />
                                </Link>
                            </div>

                            <div className="message">
                                <p>
                                    {item.firstname} {item.lastname}
                                </p>
                                <p className="message-date">
                                    {item.created_at}
                                </p>
                                <p>{item.msg}</p>
                            </div>
                        </div>
                    ))}
            </div>

            <textarea
                className="chat-text"
                placeholder="Add your message here..."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}

// <ProfilePic
//     firstname={item.firstname}
//     lastname={item.lastname}
//     imageUrl={item.image}
// />

// alt=`{item.firstname} {item.lastname}`
