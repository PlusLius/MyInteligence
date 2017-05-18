import axios from 'axios'


class API {

    get (url,params) {
        return axios({
            method: 'get',
            url: 'http://n16n237643.iok.la/api/v1.1.0/' + url,
            params: params,
            headers: {
              'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTUxMTE2MTksInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTE1NDgxOX0.Ra5YjFmHuCEYw4Ay9yiVQ2uBbz8D7d-cC99HZ3Bs2F0",
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });

        // console.log(window.localStorage.getItem('token'))
    };

    post (url,data) {
        return  axios({
            method: 'post',
            url:  'http://n16n237643.iok.la/api/v1.1.0/' + url,
            // url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTUxMTE2MTksInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTE1NDgxOX0.Ra5YjFmHuCEYw4Ay9yiVQ2uBbz8D7d-cC99HZ3Bs2F0",
              'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
    };

    put (url,params) {
        return axios({
            method: 'put',
            url: 'http://n16n237643.iok.la/api/v1.1.0/' + url,
            params: params,
            headers: {
              'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTUxMTE2MTksInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTE1NDgxOX0.Ra5YjFmHuCEYw4Ay9yiVQ2uBbz8D7d-cC99HZ3Bs2F0",
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    };

    deletes (url,params) {
        return axios({
            method: 'delete',
            url: 'http://n16n237643.iok.la/api/v1.1.0/' + url,
            headers: {
              'Token-JWT': "jwteyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE0OTUxMTE2MTksInN1YiI6IntcIm9wZW5JZFwiOlwib1czUDF3ME83LWoxQ18zR2s5Y1lNV1NZX1lyOFwiLFwiYXBwSWRcIjpcInd4MDgzYjQ5NDMzMDIxMjA2NFwifSIsImV4cCI6MTQ5NTE1NDgxOX0.Ra5YjFmHuCEYw4Ay9yiVQ2uBbz8D7d-cC99HZ3Bs2F0",
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    };

    postAPI (url,data) {
        return  axios({
            method: 'post',
            url:  'http://n16n237643.iok.la' + url,
            // url: 'http://n16n237643.iok.la/' + url,
            data: data,
            headers: {
              'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
    };

}
export default API;