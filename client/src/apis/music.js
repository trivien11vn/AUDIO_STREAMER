import axios from '../axios'  //do axios export default, nen import dat ten tuy y

export const apiGetDetailSong = (sid) => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/song',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})

export const apiGetInfoSong = (sid) => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})


export const apiGetDetailPlaylist = (plid) => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/detailplaylist',
            method: 'get',
            params: {id: plid}  
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})

export const apiSearch = (keyword) => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/search',
            method: 'get',
            params: {keyword}  
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})

export const apiGetArtistSongs = (singerId) => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/artistsong',
            method: 'get',
            params: {
                id: singerId,
                page: 1,
                count:50
            }  
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})


export const apiGetArtist = (alias) => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/artist',
            method: 'get',
            params: {
                name: alias
            }  
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})

export const apiGetChartHome = () => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/charthome',
            method: 'get' 
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})