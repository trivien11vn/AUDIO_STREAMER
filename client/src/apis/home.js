import axios from '../axios'  //do axios export default, nen import dat ten tuy y

export const getHome = () => new Promise(async(resolve, reject) => {
    try{
        const response = await axios({
            url: '/home',
            method: 'get'
        })
        resolve(response)
    }
    catch(error){
        reject(error);
    }
})