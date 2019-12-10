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
        console.log("Chat mounted");
        console.log("elemRef: ", elemRef.current);
        console.log(" scroll top: ", elemRef.current.scrollTop);
        console.log("Client height: ", elemRef.current.clientHeight);
        console.log("Scroll height: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

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
            <h1>Chat Room!</h1>
            <div className="chat-container" ref={elemRef}>
                {msgs &&
                    msgs.map(item => (
                        <div className="message" key={item.id}>
                            <Link to={`/user/${item.userId}`}>
                                <ProfilePic
                                    firstname={item.firstname}
                                    lastname={item.lastname}
                                    imageUrl={item.image}
                                />
                            </Link>
                            <p>
                                {item.firstname} {item.lastname}
                            </p>
                            <p>{item.created_at}</p>
                            <p>{item.msg}</p>
                        </div>
                    ))}
            </div>

            <textarea
                placeholder="Add your message here..."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
