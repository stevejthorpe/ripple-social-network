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

    console.log(`state ended as `, state);
    return state;
}
