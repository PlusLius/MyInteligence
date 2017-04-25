<!-- 最近使用页面组件 -->
<template>

    <div class="BODY">
        <!-- 电量头部部分 -->
        <div class="MyResentUse">
            <div class="Electricity">
                <img src="../../assets/qietu/100%.png" class="ElectricityImg">
                <div class="ElectricityMore">
                    <p>电量</p>
                    <p class="ElectricityNumber">20%</p>
                </div>
            </div>
            <div class="RemoteUnlockBox">
                <div class="MyDynamicKey">
                    {{"智能锁: 1245484811122234"}}
                </div>
                <div class="RemoteUnlock">
                    {{"远程开锁"}}
                </div>
            </div>
        </div>

        <!-- 用户列表与历史记录跳转部分 -->
        <div class="HistoryMenu">
            <router-link to="/MyResentUse/MyHistory" class="HistoryMenuFont1">
                <img src="../../assets/qietu/历史记录灰.png" class="HistoryMenuImg1">
                历史记录
            </router-link>
            <router-link to="/MyResentUse/MyUserList" class="HistoryMenuFont2">
                <img src="../../assets/qietu/用户列表灰.png" class="HistoryMenuImg2">
                用户列表
            </router-link>
        </div>
        <router-view></router-view>

        <div class="AllListMenu">
            <router-link to="#" class="HistoryMenuFont1">
            </router-link>
            <router-link to="#" class="HistoryMenuFont2">
            </router-link>
        </div>
    </div>

</template>

<script>
    export default {
        data(){
            return {

            }
        },
    }
</script>

<style scoped>
    .MyResentUse {
        position: relative;
        width: 100%;
        height: 7.3125em;
        background: #00A6F4;
    }
    .Electricity {
        position: absolute;
        left:1.9375em;
        top: 1.9375em;
        width: 5.8215em;
        height: 3.3125em;
        /* background: #ccc; */
    }
    .ElectricityImg {
        width: 1.9375em;
        height: 3.3125em;
        float: left;
    }
    .ElectricityMore {
        float: right;
        color:#fff;
    }
    .ElectricityNumber {
        font-size:20px;
    }
    .RemoteUnlockBox {
        position: absolute;
        width: 11.3125em;
        height: 5em;
        top: 1.9375em;
        right: 1.875em;
        /* background: #ccc; */
    }
    .RemoteUnlock {
        position: absolute;
        right: 0;
        margin-top: 1em;
        margin-left: -3.656325em;
        font-size:13px;
        color:#fff;
        width:7.3125em;
        height:1.875em;
        line-height: 1.875em;
        text-align: center;
        border:1px solid #fff;
        border-radius: 45px;
    }
    .MyDynamicKey {
        font-size:13px;
        text-align: right;
        color:#FFFFFF;
    }
    .HistoryMenu {
        display:flex;
        align-items: center;
        height: 3.125em;
        border-bottom: 1px solid #ccc;
    }
    .HistoryMenuImg1 {
        width: 17px;
        height: 16px;
        margin-right: 3px;
        margin-bottom: -2px;
    }
    .HistoryMenuImg2 {
        width: 19px;
        height: 16px;
        margin-right: 3px;
        margin-bottom: -2px;
    }
    .HistoryMenuFont1,.HistoryMenuFont2 {
        flex-grow:1;
        text-align:center;
        height: 3.125em;
        line-height: 3.125em;
        color:#999;
    }
    .HistoryMenuFont1 {
        border-right: 1px solid #ccc;
    }
    .router-link-active {
        box-sizing:border-box;
        border-bottom: 4px solid #00AEFF;
        color: #00AEFF;
    }
    .BODY {
        position: relative;
    }
    .AllListMenu {
        position: absolute;
        bottom:0;
        width: 100%;
        height: 50px;
        background: red;
        border-top: 1px solid #ccc;
    }
</style>
