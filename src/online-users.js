import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import ProfilePic from "./profile-pic";

// import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function OnlineUsers() {
    const elemRef = useRef();

    const onlineUsers = useSelector(state => state && state.onlineUsersArr);
    console.log("OnlineUsersArr in component: ", onlineUsers);

    // const total = onlineUsers.length;

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [onlineUsers]);

    return (
        <div className="online-users">

            <div className="online-users-box" ref={elemRef}>
                {onlineUsers && onlineUsers.map(user =>
                    <div className="online-users-item" key={user.id}>
                        <div className="online-users-pic-box">
                            <Link to={`/user/${user.id}`}>
                                <img
                                    className="profile-pic-tiny"
                                    src={user.image}
                                />
                            </Link>
                        </div>
                        <div className="online-users-info-box">
                            <h3>{user.firstname} {user.lastname}</h3>
                            <Link to={`/chat`}>Chat with {user.firstname}</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// <h1>{total || 0} users online now!</h1>


// <form name="Online Users">
//     {onlineUsers &&
//         onlineUsers.map(user => {
//             <select name="Online Users">
//                 <option>
//                     <Link to={`/user/${user.id}`}>
//                         <img className="profile-pic-tiny" src={user.image} />
//                         <p>{user.firstname}</p>
//                     </Link>
//                     <Link to={`/chat`}>
//                         <p>Chat</p>
//                     </Link>
//                 </option>
//             </select>;
//         })}
// </form>;
//
// <ul>
//     <li>
//         | {total} Online Users
//         {onlineUsers &&
//             onlineUsers.map(user => {
//                 <ul>
//                     <li>
//                         <Link to={`/user/${user.id}`}>
//                             <img
//                                 className="profile-pic-tiny"
//                                 src={user.image}
//                             />
//                             <p>{user.firstname}</p>
//                         </Link>
//                         <Link to={`/chat`}>
//                             <p>Chat</p>
//                         </Link>
//                     </li>
//                 </ul>;
//             })}
//     </li>
// </ul>
