import actionType from '../actions/actionType'
const initState = {
    banner: [],
    chill: {},
    season: {},
    mood: {},
    top100: {},
    albumHot: {},
    isLoading: false,
    newRelease: {},
    weekChart: []
}

const appReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action?.homeData?.find(item => item?.sectionId === 'hSlider')?.items || null,
                chill: action?.homeData?.find(item => item?.sectionId === 'hEditorTheme') || {},
                season: action?.homeData?.find(item => item?.sectionId === 'hSeasonTheme') || {},
                mood: action?.homeData?.find(item => item?.sectionId === 'hEditorTheme4') || {},
                top100: action?.homeData?.find(item => item?.sectionId === 'h100') || {},
                albumHot: action?.homeData?.find(item => item?.sectionId === 'hAlbum') || {},
                newRelease: action?.homeData?.find(item => item?.sectionType === 'new-release') || {},
                weekChart: action?.homeData?.find(item => item?.sectionType === 'weekChart')?.items || {},
            }
        case actionType.LOADING:
            return {
                ...state,
                isLoading: action?.flag
            }
    
        default:
            return state;
    }
}

export default appReducer