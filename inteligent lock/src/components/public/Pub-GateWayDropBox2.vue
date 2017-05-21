
<template>
  <div>
      <div v-if="gatewayShow">
          <!-- 开始 -->

          <swipeout>
              <swipeout-item
              @on-close="handleEvents('gateway-on-close')"
              @on-open="handleEvents('gateway-on-open',gatewayUserId)"
              transition-mode="follow"

              >
                <div slot="right-menu">
                   <swipeout-button
                    @click.native="onButtonClick('gatewayEdit')"
                    type="primary"
                    :width="73"
                    background-color="#00A6F4"
                    >编辑</swipeout-button>
                  <swipeout-button
                    @click.native="onButtonClick('gatewayDelete')"
                    type="warn"
                    :width="73"
                    background-color="#E74C3C"
                    >删除</swipeout-button>
                </div>
                <div slot="content" class="GateWayBox" @click="saveGatewayUserId(gatewayUserId)">
                      <div class="GateWaySwiperBox">
                        <img src="../../assets/qietu/盒子.png" v-if="online"/>
                        <img src="../../assets/qietu/盒子灰.png" v-else >
                      </div>
                      <div class="GateWayIDBox">
                         <p class="GateWayName">{{name}}</p>
                         <p class="GateWayID">ID: {{gatewayCode}}</p>
                      </div>
                      <div class="GateWayArrow icon-top"
                       @click="arrowTogle(gatewayUserId)"
                       :class="{'arrowUp':!flag,'arrowDown':flag}">

                      </div>
                </div>
              </swipeout-item>
           </swipeout>



          <div v-if="!gatewayLockList">
            请添加锁 {{gatewayLockList}}
          </div>
              <swipeout>
           <transition-group name="fade">
            <swipeout-item
             @click.native="SaveId(item.id,item.gatewayUserId)"
              v-for="(item,index) in gatewayLockList"
              @on-close="handleEvents('gatewayLock-on-close')"
              @on-open="handleEvents('gatewayLock-on-open')"
              transition-mode="follow"
              v-if="flag"
              v-show="!item.lockListHide"
              :key="item.id"
            >
              <div slot="right-menu">
               <!--   <swipeout-button
                    @click.native="onButtonClick('deviceEdit',index)"
                    type="primary"
                    :width="73"
                    background-color="#00A6F4"
                    v-model="show"
                    >编辑</swipeout-button> -->
                  <swipeout-button
                    @click.native="onButtonClick('deviceDelete',index)"
                    type="warn"
                    :width="73"
                    background-color="#E74C3C"
                    >删除</swipeout-button>
              </div>
              <div
              slot="content"
              class="GateWayDropChild vux-1px-b"
              @click="router(item.name,item.code,item.functionCode,item.power,item.mode,item.remoteSecretSetted)"
              >
                <div class="GateWayChildLock icon-lock"></div>
                <div class="GateWayChildMore">
                    <p class="GateWayChildLockTitle">{{item.name}}</p>
                    <p class="GateWayChildLockID">ID: {{item.code}}</p>
                </div>
              </div>
            </swipeout-item>
            </transition-group>
        </swipeout>

        <div v-transfer-dom>
            <div id="dialog1" v-if="show">
            <div class="weui-mask"></div>
            <div class="weui-dialog editDialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">编辑网关</strong></div>
                <div class="weui-dialog__bd">
                  <input
                  type="text"
                  name="text"
                  class="editMsg"
                  placeholder="请输入想要编辑的网关"
                  v-model="gatewayNameMsg"
                  >
                </div>
                <div class="weui-dialog__ft">
                    <a
                    href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_default gatewaySure"
                    @click="editGatewayOk"
                    >确定
                    </a>
                    <a
                    href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_primary gatewayDel"
                    @click="editGatewayCancel"
                    >取消
                    </a>
                </div>
            </div>
        </div>
      </div>

      <div v-transfer-dom>
        <div id="dialog2" v-if="lockShow">
            <div class="weui-mask"></div>
            <div class="weui-dialog editDialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">编辑锁信息</strong></div>
                <div class="weui-dialog__bd">
                  <input
                  type="text"
                  name="text"
                  class="editLockMsg"
                  placeholder="请输入想要编辑的设备名字"
                  v-model="gatewayLockNameMsg"
                  >
                  <input
                  type="text"
                  name="text"
                  class="editRemote"
                  placeholder="请输入远程密码"
                  v-model="remoteSecret"
                  >

                </div>
                <div class="weui-dialog__ft">
                    <a
                    href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_default gatewaySure"
                    @click="editGatewayLockOk"
                    >确定
                    </a>
                    <a
                    href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_primary gatewayDel"
                    @click="editGatewayLockCancel"
                    >取消
                    </a>
                </div>
            </div>
        </div>
      </div>

          <!-- 结束 -->
      </div>
  </div>
</template>


<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import {TransferDom } from 'vux'
import API from '../../api/api'
import Vue from 'vue'
var api = new API();

