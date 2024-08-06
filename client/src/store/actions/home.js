import actionType from "./actionType";
import {apiGetHome} from '../../apis'

export const getHome = () => async (dispatch) => {
    try {  
        const response = await apiGetHome()
        if(response?.data?.err === 0){
            dispatch({
                type: actionType.GET_HOME,
                homeData: response?.data?.data?.items
            })
        }
        else{
            dispatch({
                type: actionType.GET_HOME,
                homeData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionType.GET_HOME,
            homeData: null
        })
    }
}

export const setScroll = (flag) => { 
    return {
        type: actionType.SCROLL_POSITION,
        flag
    }
 }