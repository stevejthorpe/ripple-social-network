import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "./profile-pic";

export default function FindPeople() {
    // - things in state:
    //     1) array of USERS
    //     2) search string
    const [usersArr, setUsersArr] = useState([]);
    const [newUsersArr, setNewUsersArr] = useState([]);
    const [searchUser, setSearchUser] = useState("");

    if (!usersArr) {
        return null;
    }

    // useEffect(() => {
    //     (async () => {
    //         axios.get("/users/").then(({ data }) => {
    //             console.log("dataaaaa..", data);
    //             setNewUsersArr([...data]);
    //         });
    //     })();
    // }, []);

    useEffect(() => {
        (async () => {
            if (searchUser != "") {
                axios.get(`/users/${searchUser}`).then(({ data }) => {
                    setUsersArr([...data]);
                });
            }
        })();
    }, [searchUser]);

    return (
        <div className="find-users">
            {newUsersArr.map(user => (
                <div className="new-users" key={user.id}>
                    <h3>
                        {user.firstname} {user.lastname}
                    </h3>
                    <p>
                        <em>Member Since:</em>
                        {new Date(user.created_at).toLocaleString()}
                    </p>
                    <ProfilePic
                        firstname={user.firstname}
                        lastname={user.lastname}
                        imageUrl={user.imageUrl}
                    />
                </div>
            ))}

            <h3>Find people</h3>

            <input onChange={e => setSearchUser(e.target.value)} />
            {usersArr.map(user => (
                <div className="existing-users" key={user.id}>
                    <h3>
                        {user.firstname} {user.lastname}
                    </h3>
                    <p>
                        <em>Member Since:</em>
                        {new Date(user.created_at).toLocaleString()}
                    </p>
                    <ProfilePic
                        firstname={user.firstname}
                        lastname={user.lastname}
                        imageUrl={user.imageUrl}
                    />
                </div>
            ))}
        </div>
    );
}

// <Link to={`/users/${user.id}`}>
