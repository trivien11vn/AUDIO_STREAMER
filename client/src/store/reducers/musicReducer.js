import actionType from '../actions/actionType'
const initState = {
    currentSongId : null,
    isPlay: false
}

const musicReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action?.sid || null
            }
        case actionType.PLAY_SONG:
            return {
                ...state,
                isPlay: action?.flag || false
            }
        default:
            return state;
    }
}

export default musicReducer