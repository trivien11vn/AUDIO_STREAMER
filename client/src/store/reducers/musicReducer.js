import actionType from '../actions/actionType'
const initState = {
    currentSongId : null,
    currentSongData: null,
    isPlay: false,
    isAlbum: false,
    album: null,
    currentAlbumId: null,
    recentSongs: [],
    searchData: {},
    keyword: ''
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
        case actionType.SET_RECENT:
            let songs = state.recentSongs
            if(action?.data){
                if(!songs?.some(el => el?.sid === action?.data?.sid)){
                    if(songs?.length >= 20){
                        songs = songs.slice(0,19)
                        songs = [action?.data, ...songs]
                    }
                    else {
                        songs = [action?.data, ...songs]
                    }
                }
                else{
                    songs = songs.filter(el => el?.sid !== action?.data?.sid)
                    songs = [action?.data, ...songs]
                }
            }
            return {
                ...state,
                recentSongs: songs
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
        case actionType.SEARCH:
            return {
                ...state,
                searchData: action?.data || {},
                keyword: action?.keyword || ''
            }
        default:
            return state;
    }
}

export default musicReducer