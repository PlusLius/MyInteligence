<!-- 网关管理员组件 -->
<template>
  <div>
    <!-- 锁添加密钥部分 -->
    <div class="addDevice">
      <div @click="SetScanQRcode">
        <img src="../../assets/qietu/添加设备.png" class="DeviceIcon">
        <div class="RichScan">扫一扫添加</div>
      </div>
      <div class="DeviceFont" @click="addKeyFun">手动添加</div>
    </div>
    <!---->
    <GetwayDrop v-for="item in Lis" :userName="item.name" :src="item.headUrl" :shareType="item. shareType" :shareInfo="item.shareInfo" :id="item.id" :gatewayUserId="item.gatewayUserId" @upup="change"></GetwayDrop>
    <!--手动输入id弹出框-->
    <div v-if="addKey">
      <div class="weui-mask"></div>
      <div class="weui-dialog addKeyBox">
        <div class="weui-dialog__hd addCancelTitle">手动添加</div>
        <div class="weui-dialog__bd addBd"><input type="text" class="allInput" placeholder="请输入设备编码" v-model="DevCode"><input type="text" class="allInput" placeholder="请输入设备名字" v-model="DeviceName"></div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_primary" @click="addConfirmFun">确定</a>
          <a class="weui-dialog__btn weui-dialog__btn_default" @click="addCancelFun">取消</a>
        </div>
      </div>
    </div>
    <!-- 扫描二维码后调弹框 -->
    <div id="dialog1" v-if="scanBox">
      <div class="weui-mask"></div>
      <div class="weui-dialog addKeyBox">
        <div class="weui-dialog__hd addCancelTitle">手动添加</div>
        <div class="weui-dialog__bd addBd">
          <input type="text" class="allInput" placeholder="请输入设备编码" v-model="myScanCode">
          <input type="text" class="allInput" placeholder="请输入系统秘钥名" v-model="myScanName">
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_primary" @click="addOK">确定</a>
          <a class="weui-dialog__btn weui-dialog__btn_default" @click="addCancel">取消</a>
        </div>
        </div>
      </div>
    </div>

      <!--错误弹出框-->
    <toast width="35%" v-model="wrong" type="warn">{{ wrongFont }}</toast>
    <!--成功弹框-->
    <toast width="35%" v-model="success" type="success">{{ successFont }}</toast>

    </div>
</template>
<script>
  import GetwayDrop from "../public/Pub-GatewayDrop.vue"
  import api from "../../api/api"
  import Vue from "vue"
  import { WechatPlugin,Toast } from 'vux'
  Vue.use(WechatPlugin)

  let Api = new api();
  export default {
    components: {
      GetwayDrop,
      Toast
    },
    data () {
      return {
        disabled: false,
        show: false,
        Lis: "",
        addKey:false,
        DevCode:"",
        DeviceName:"",
        scanBox:false,
        myScanCode:"",
        myScanName:"",
        wrong:false,
        success:false,
        wrongFont:"",
        successFont:"",
        deviceCode:""
      }
    },
    methods:{
      addKeyFun(){
          this.addKey = true;
      },
      //确定
      addConfirmFun(){
        let qs = require('qs');
        if (this.DevCode.length < 15){
            alert("请输入正确的设备编码")
        }else{
          Api.post("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus",qs.stringify({
            deviceCode : this.DevCode,
            deviceName : this.DeviceName
          }))
            .then(data =>{
              if (data.data.status == 0){
                this.addKey= false;
                alert("添加成功")
              }else{
                alert(data.data.msg)
              }
            })
        }
      },
      //取消
      addCancelFun(){
          this.addKey= false;
      },
      change(){
        Api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/share")
          .then(data =>{
            this.Lis = data.data.data.list;
          })
      },
      SetScanQRcode () {
          var that = this;
          Vue.wechat.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                   // this.scanBox = true;
                   that.myScanCode = res.resultStr;
                }
          })
          // // function demo(res){
          //   this.ScanQ = true;
          //   this.ScanQCode = res;
          //   this.deviceCode = "";
          //   this.ScanQName = "";
          // }

          this.scanBox = true;
      },
      addOK(){
         var qs = require('qs');
         Api.post("gatewayUser/"+window.localStorage.getItem('currentUserId')+"/deviceStatus",qs.stringify({
              deviceCode:this.myScanCode,
              deviceName: this.myScanName
             }))
             .then(data => {
                this.scanBox = false;

                if(data.data.data.status == 0){
                   this.success = true;
                   this.successFont = "添加设备成功!";
                }
                else {
                   this.wrong = true;
                   this.wrongFont = "添加设备失败!";
                }

             })
             .catch(data => {
               console.log(data)
             })
      },
      addCancel(){
        this.scanBox = false;
        this.deviceCode = "";
        this.deviceName = "";
      }
    },
    mounted(){
        Api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/share")
        .then(data =>{
            this.Lis = data.data.data.list;
            console.log(this.Lis);
        })
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
  div{
    margin:0;
    padding:0;
  }
  .addDevice {
    position: relative;
    width: 100%;
    height: toRem(520);
    background: #29b6f6;
  }
  .RichScan{
    position: absolute;
    height:toRem(45);
    line-height: toRem(45);
    top:toRem(302);
    width: 100%;
    text-align: center;
  @include font-dpr(16px);
    color: #FFFFFF;
  }
  .DeviceIcon,.DeviceFont {
    position: absolute;
    left:50%;
  }
  .DeviceIcon {
    margin-top:toRem(58);
    margin-left: toRem(-100);
    width: toRem(200);
    height: toRem(200);
  }
  .DeviceFont {
    bottom:toRem(53);
    margin-left: toRem(-175);
    width: toRem(350);
    height: toRem(80);
    line-height: toRem(82);
    text-align: center;
    color:#FFFFFF;
  @include font-dpr(16px);
    border-radius: toRem(40);
    border:1px solid white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .allInput{
    width:toRem(762);
    height:toRem(120);
    margin-bottom:toRem(32);
    box-sizing:border-box;
    padding-left:toRem(41);
    border: 1px #CCCCCC solid;
  @include font-dpr(16px);
  }
  .addCancelTitle{
    position: relative;
    color: #00A6F4;
    height:toRem(145);
    line-height:toRem(145);
  @include font-dpr(16px);
  }
  .addCancelTitle::after{
    transform: scaleY(0.5);
    content: "";
    height: 1px;
    color: #CCCCCC;
    position: absolute;
    left: 0;
    bottom: -1px;
    right:0;
    border-top:1px solid #cccccc;
  }
  .addBd{
    margin-top:toRem(48);
    margin-bottom: toRem(16);
  }
  .weui-dialog__btn_default{
    color: #666666;
  @include font-dpr(16px);
  }
  .weui-dialog__btn_primary{
    color: #00A6F4;
  @include font-dpr(16px);
  }
</style>








