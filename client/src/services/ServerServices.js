import axios from 'axios'

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class JsonModelData{

    static getAllForecasts = async () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    
                }
                // axios.post(url + "mongodb-services/findAllJsonModelUnits", body).then(res => {
                //     resolve(res.data) ;
                // })
                axios.post(url + "formatAllForecasts",body).then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }

    

}
export default JsonModelData;
