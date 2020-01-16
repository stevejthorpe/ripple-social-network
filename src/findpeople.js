import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "./profile-pic";
import { Link } from "react-router-dom";

export default function FindPeople() {
    // - things in state:
    //     1) array of USERS
    //     2) search string
    const [usersArr, setUsersArr] = useState([]);
    // const [newUsersArr, setNewUsersArr] = useState([]);
    const [searchUser, setSearchUser] = useState("");

    if (!usersArr) {
        return null;
    }

    useEffect(() => {
        (async () => {
            axios.get("/api/newusers").then(({ data }) => {
                console.log("dataaaaa..", data);
                setUsersArr(data);
            });
        })();
    }, []);

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
        <div className="container">
            <div className="form">
                <i className="fas fa-search" aria-hidden="true"></i>
                <input
                    className="form-control form-control-sm ml-3 w-75"
                    type="text"
                    placeholder="Find friends"
                    aria-label="Search"
                    onChange={e => setSearchUser(e.target.value)}
                />
            </div>

            <div className="card-deck">
                {usersArr.map(user => (
                    <div className="card" key={user.id}>
                        <ProfilePic
                            firstname={user.firstname}
                            lastname={user.lastname}
                            imageUrl={user.image}
                        />
                        <div className="card-body">
                            <h3 className="card-title">
                                {user.firstname} {user.lastname}
                            </h3>
                            <p>{user.bio}</p>
                        </div>

                        <div className="card-footer">
                            <p>
                                Visit {user.firstname}&apos;s{" "}
                                <Link to={"/user/" + user.id}>profile</Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
