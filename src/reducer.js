export default function reducer(state = {}, action) {
    console.log(`state started as `, state);

    if (action.type == "RECEIVE_WANNABES") {
        console.log("Reducer RECEIVE_WANNABES: ", action.friendsWannabes.rows);
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
    }

    if (action.type == "ADD_FRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if (user.id == action.id) {
                    console.log("in ADD_FRIEND", user.id, action.id);
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "UN_FRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(user => {
                return action.id != user.id;
            })
        };
    }

    if (action.type == "LAST_CHAT_MESSAGES") {
        console.log("Reducer CHAT_MESSAGES: ", action.msgs);
        state = {
            ...state,
            msgs: action.msgs
        };
    }

    if (action.type == "NEW_MESSAGE") {
        console.log("Reducer NEW_MESSAGE: ", action.msg);
        state = {
            ...state,
            msgs: [...state.msgs, action.msg]
        };
    }

    if (action.type == "ONLINE_USERS") {
        console.log("Reducer ONLINE_USERS: ", action.onlineUsersArr);
        state = {
            ...state,
            onlineUsersArr: action.onlineUsersArr
        };
    }

    console.log(`state ended as `, state);
    return state;
}
