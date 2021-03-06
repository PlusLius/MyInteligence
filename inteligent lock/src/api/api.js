import axios from 'axios'

// var root = 'http://100.10.0.121/smarthome-devchat/api/v1.1.0/'
var root = 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/'

var token = "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTc4NzUyMzcsInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NzkxODQzN30.PGc1kFkUN47XYKPczOc-rBrsMtuwFkIOyUnTo-Jm7VQ"


class API {

    get (url,params) {
        return axios({
            method: 'get',
            url: root + url,
            // url: 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/'+ url,
            params: params,
            headers: {
              // 'Token-JWT':sessionStorage.getItem("token"),
              'Token-JWT':token,
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
    };

    post (url,data) {
        return  axios({
            method: 'post',
            // url:  'http://100.10.0.121/api/v1.1.0/' + url,
            url: root + url,
            // url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              // 'Token-JWT':sessionStorage.getItem("token"),
              'Token-JWT':token,
              'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
    };

    put (url,params) {
        return axios({
            method: 'put',
            // url: 'http://100.10.0.121/api/v1.1.0/' + url,
            url: root + url,
            data: params,
            headers: {
              // 'Token-JWT':sessionStorage.getItem("token"),
              'Token-JWT':token,
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    };

    deletes (url,params) {
        return axios({
            method: 'delete',
            // url: 'http://100.10.0.121/api/v1.1.0/' + url,
            url: root + url,
            headers: {
              // 'Token-JWT':sessionStorage.getItem("token"),
              'Token-JWT':token,
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    };

    postAPI (url,data) {
        return  axios({
            method: 'post',
            // url:  'http://100.10.0.121/api/v1.1.0/' + url,
            url: 'https://devchat.leocheery.net/smarthome-devchat/' + url,
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
        // url: 'http://100.10.0.121/api/v1.1.0/' + url,
        url: root + url,
        data: data,
        headers: {
          // 'Token-JWT':sessionStorage.getItem("token"),
          'Token-JWT':token,
          'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
}

}
export default API;