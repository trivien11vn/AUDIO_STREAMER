import actionType from '../actions/actionType'
const initState = {
    currentSongId : null
    
}

const musicReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action?.sid || null
            }
    
        default:
            return state;
    }
}

export default musicReducer