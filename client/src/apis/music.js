import axios from '../axios'  //do axios export default, nen import dat ten tuy y

export const apiDetailSong = (sid) => new Promise(async(resolve, reject) => {
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

export const apiInfoSong = (sid) => new Promise(async(resolve, reject) => {
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