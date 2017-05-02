<!-- 最近使用页面组件 -->
<template class="BODY">

    <div>
        <!-- 电量头部部分 -->
        <div class="MyResentUse">
            <div class="Electricity">
                <img src="../../assets/qietu/100%.png" class="ElectricityImg">
                <div class="ElectricityMore">
                    <p class="ElectricityS">电量</p>
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

        <div class="HistoryMenu">
            <div class="HistoryMenuFont1 icon-History" :class="{colorBlue:Active1}" @click="MyHistory()">
                历史记录
            </div>
            <div class="HistoryMenuFont2 icon-UserList" :class="{colorBlue:Active2}" @click="MyUserList()">
                用户列表
            </div>
        </div>

        <div v-if="type == 'MyHistory'">
            <MyHistory></MyHistory>
        </div>
        <div v-else-if="type == 'MyUserList'">
            <MyUserList></MyUserList>
        </div>


        <div class="AllListMenu">
            <router-link to="/MyResentUse" class="MyHistoryUse icon-RecentUse">
                最近使用
            </router-link>
            <router-link to="/MyInteligence" class="MyInteligen icon-MyInteligence">
                我的智能
            </router-link>
        </div>
    </div>

</template>

<script>
    import MyHistory from '../MyHistory'
    import MyUserList from '../MyUserList'
    export default {
        data(){
            return {
                type: '',
                Active1:false,
                Active2:false
            }
        },
        components: {
            MyHistory,
            MyUserList
        },
        methods: {
            MyHistory (){
                this.Active2 = false;
                this.type = 'MyHistory';
                this.Active1 = true;
            },
            MyUserList (){
                this.Active1 = false;
                this.type = 'MyUserList';
                this.Active2 = true;
            },
        },
        mounted(){
            this.MyHistory();
        }
    }
</script>

<style lang="scss" scoped>
    @function toRem ($DraftSize) {
        @return  ($DraftSize / 144 * 100) / 75 * 1rem;
    }
    @mixin font-dpr($font-size){
        font-size: $font-size;
        [data-dpr="2"] & { font-size: $font-size * 2; }
        [data-dpr="3"] & { font-size: $font-size * 3; }
    }

    .MyResentUse {
        position: relative;
        width: 100%;
        height: toRem(352);
        background: #00A6F4;
    }
    .Electricity {
        position: absolute;
        left: toRem(94);
        top: toRem(93);
        width: toRem(400);
        /* background: #ccc; */
    }
    .ElectricityImg {
        width: toRem(92);
        height: toRem(160);
        float: left;
    }
    .ElectricityMore {
        float: left;
        margin-left: toRem(63);
        height: toRem(160);
        @include font-dpr(15px);
        color:#fff;
    }
    .ElectricityNumber {
        @include font-dpr(20px)
        height: toRem(80)
    }
    .ElectricityS {
        height: toRem(80)
    }
    .RemoteUnlockBox {
        position: absolute;
        width: toRem(600);
        height: toRem(160);
        top: toRem(100);
        right: toRem(92);
        /* background: #ccc; */
    }
    .RemoteUnlock {
        position: absolute;
        right: 0;
        margin-top: toRem(41);
        margin-left: -3.656325em;
        @include font-dpr(13px)
        color:#fff;
        width:toRem(351);
        height:toRem(91);
        line-height: toRem(91);
        text-align: center;
        border:1px solid #fff;
        border-radius: 45px;
    }
    .MyDynamicKey {
        // @include font-dpr(13px)
        text-align: right;
        color:#FFFFFF;
    }
    .HistoryMenu {
        display:flex;
        align-items: center;
        height: toRem(151);
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
        height: toRem(151);
        line-height: toRem(151);
        color:#999;
        vertical-align:middle;
        align-items: flex-end;
        @include font-dpr(15px)
    }
    .HistoryMenuFont1 {
        border-right: 1px solid #ccc;
    }
    .router-link-active {
        color: #00A6F4 !important;
    }
    .AllListMenu {
        position: relative;
        display:flex;
        align-items: center;
        bottom:0;
        width: 100%;
        height: toRem(159);
        background: #F8F8F8;
        border-top: 1px solid #ccc;
    }
    .MyHistoryUse,.MyInteligen {
        flex-grow:1;
        text-align:center;
        @include font-dpr(10px)
        color:#999;
    }
    .icon-History:before,.icon-UserList:before {
        position: relative;
        top: 1px;
        @include font-dpr(15px)
        vertical-align: top;
    }
    .icon-RecentUse:before,.icon-MyInteligence:before {
        display:block;
        @include font-dpr(20px)
        margin-bottom: 5px;
    }
    .colorBlue {
        color:#00AEFF;
        box-sizing:border-box;
        border-bottom:4px solid #00AEFF;
    }
    .BODY {
        position:relative;
    }
</style>
