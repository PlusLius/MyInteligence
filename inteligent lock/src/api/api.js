import axios from 'axios'


class API {

    get (url,params) {
        return axios({
            method: 'get',
            url: 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/' + url,
            params: params,
            headers: {
              'Token-JWT': sessionStorage.getItem("token"),
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });

        // console.log(window.localStorage.getItem('token'))
    };

    post (url,data) {
        return  axios({
            method: 'post',
            url:  'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/' + url,
            // url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              'Token-JWT': sessionStorage.getItem("token"),
              'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
    };

    put (url,params) {
        return axios({
            method: 'put',
            url: 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/' + url,
            data: params,
            headers: {
              'Token-JWT': sessionStorage.getItem("token"),
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    };

    deletes (url,params) {
        return axios({
            method: 'delete',
            url: 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/' + url,
            headers: {
              'Token-JWT': sessionStorage.getItem("token"),
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    };

    postAPI (url,data) {
        return  axios({
            method: 'post',
            url:  'https://devchat.leocheery.net/smarthome-devchat/' + url,
            // url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
    };

    del (url,data) {
      return  axios({
        method: 'delete',
        url: 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/' + url,
        data: data,
        headers: {
          'Token-JWT': sessionStorage.getItem("token"),
          'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
}

}
export default API;