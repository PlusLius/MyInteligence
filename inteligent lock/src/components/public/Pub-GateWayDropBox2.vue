
<template>
  <div>
      <div>
          <!-- 开始 -->

          <swipeout>
              <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow"

              >
                <div slot="right-menu">
                  <swipeout-button
                    @click.native="onButtonClick('fav')"
                    type="primary"
                    :width="73"
                    background-color="#00A6F4"
                    >编辑</swipeout-button>
                  <swipeout-button
                    @click.native="onButtonClick('delete')"
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
                       :class="{'arrowUp':arrowMove1,'arrowDown':arrowMove2}">

                      </div>
                </div>
              </swipeout-item>
           </swipeout>



          <div v-if="!gatewayLockList">
            请添加锁 {{gatewayLockList}}
          </div>
          <swipeout
            v-for="item in gatewayLockList"
            @click.native="SaveId(item.id,item.gatewayUserId)"
          >
           <transition name="fade">
            <swipeout-item
            @on-close="handleEvents('on-close')"
            @on-open="handleEvents('on-open')"
            transition-mode="follow"
            v-if="item.id ? !isTrue : isTrue"
            @click = "router"
            >
              <div slot="right-menu">
                 <swipeout-button
                    @click.native="onButtonClick('fav')"
                    type="primary"
                    :width="73"
                    background-color="#00A6F4"
                    >编辑</swipeout-button>
                  <swipeout-button
                    @click.native="onButtonClick('delete')"
                    type="warn"
                    :width="73"
                    background-color="#E74C3C"
                    >删除</swipeout-button>
              </div>
              <div slot="content" class="GateWayDropChild vux-1px-b">
                <div class="GateWayChildLock icon-lock"></div>
                <div class="GateWayChildMore">
                    <p class="GateWayChildLockTitle">{{item.name}}</p>
                    <p class="GateWayChildLockID">ID:  {{item.code}}</p>
                </div>
              </div>
            </swipeout-item>
            </transition>
        </swipeout>


          <!-- 结束 -->
      </div>
  </div>
</template>


<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
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
          'list'
   ],
   components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton
   },
   data () {
      return {
        disabled: false,
        arrowMove1: false,
        arrowMove2: true,
        isTrue:false
      }
    },
   methods: {
      onButtonClick (type) {
        alert('on button click ' + type)
      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      arrowTogle (id){
        if(!window.localStorage.getItem("currentUserId")){
          window.localStorage.setItem("currentUserId",id)
          var historyId = window.localStorage.getItem("currentUserId")
          window.localStorage.setItem("gatewayUserId",historyId)
        }
        if(this.arrowMove2){
          api.get("gatewayUser/" + window.localStorage.getItem('currentUserId') + "/deviceStatus")
          .then(data => {
              var currentLockList = data.data.data.list;
              Vue.set(this.list[this.index],"Devlist",currentLockList)
          })
          .catch( err => {
            console.log(err)
          })
        }
        this.arrowMove1 = !this.arrowMove1;
        this.arrowMove2 = !this.arrowMove2;
        this.isTrue = ! this.arrowMove2
      },
      SaveId (LockId,UserId) {
        window.localStorage.setItem("gatewayUserId",UserId);
        window.localStorage.setItem("gatewayLockId",LockId);
      },
      saveGatewayUserId (id) {
        window.localStorage.setItem("currentUserId",id)
      },
      router (){
        this.$router.push('/MyResentUse');
      }

   },
   mounted() {
      this.arrowMove1 = !this.arrowMove1;
      this.arrowMove2 = !this.arrowMove2;
      this.isTrue = ! this.arrowMove2
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

  .arrowUp{
     transform:rotate(180deg);
     transition: all 0.5s linear;
  }
  .arrowDown {
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>

