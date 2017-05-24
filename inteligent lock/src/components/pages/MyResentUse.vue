<!-- 最近使用页面组件 -->
<template class="BODY">

    <div>
        <!-- 电量头部部分 -->
        <div class="MyResentUse">
            <div class="Electricity">
                <img :src="ComputedPowerImg" height="160" width="90" class="ElectricityImg">
                <div class="ElectricityMore">
                    <p class="ElectricityS">电量</p>
                    <p class="ElectricityNumber">{{power || 100}}%</p>
                </div>
            </div>
            <div class="RemoteUnlockBox">
                <div class="MyDynamicKey">
                    {{name || "模拟数据"}}: {{code || "没有设备请添加设备"}}
                </div>
                <div class="RemoteUnlock" @click="RemoteUnlock" v-if="name">
                    {{"远程开锁"}}
                </div>
                <div class="RemoteUnlock" v-else>
                    {{"远程开锁"}}
                </div>
            </div>
        </div>


        <div id="dialog1" v-show="ShowLog">
            <div class="weui-mask"></div>
            <div class="weui-dialog My-dialog ">

                <div class="weui-dialog__hd My-title" v-if="remoteSecretSetted && this.level == 1" v-show="!setPassWord"><strong class="weui-dialog__title" >远程开锁</strong></div>

                <!-- 非管理员 -->
                 <div class="weui-dialog__hd My-title" v-if="this.level != 1"><strong class="weui-dialog__title" >远程开锁</strong></div>

                <div class="weui-dialog__hd My-title" v-if="!remoteSecretSetted && this.level == 1"><strong class="weui-dialog__title" >设置密码</strong></div>

                <div class="weui-dialog__hd My-title" v-if="setPassWord"><strong class="weui-dialog__title" >修改密码</strong></div>

                <div class="weui-dialog__bd My-dialogBody">
                    <!-- 管理员没有修改过的情况 -->
                    <div v-if="!remoteSecretSetted && this.level == 1">
                        <input
                        type="password"
                        name="password"
                        placeholder="请输入您的远程开锁密码"
                        minlength="6"
                        class="My-PassWord"
                        v-model="firstPassWord"
                        >
                        <input
                        type="password"
                        name="password"
                        placeholder="请再次输入您的远程开锁密码"
                        minlength="6"
                        class="My-PassWord"
                        v-model="morePassWord"
                        @blur="verifyPassWord"
                        >

                    </div>
                    <div v-if="remoteSecretSetted && this.level == 1" class="My-PassWordBox">
                        <input
                        class="My-PassWord"
                        type="password"
                        name="password"
                        placeholder="请输入您的远程开锁密码"
                        v-show="MyChangePassWordBox"
                        minlength="6"
                        v-model="remoteOpenLock"
                        >
                        <div class="loading" v-if="loading">
                          <span class="loadingFont"> 拼命开锁中</span><spinner type="ios-small" slot="value" class="loadingIcon"></spinner>
                        </div>
                       <div
                       class="MyChangePassWordBox"
                       v-show="MyChangePassWordBox"
                       v-if="this.level == 1"
                       >
                            <div class="MyChangePassWord" @click="ChangePassWord">
                                修改密码
                            </div>
                        </div>
                    </div>
                    <!-- 非管理员 -->
                    <div v-if="this.level != 1" class="My-PassWordBox2">
                        <input
                        class="My-PassWord"
                        type="password"
                        name="password"
                        placeholder="请输入您的远程开锁密码"
                        v-show="MyChangePassWordBox"
                        minlength="6"
                        v-model="remoteOpenLock"
                        >
                        <div class="loading" v-if="loading">
                          <span class="loadingFont"> 拼命开锁中</span><spinner type="ios-small" slot="value" class="loadingIcon"></spinner>
                        </div>
                       <div
                       class="MyChangePassWordBox"
                       v-show="MyChangePassWordBox"
                       v-if="this.level == 1"
                       >
                            <div class="MyChangePassWord" @click="ChangePassWord">
                                修改密码
                            </div>
                        </div>
                    </div>

                    <div class="MyChangePassWordBox2"  v-show="MyChangePassWordBox2" v-if="this.level == 1">
                        <input
                        class="My-PassWordOld"
                        type="password"
                        name="password"
                        placeholder="请输入您的旧密码"
                        v-model="oldPasWord"
                        >

                        <input
                        class="My-PassWordNew"
                        type="password"
                        name="password"
                        placeholder="请输入您的新密码"
                        v-model="newPasWord"
                        >

                        <input
                        class="My-PassWordMoreNew"
                        type="password"
                        name="password"
                        placeholder="请再次输入您的新密码"
                        v-model="newMorePasWord"
                        >
                    </div>
                </div>

                <div class="weui-dialog__ft My-dialogBottom" v-if="remoteSecretSetted" v-show="!setPassWord">
                    <a href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_default MyOk"
                    @click="DialogOK"
                    >开锁</a>
                    <a href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_primary MyCancel "
                    @click="DialogCancel"
                    >取消</a>
                </div>
                <div class="weui-dialog__ft My-dialogBottom" v-if="!remoteSecretSetted">
                    <a href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_default MyOk"
                    @click="setRemotePasOk"
                    >确定</a>
                    <a href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_primary MyCancel "
                    @click="setRemotePasCancel"
                    >取消</a>
                </div>
                <div class="weui-dialog__ft My-dialogBottom" v-if="setPassWord">
                    <a href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_default MyOk"
                    @click="setPasOk"
                    >确定 </a>
                    <a href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_primary MyCancel "
                    @click="setPasCancel"
                    >取消</a>
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

        <div v-if="type == 'MyHistory'"  class="MyHistory">
            <MyHistory></MyHistory>
        </div>
        <div v-else-if="type == 'MyUserList'"   class="MyUserList">
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


                <!--错误弹出框-->
          <toast width="45%" v-model="wrong" type="warn">{{ msg }}</toast>
          <!--成功弹框-->
          <toast width="45%" v-model="success" type="success">{{ successFont }}</toast>
    </div>

