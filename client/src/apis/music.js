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