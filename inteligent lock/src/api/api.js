import axios from 'axios'


class API {

    get (url,params) {
        return axios({
            method: 'get',
            url: 'http://n16n237643.iok.la/api/v1.1.0/' + url,
            params: params,
            headers: {
              'Token-JWT': "jwt" + window.localStorage.getItem('token'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
        });

        console.log(window.localStorage.getItem('token'))
    };

    post (url,data) {
        return  axios({
            method: 'post',
            // url: 'http://n16n237643.iok.la/api/v1.1.0/' + url,
            url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              'Token-JWT': "jwt" + window.localStorage.getItem('token'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
        });
    }

}
export default API;