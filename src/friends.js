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
        <div className="container">
            <div className="row">
                {wannabes &&
                    wannabes.map(user => (
                        <div className="wannabes card w-25" key={user.id}>
                            <div className="card-header">
                                <Link to={`/user/${user.id}`}>
                                    <ProfilePic
                                        className="card-img-top"
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        imageUrl={user.image}
                                    />
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {user.firstname} {user.lastname}
                                </h5>
                                <p className="card-text">{user.bio} </p>
                            </div>
                            <div className="card-body">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => dispatch(addFriend(user.id))}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="row">
                {friends &&
                    friends.map(user => (
                        <div className="friends card w-25" key={user.id}>
                            <div className="card-header">
                                <Link to={`/user/${user.id}`}>
                                    <ProfilePic
                                        className="card-img-top"
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        imageUrl={user.image}
                                    />
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {user.firstname} {user.lastname}
                                </h5>
                                <p className="card-text">{user.bio} </p>
                            </div>

                            <div className="card-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => dispatch(unFriend(user.id))}
                                >
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

// <img
//     src={user.image}
//     onClick={() => location.replace(`/user/${user.id}`)}
// />
