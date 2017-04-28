<!-- 锁系统密钥组件 -->
<template>
    <div>

        <!-- 历史记录列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x height="-221px">
            <!-- 上拉加载下拉滚动组件内容填充 -->
              <div class="DeviceHeight" >
                    <div class="MyAdmin" v-for="i in 10">
                        <div class="MyIcon icon-edit">
                        </div>
                        <div class="MyMessage">
                            <p class="MyName">{{'自己'}}</p>
                            <p class="MyID">{{'ID: 001  密码开锁'}}</p>
                        </div>
                        <div class="MySendMsg">
                              推送开门信息
                        </div>
                        <div class="MySwitch">
                            <input class="weui-switch" type="checkbox">
                        </div>
                    </div>
              </div>
            </scroller>
        </div>

    </div>
</template>
<script>
    import { XSwitch, Group, Scroller} from 'vux'

    export default {
        components: {
            Group,
            XSwitch,
            Scroller
        },
        data () {
            return {
              disabled: false
            }
        }
    }


</script>
<style scoped>
    .MyAdmin {
        width: 100%;
        height: 74px;
        border-bottom: 1px solid #CCCCCC;
        overflow:hidden;
    }
    .MySwitchBox {
        height: 74px;
        line-height: 74px;
    }
    .MyIcon {
        float: left;
        width: 14%;
        height:74px;
        text-align: center;
        line-height: 74px;
        font-size:21px;
        color:#00A6F4;
    }
    .MyMessage {
        float: left;
        height:74px;
        line-height: 17px;
        width: 36%;
    }
    .MyAdminBox {
        height:74px;
    }
    .MyName {
        font-size:15px;
        margin-top: 19px;
        margin-bottom: 11px;
    }
    .MyID {
        font-size: 12px;
        color:#A5A5A5;
    }
    .MySendMsg {
        float: left;
        margin: 23px 0 0 18px;
        font-size:13px;
    }
    .MySwitch {
        position: absolute;
        right:4.35%;
    }
    .weui-switch {
        position: relative;
        top: 15px;
        right: 0px;
        width: 52px;
        height: 32px;
        border: 1px solid #DFDFDF;
        outline: 0;
        border-radius: 16px;
        box-sizing: border-box;
        background-color: #DFDFDF;
        transition: background-color 0.1s, border 0.1s;
    }
</style>