export default {
   props: [
          'name',
          'gatewayCode',
          'gatewayLockList',
          'online',
          'gatewayUserId',
          'index',
          'list',
          'flag'
   ],
   directives: {
    TransferDom
   },
   components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton
   },
   data () {
      return {
        disabled: false,
        show: false,
        lockShow:false,
        lockIndex:'',
        gatewayNameMsg: '',
        gatewayLockNameMsg:'',
        remoteSecret:'',
        currentLockList:[],
        gatewayShow:true,
        remoteUpdateShow:false,
        remoteUpdateMsg: {},
      }
    },
   methods: {
      onButtonClick (type,index) {
        // alert('on button click ' + type)
        if(type == 'gatewayEdit'){
          this.show = true;
        }
        if(type == 'gatewayDelete'){
          // api.deletes('gatewayUser/'+window.localStorage.getItem('currentUserId'))
          // .then( data => {
          //   if(data.data.data == true){
                this.gatewayShow = false
          //   }
          // })
          // .catch( err => {
          //   console.log(err)
          // })
        }
        if(type == 'deviceEdit') {
          this.lockShow = true;
          this.lockIndex = index
        }
        if(type == 'deviceDelete'){
          // api.deletes('gatewayUser/'+window.localStorage.getItem('currentUserId')+"/deviceStatus/" + this.gatewayLockList[this.lockIndex].id)
          // .then( data => {
          //   console.log(data)
          //   if(data.data.data == true){
                Vue.set(this.gatewayLockList[index],"lockListHide",true)
          //   }
          // })
          // .catch( err => {
          //   console.log(err)
          // })
        }
      },
      handleEvents (type,id) {

        if(type == "gateway-on-open"){

            window.localStorage.setItem("currentUserId",id);
            window.localStorage.setItem("gatewayUserId",window.localStorage.getItem("currentUserId"));

            api.get("gatewayUser/" + window.localStorage.getItem('currentUserId') + "/deviceStatus")
            .then(data => {
                var currentLockList = data.data.data.list;
                this.currentLockList = data.data.data.list;
                Vue.set(this.list[this.index],"Devlist",currentLockList)
            })
            .catch( err => {
              console.log(err)
            })

        }

      },
      arrowTogle (id) {
        window.localStorage.setItem("currentUserId",id)
        window.localStorage.setItem("gatewayUserId", window.localStorage.getItem("currentUserId"))
        // if(!window.localStorage.getItem("currentUserId")){
        //   window.localStorage.setItem("currentUserId",id)
        //   var historyId = window.localStorage.getItem("currentUserId")
        //   window.localStorage.setItem("gatewayUserId",historyId)
        // }
        if(!this.flag){
          api.get("gatewayUser/" + window.localStorage.getItem('currentUserId') + "/deviceStatus")
          .then(data => {
              var currentLockList = data.data.data.list;

              Vue.set(this.list[this.index],"Devlist",currentLockList)
              // Vue.set(this.list[this.index],"flag",!this.arrowMoveUp)
              // console.log(this.list[this.index]["Devlist"])
          })
          .catch( err => {
            console.log(err)
          })
        }
          Vue.set(this.list[this.index],"flag",!this.flag)
      },
      SaveId (LockId,UserId) {
        window.localStorage.setItem("gatewayUserId",UserId);
        window.localStorage.setItem("gatewayLockId",LockId);
      },
      saveGatewayUserId (id) {

       window.localStorage.setItem("currentUserId",id)

       window.localStorage.setItem("gatewayUserId", window.localStorage.getItem("currentUserId"))
      },
      router (name,code,functionCode,power,mode,remoteSecretSetted){

        console.log(power)
        this.$router.replace(
          { path: '/MyResentUse',
            query: {
                name: name,
                code: code,
                functionCode: functionCode,
                power: power,
                mode: mode,
                remoteSecretSetted: remoteSecretSetted
            }
          }
        );
      },
      editGatewayOk(){
        var qs = require("qs")
        api.put('gatewayUser/'+window.localStorage.getItem('currentUserId'),qs.stringify({
          name: this.gatewayNameMsg
        }))
        .then( data => {
          if(data.data.data == true){
            Vue.set(this.list[this.index],"name",this.gatewayNameMsg)
            this.gatewayNameMsg = '';
          }
        })
        .catch( err => {
          console.log(err)
        })

        this.show = false;
      },
      editGatewayCancel(){
        this.gatewayNameMsg = '';
        this.show = false;
      },
      editGatewayLockOk(){
        var qs = rquire("qs")
        api.put('gatewayUser/'+window.localStorage.getItem('currentUserId')+'/deviceStatus/'+window.localStorage.getItem('gatewayLockId'),qs.stringify({
          name: this.gatewayLockNameMsg,
          remoteSecret:this.remoteSecret
        }))
        .then( data => {
          console.log(this.lockIndex)
          if(data.data.data == true){
            Vue.set(this.gatewayLockList[this.lockIndex],"name",this.gatewayLockNameMsg);
            this.gatewayLockNameMsg = '';
            this.remoteSecret = '';
          }
        })
        .catch( err => {
          console.log(err)
        })
        this.lockShow = false;
      },
      editGatewayLockCancel(){
        this.gatewayLockNameMsg = '';
        this.remoteSecret = '';
        this.lockShow = false;
      },
   },
   mounted() {

   }
}
</script>

