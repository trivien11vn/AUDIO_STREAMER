import actionType from '../actions/actionType'
const initState = {
    banner:null,
    chill: null,
    season: null,
    mood: null,
    top100: null,
    albumHot: null,
    isLoading: false,
    newRelease: null,
    weekChart:null,
    chart: null,
    rank:null
}

const appReducer = (state = initState, action) => {
    //action: object ma dispatch tra ve
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action?.homeData?.find(item => item?.sectionId === 'hSlider')?.items || null,
                chill: action?.homeData?.find(item => item?.sectionId === 'hEditorTheme') || null,
                season: action?.homeData?.find(item => item?.sectionId === 'hSeasonTheme') || null,
                mood: action?.homeData?.find(item => item?.sectionId === 'hEditorTheme4') || null,
                top100: action?.homeData?.find(item => item?.sectionId === 'h100') || null,
                albumHot: action?.homeData?.find(item => item?.sectionId === 'hAlbum') || null,
                newRelease: action?.homeData?.find(item => item?.sectionType === 'new-release') || null,
                weekChart: action?.homeData?.find(item => item?.sectionType === 'weekChart')?.items || null,
                chart: action?.homeData?.find(item => item?.sectionId === 'hZC')?.chart || null,
                rank: action?.homeData?.find(item => item?.sectionId === 'hZC')?.items || null,
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