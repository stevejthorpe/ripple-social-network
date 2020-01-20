import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import ProfilePic from "./profile-pic";

import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();

    const msgs = useSelector(state => state && state.msgs);
    console.log("Chat messages: ", msgs);

    const onlineUsers = useSelector(state => state && state.onlineUsersArr);
    console.log("Online users: ", onlineUsers);

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
        <div className="card bg-light lighten-10 chat-room">
            <div className="card-body" ref={elemRef}>
                <div className="row px-lg-2 px-2">
                    <div className="col-md-6 col-xl-4 px-0 bg-white">
                        <h6 className="font-weight-bold mb-3 text-center text-lg-left">
                            Onine Members
                        </h6>
                       <div className="white z-depth-1 px-3 pt-3 pb-0 bg-light">
                        {onlineUsers &&
                            onlineUsers.map(item => (
                               
                                <ul className="list-unstyled friend-list" key={item.id}>
                                        <li className="active grey lighten-3 p-2">
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                
                                              <Link to={`/user/${item.id}`}>
                                                <img
                                                  className="avatar rounded-circle d-flex align-self-center mr-2 z-depth-1 profile-pic-tiny"
                                                  src={item.image}
                                                />
                                              </Link>
                                                <div className="text-small">
                                                  <strong>{item.firstname} {item.lastname}</strong>
                                                    <p className="last-message text-muted">
                                                      {item.bio}
                                                    </p>
                                                </div>
                                                <div className="chat-footer">
                                                    <p className="text-smaller text-muted mb-0">
                                                        Just now
                                                    </p>
                                                   
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                               
                            ))}
         </div>
                    </div>
                    <div className="col-md-6 col-xl-8 pl-md-3 px-lg-auto px-0 bg-white">
                        <div className="chat-message"></div>
                        {msgs &&
                            msgs.map(item => (
                                <ul className="list-unstyled" key={item.id}>
                                    <li className="d-flex justify-content-end mb-4 bg-light">
                                        <Link to={`/user/${item.id}`}>
                                            <img
                                                className="profile-pic-tiny rounded-circle mr-2 ml-lg-3 ml-0 z-depth-1"
                                                src={item.image}
                                            />
                                        </Link>
                                        <div className="chat-body white p-3 ml-2 z-depth-1">
                                            <div className="header">
                                                <strong className="primary-font">
                                                    {item.firstname}{" "}
                                                    {item.lastname}{" "}
                                                </strong>
                                                <small className="pull-right text-muted">
                                                    <i className="far fa-clock"></i>
                                                    {item.created_at}
                                                </small>
                                            </div>
                                            <hr className="w-100" />

                                            <p className="mb-0">{item.msg}</p>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        <li className="white list-unstyled">
                            <div className="form-group basic-textarea">
                                <textarea
                                    className="form-control pl-2 my-0"
                                    id="exampleFormControlTextarea2"
                                    rows="3"
                                    placeholder="Type your message here..."
                                    onKeyUp={keyCheck}
                                ></textarea>
                            </div>
                        </li>
                        <button
                            type="button"
                            className="btn btn-info btn-rounded btn-sm waves-effect waves-light float-right"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// <ProfilePic
//     firstname={item.firstname}
//     lastname={item.lastname}
//     imageUrl={item.image}
// />

// alt=`{item.firstname} {item.lastname}`