<style lang='scss' scoped>
  @function toRem ($DraftSize) {
      @return  ($DraftSize / 144 * 100) / 75 * 1rem;
  }
  @mixin font-dpr($font-size){
      font-size: $font-size;
      [data-dpr="2"] & { font-size: $font-size * 2; }
      [data-dpr="3"] & { font-size: $font-size * 3; }
  }

  .GateWayBox {
    width: 100%;
    height: toRem(221);
  }
  .swipeout-1px:before {
      transform: scaleY(0.5);
      content: " ";
      position: absolute;
      left: 0;
      top: -1px;
      right: 0;
      height: 1px;
      border-top: 1px solid #D5D5D6;
      color: #D5D5D6;
  }

  .GateWaySwiperBox {
    float: left;
    width: toRem(209);
    height: toRem(221);
    text-align: center;
  }

  .GateWaySwiperBox img {
    width: toRem(116);
    height: toRem(134);
    margin-top: toRem(54);
  }

  .GateWayIDBox {
    float: left;
    height: toRem(221);
  }

  .GateWayName {
    margin-top: toRem(50);
    @include font-dpr(15px);
    color:#444444;
  }

  .GateWayID {
    @include font-dpr(12px);
    color:#A5A5A5;
  }

  .GateWayAdminBox {
    float: right;
    width: toRem(158);
    height: toRem(221);
    margin-right: toRem(58);
    text-align: center;
    color:#F39C12;
  }

  .GateWayDropBox {
    display:flex;
    list-style:none;
    background: #FFFFFF;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    @include font-dpr(12px);
    color:#00A6F4;
  }
  .GateWayEdit,.GateWayShare,.GateWayDelete,.GateWayUpDate {
      height:toRem(121);
      line-height: toRem(121);
      text-align: center;
      border-right:1px solid #CCCCCC;
  }
  .GateWayEdit {
    flex:2;
  }
  .icon-edit:before {
    @include font-dpr(16px);
    margin-right: toRem(16);
    position:relative;
    top:2px;
  }
  .GateWayUpDate {
    flex:2;
  }
  .icon-RemoteUpgrade:before {
    @include font-dpr(16px);
    margin-right: toRem(16);
    position:relative;
    top:3px;
  }
  .GateWayArrow {
    float: right;
    width: 20%;
    text-align: center;
    height: toRem(221);
    line-height: toRem(221);
    color:#00A6F4;
  }
  .icon-top:before {
    @include font-dpr(16px);
    display: inline-block;
    transform-origin: center center;
  }

  .arrowDown{
     transform:rotate(180deg);
     transition: all 0.5s linear;
  }
  .arrowUp {
     transition: all 0.5s linear;
  }

  .icon-Administrators {
     margin-top: toRem(50);
     @include font-dpr(24px);
  }

  .GateWayDropChild {
      height: toRem(150);
      background: #F8F8F8;
  }

  .GateWayChildLock {
      float: left;
      width: toRem(256);
      height: toRem(150);
      text-align: right;
      @include font-dpr(19px);
      line-height: toRem(150);
      color:#00A6F4;
  }

  .icon-lock:before {
      @include font-dpr(22px);
  }

  .GateWayChildMore {
     float: left;
     margin-left: toRem(41);
  }

  .GateWayChildLockTitle {
       margin-top: toRem(16);
       @include font-dpr(15px);
       color:#666666;
  }

  .GateWayChildLockID {
      @include font-dpr(12px);
      color:#A5A5A5;
  }

   .editDialog {
    width: toRem(901);
  }

  .weui-dialog__hd {
    color:#00A6F4;
  }

  .gatewayDel {
    color:#666666;
  }

  .gatewaySure {
    color:#00A6F4;
  }

  .remoteUpdateMore {
    line-height: 1.8;
    padding-top: toRem(30);
    box-sizing:border-box;
  }

  .weui-dialog__hd:after {
    content: " ";
    position: absolute;
    left: 0;
    top:55px;
    right: 0;
    height: 1px;
    border-top: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .weui-dialog__bd {
    min-height:toRem(409);
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
  }

  .editMsg,.editLockMsg,.editRemote {

    width: toRem(762);
    height: toRem(120);
    text-align: center;
  }

  .editLockMsg {
    margin-top: toRem(50)
  }

  .pressUpdate {
    width: toRem(400);
    height: toRem(80);
    border-radius: 40px;
    border: 1px solid #0EAAF4;
    color:#0EAAF4;
    background: #fff;
    @include font-dpr(16px);
    font-family:"微软雅黑";
  }

 input[type=text] {
    border: 1px solid #ccc;
    background-color:transparent;
    color:black;
    @include font-dpr(15px);
    FILTER: alpha(opacity=0); /*androd*/
    appearance:none;  /*下拉框去掉右侧图标*/
    -moz-appearance:none;
    -webkit-appearance:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>

