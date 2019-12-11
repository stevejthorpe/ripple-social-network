import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, addFriend, unFriend } from "./actions";
import ProfilePic from "./profile-pic";

export default function Friends() {
    const dispatch = useDispatch();
    const wannabes = useSelector(state => {
        console.log("in function passed to useSelector", state);
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter(user => user.accepted == false)
        );
    });
    const friends = useSelector(state => {
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter(user => user.accepted == true)
        );
    });

    console.log("wannabes: ", wannabes);
    console.log("friends: ", friends);

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    return (
        <div id="friend-box">
            {wannabes &&
                wannabes.map(user => (
                    <div className="wannabes" key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <ProfilePic
                                firstname={user.firstname}
                                lastname={user.lastname}
                                imageUrl={user.image}
                            />
                        </Link>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <button onClick={() => dispatch(addFriend(user.id))}>
                            Accept
                        </button>
                    </div>
                ))}
            {friends &&
                friends.map(user => (
                    <div className="friends" key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <ProfilePic
                                firstname={user.firstname}
                                lastname={user.lastname}
                                imageUrl={user.image}
                            />
                        </Link>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <button onClick={() => dispatch(unFriend(user.id))}>
                            Unfriend
                        </button>
                    </div>
                ))}
        </div>
    );
}

// <img
//     src={user.image}
//     onClick={() => location.replace(`/user/${user.id}`)}
// />
