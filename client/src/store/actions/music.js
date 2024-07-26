import actionType from "./actionType";
import {apiGetDetailPlaylist, apiGetHome} from '../../apis'

export const setCurrentSongId = (sid) => {
    return {
        type: actionType.SET_CURRENT_SONG_ID,
        sid
    }
}

export const setCurrentSongData = (data) => {
    return {
        type: actionType.SET_CURRENT_SONG_DATA,
        data
    }
}

export const setCurrentAlbumId = (plid) => {
    return {
        type: actionType.SET_CURRENT_ALBUM_ID,
        plid
    }
}

export const playSong = (flag) => {
    return {
        type: actionType.PLAY_SONG,
        flag
    }
}

export const setAlbum = (flag) => {
    return {
        type: actionType.SET_ALBUM,
        flag
    }
}

export const getSongsInAlbum = (album) => {
    return {
        type: actionType.GET_ALBUM,
        album
    }
}

export const setLoading = (flag) => {
    return {
        type: actionType.LOADING,
        flag
    }
}

// export const fetchDetailAlbum = (plid) => async(dispatch) => {
//     try{
//         const response = await apiGetDetailPlaylist(plid)
//         if(response?.data?.err === 0){
//             dispatch({
//                 type: actionType.GET_ALBUM,
//                 album: response?.data?.data?.items
//             })
//         }
//     }
//     catch(error){
//         dispatch({
//             type: actionType.GET_ALBUM,
//             album: null
//         })
//     }
//   }