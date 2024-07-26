import actionType from '../actions/actionType'
const initState = {
    currentSongId : null,
    currentSongData: null,
    isPlay: false,
    isAlbum: false,
    album: null,
    currentAlbumId: null
}

const musicReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action?.sid || null
            }
        case actionType.SET_CURRENT_SONG_DATA:
            return {
                ...state,
                currentSongData: action?.data || null
            }
        case actionType.SET_CURRENT_ALBUM_ID:
            return {
                ...state,
                currentAlbumId: action?.plid || null
            }
        case actionType.PLAY_SONG:
            return {
                ...state,
                isPlay: action?.flag || false
            }
        case actionType.SET_ALBUM:
            return {
                ...state,
                isAlbum: action?.flag || false
            }
        case actionType.GET_ALBUM:
            return {
                ...state,
                album: action?.album || null
            }
        default:
            return state;
    }
}

export default musicReducer