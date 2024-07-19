import actionType from "./actionType";
import {apiGetHome} from '../../apis'

export const setCurrentSongId = (sid) => {
    return {
        type: actionType.SET_CURRENT_SONG_ID,
        sid
    }
}

export const playSong = (flag) => {
    return {
        type: actionType.PLAY_SONG,
        flag
    }
}