</template>

<script>
    import MyHistory from '../MyHistory'
    import MyUserList from '../MyUserList'
    import API from '../../api/api'
    import { md5,Spinner,Toast } from 'vux'
    var api = new API()

    export default {
        data(){
            return {
                type: '',
                Active1:false,
                Active2:false,
                ShowLog:false,
                MyChangePassWordBox:true,
                MyChangePassWordBox2:false,
                code:'',
                functionCode:'',
                mode:'',
                name:'',
                power:'',
                remoteSecretSetted:'',
                level:'',
                powerImg:'',
                remoteOpenLock:'',
                firstPassWord:'',
                morePassWord:'',
                setPassWord:false,
                verifyBol:false,
                oldPasWord:'',
                newPasWord:'',
                newMorePasWord:'',
                verifySetPasBol:false,
                loading:false,
                wrong:false,
                success:false,
                msg:"",
                successFont:"",
            }
        },
        computed: {
            ComputedPowerImg(){
                if(this.power == 0){
                    this.powerImg = require('../../assets/qietu/0%.png')
                }
                else if(this.power <= 30){
                    this.powerImg = require('../../assets/qietu/20%.png')
                }
                else if(this.power <= 50){
                    this.powerImg = require('../../assets/qietu/40%.png')
                }
                else if(this.power <= 70){
                    this.powerImg = require('../../assets/qietu/60%.png')
                }
                else if(this.power <= 90){
                    this.powerImg = require('../../assets/qietu/80%.png')
                }
                else if(this.power == 100){
                    this.powerImg = require('../../assets/qietu/100%.png')
                }
                else {
                    this.powerImg = require('../../assets/qietu/100%.png')
                }
                return this.powerImg;
            }
        },
        components: {
            MyHistory,
            MyUserList,
            Spinner,
            Toast
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
            RemoteUnlock () {
                this.firstPassWord = '';
                this.morePassWord = '';
                this.ShowLog = true;
                this.MyChangePassWordBox2 = false;
            },
            DialogOK () {

                var qs = require("qs");

                if(this.remoteOpenLock != ""){
                     this.loading = true;

                    api.post("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/control",qs.stringify({
                        remoteSecret:md5(this.remoteOpenLock,"remoteSecret")
                    }))
                    .then(res => {
                        // alert(res.data.status)
                        if(res.data.status == 0){
                            // alert(this.loading)
                            openLock()
                        }
                        else {
                            this.wrong = true;
                            this.loading = false;
                            this.msg = res.data.msg;
                        }
                    })

                    var that = this;
                    function openLock(){
                         var timer = null;
                         // alert(that.loading)
                         timer = setInterval(()=>{

                            api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/control")
                            .then( res => {
                                if(res.data.data.success == true){
                                    that.loading = false;
                                    that.success = true;
                                    that.successFont = "开锁成功!"
                                    that.remoteOpenLock = ''
                                    that.ShowLog = false;
                                    that.MyChangePassWordBox = true;
                                    clearInterval(timer);
                                }
                                else {
                                    that.loading = false;
                                    that.wrong = true;
                                    that.msg = "开锁失败!"
                                    that.remoteOpenLock = ''
                                    that.ShowLog = false;
                                    that.MyChangePassWordBox = true;
                                }
                            })
                            .catch(err => {

                                console.log(err)
                                clearInterval(timer)
                            })

                        },3000)
                    }

                    // if(res.data.status == 0){
                    //      var index = 0;
                    //      var timer = null;
                    //      var flag = true;
                    //      timer = setInterval(function(){
                    //         if(index == 6){
                    //             clearInterval(timer)
                    //         }
                    //         if(index == 3 || index == 5){
                    //             api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/control")
                    //             .then(res => {
                    //                 if(res.data.data.success && flag){
                    //                     alert("开锁成功!")
                    //                     flag = false;
                    //                     clearInterval(timer)
                    //                 }
                    //             })
                    //             .catch(err => {
                    //                 console.log(err)
                    //             })
                    //          }
                    //          index++
                    //     },1000)
                    // }
                    // else {
                    //     alert("开锁失败")
                    // }
                    // })
                    // .catch(err => {
                    //     console.log(err)
                    // })
                }
                // this.remoteOpenLock = ''
                // this.ShowLog = false;
                // this.MyChangePassWordBox = true;
            },
            DialogCancel () {
                this.loading = false;
                this.ShowLog = false;
                this.MyChangePassWordBox = true;
            },
            ChangePassWord() {
                if(this.MyChangePassWordBox){
                    this.loading = false;
                    this.MyChangePassWordBox2 = true;
                    this.MyChangePassWordBox = false;
                }
                this.setPassWord = true;
            },
            setRemotePasOk(){
                var qs = require('qs');
                api.put("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId"),qs.stringify({
                    remoteSecret:md5(this.morePassWord,"remoteSecret")
                }))
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
                if(this.verifyBol){
                    this.ShowLog = false;
                    this.MyChangePassWordBox = true;
                    this.remoteOpenLock = '';
                    this.remoteSecretSetted = true;
                }
            },
            setRemotePasCancel(){
                this.ShowLog = false;
                this.MyChangePassWordBox = true;
            },
            verifyPassWord(){
                if(this.firstPassWord == this.morePassWord){
                    this.verifyBol = true;
                }
                else {
                    alert("2次密码输入不一致,请重新输入")
                    this.verifyBol = false;
                }
            },
            setPasOk(){
                if(this.newPasWord == this.newMorePasWord){
                    this.verifySetPasBol = true;
                }
                else {
                    alert("2次密码输入不一致,请重新输入")
                    this.verifySetPasBol = false;
                }
                if(this.verifySetPasBol){
                    var qs = require("qs");
                    api.put("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId"),qs.stringify({
                        remoteSecret:md5(this.newMorePasWord,"remoteSecret"),
                        oldRemoteSecret:md5(this.oldPasWord,"remoteSecret")
                    }))
                    .then(res => {

                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                    this.oldPasWord = '';
                    this.newPasWord = '';
                    this.newMorePasWord = '';
                    this.ShowLog = false;
                    this.MyChangePassWordBox = true;
                    this.setPassWord = false;
                }
            },
            setPasCancel(){
                this.setPassWord = false;
                this.ShowLog = false;
                this.MyChangePassWordBox = true;
            }

        },
        mounted(){
            this.MyHistory();
            this.code = this.$route.query.code;
            this.functionCode = this.$route.query.functionCode;
            this.mode = this.$route.query.mode;
            this.name = this.$route.query.name;
            this.power = this.$route.query.power;
            this.remoteSecretSetted = this.$route.query.remoteSecretSetted;
            this.level = this.$route.query.level;

            // api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId"))
            // .then(res =>{
            //     this.code = res.data.data.code
            //     this.functionCode = res.data.data.functionCode
            //     this.mode = res.data.data.mode
            //     this.name = res.data.data.name
            //     this.power = res.data.data.power
            //     this.remoteSecretSetted = res.data.data.remoteSecretSetted
            //     this.level = res.data.data.level
            // })
            // .catch(err => {
            //     console.log(err)
            // })

            // this.remoteSecretSetted = false;
            // alert(this.remoteSecretSetted)
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

    input[type=password] {
        border: 1px solid #ccc;
        background-color:transparent;
        color:#ccc;
        FILTER: alpha(opacity=0); /*androd*/
        appearance:none;  /*下拉框去掉右侧图标*/
        -moz-appearance:none;
        -webkit-appearance:none;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
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
        position: absolute;
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
    .My-dialog {
        width: toRem(901);
        background: #F8F8F8;
    }

    .My-title {
        position: relative;
        height: toRem(145);
        line-height: toRem(145);
        @include font-dpr(15px);
        color:#00A6F4;

      /*   border-bottom: 1px solid #B5B5B5; */
    }
    .My-title:after {
        transform: scaleY(0.5);
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #D5D5D6;
        color: #D5D5D6;
    }
    .weui-dialog__hd {
        box-sizing:border-box;
        padding:0;
    }

    .My-PassWord,.My-PassWordOld,.My-PassWordNew,.My-PassWordMoreNew {
        margin-top: toRem(70);
        width: 100%;
        height: toRem(120);
        text-align: center;
        @include font-dpr(15px);
        color:#CCCCCC;
    }
    .My-PassWordOld,.My-PassWordNew,.My-PassWordMoreNew {
        margin-top: toRem(32);
        text-align: left;
        color:#ccc;
        padding-left:toRem(41);
        box-sizing:border-box;
    }
    .MyChangePassWordBox {
        display:flex;
        justify-content:center;
    }
    .MyChangePassWord {
        margin-top: toRem(65);
        width: toRem(400);
        height: toRem(80);
        line-height: toRem(80);
        border-radius: 40px;
        border: 1px solid #0EAAF4;
        color:#0EAAF4;
    }
    .My-dialogBottom {
        height:toRem(140);
        line-height:toRem(150);
        display:flex;
        justify-content:flex-starts;
    }
    .MyOk {
        color:#0EAAF4;
    }
    .MyCancel {
        color:#666666;
    }
    .MyHistory,.MyUserList{
        position:relative;
        min-height:toRem(1056)
    }
    .loading {

    }
    .loadingFont{
        position: relative;
        top:toRem(7)
    }
    .My-PassWordBox2 {
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:toRem(400);
    }
</style>
