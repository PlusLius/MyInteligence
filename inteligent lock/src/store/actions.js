import API from '../api/api'
const api = new API()

const actions = {
    UpdateGatewayList(context){

        api.get("gatewayUser")
        .then( data => {
            if(!context.state.gatewayUserId){
                console.log(context.state.gatewayList[0].id)
                // context.state.gatewayUserId = context.state.gatewayList[0].id;
            }
            context.commit("UpdateGatewayList",data.data.data.list)
        })
        .catch( err => {
            console.log(err)
        })
    }
}

export default actions