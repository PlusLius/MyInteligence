import axios from 'axios'
import config from './config'

// axios(config);
class API {
    //获取已授权列表
    get () {
        return axios.get('test',{},config);
    }

}
export default API;