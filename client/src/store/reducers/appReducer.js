import actionType from '../actions/actionType'
const initState = {
    banner: [],
    
}

const appReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.GET_HOME:
            console.log(action)
            return {
                ...state,
                banner: action?.homeData?.find(item => item?.sectionType === 'banner')?.items || null
            }
    
        default:
            return state;
    }
}

export default appReducer