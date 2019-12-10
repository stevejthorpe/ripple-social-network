import axios from "./axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("ACTION /friends-wannabes data: ", data.friendsWannabes.rows);

    return {
        type: "RECEIVE_WANNABES",
        friendsWannabes: data.friendsWannabes.rows
    };
}

export async function addFriend(id) {
    console.log("ADD_FRIEND id: ", id);
    await axios.post("/accept-friend-request/" + id);

    return {
        type: "ADD_FRIEND",
        id
    };
}

export async function unFriend(id) {
    await axios.post("/end-friendship/" + id);
    return {
        type: "UN_FRIEND",
        id
    };
}

export async function chatMessages(msgs) {
    console.log("In actions chatMessages: ", msgs);
    return {
        type: "CHAT_MESSAGES",
        msgs
    };
}

export async function chatMessage(msg) {
    console.log("In actions chatMessages");
    // return {
    //     type: "CHAT_MESSAGE",
    //     msg
    // };
}
