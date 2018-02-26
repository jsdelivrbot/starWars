const INITIAL_STATE = {list: [], showNoResultError: false};

export default function (state = INITIAL_STATE, action) {

    const payload = action.payload;

    switch (action.type) {
        case "SET_PLANET":
            return {...state, list: payload};
        default:
            return state
    }

}
