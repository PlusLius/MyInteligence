import axios from 'axios'

// var root = 'http://100.10.0.121/smarthome-devchat/api/v1.1.0/'
var root = 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/'

class API {

    get (url,params) {
        return axios({
            method: 'get',
            url: root + url,
            // url: 'https://devchat.leocheery.net/smarthome-devchat/api/v1.1.0/'+ url,
            params: params,
            headers: {
              'Token-JWT': sessionStorage.getItem("token"),
              // 'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTU2MzA5NzYsInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTY3NDE3Nn0.fy0pggBBQ1Ffj0z2sTT0vVyTmqFgKG8D-Tek68AebcU",
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });

        // console.log(window.localStorage.getItem('token'))
    };

    post (url,data) {
        return  axios({
            method: 'post',
            // url:  'http://100.10.0.121/api/v1.1.0/' + url,
            url: root + url,
            // url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              'Token-JWT': sessionStorage.getItem("token"),
              // 'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTU2MzA5NzYsInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTY3NDE3Nn0.fy0pggBBQ1Ffj0z2sTT0vVyTmqFgKG8D-Tek68AebcU",
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
              'Token-JWT': sessionStorage.getItem("token"),
              // 'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTU2MzA5NzYsInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTY3NDE3Nn0.fy0pggBBQ1Ffj0z2sTT0vVyTmqFgKG8D-Tek68AebcU",
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
              'Token-JWT': sessionStorage.getItem("token"),
              // 'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTU2MzA5NzYsInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTY3NDE3Nn0.fy0pggBBQ1Ffj0z2sTT0vVyTmqFgKG8D-Tek68AebcU",
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
          'Token-JWT': sessionStorage.getItem("token"),
           // 'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTU2MzA5NzYsInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTY3NDE3Nn0.fy0pggBBQ1Ffj0z2sTT0vVyTmqFgKG8D-Tek68AebcU",
          'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
}

}
export default API;