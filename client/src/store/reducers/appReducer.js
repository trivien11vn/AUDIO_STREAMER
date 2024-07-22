import actionType from '../actions/actionType'
const initState = {
    banner: [],
    chill: {}
}

const appReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action?.homeData?.find(item => item?.sectionId === 'hSlider')?.items || null,
                chill: action?.homeData?.find(item => item?.sectionId === 'hEditorTheme') || {},
            }
    
        default:
            return state;
    }
}

export default appReducer