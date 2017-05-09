<template>
  <div>
      <div v-if="list.length === 0">
          没有网关,请添加网关
      </div>
      <div v-for="item in list">
          <GateWayDropBox
             v-if = "item.level === 1"
            @click.native = "SaveID(item.id)"
            :name = "item.name"
            :gatewayCode = "item.gatewayCode"
            :online = "item.online"
          ></GateWayDropBox>
          <GateWayDropBox2  v-if = "item.level !== 1">

          </GateWayDropBox2>

      </div>


      <div class="AllListMenu">
            <router-link to="/MyResentUse" class="MyHistoryUse icon-RecentUse">
                最近使用
            </router-link>
            <router-link to="/MyInteligence" class="MyInteligen icon-MyInteligence ">
                我的智能
            </router-link>
      </div>
  </div>
</template>


<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import GateWayDropBox from "../public/Pub-GateWayDropBox"
import GateWayDropBox2 from "../public/Pub-GateWayDropBox2"

import API from "../../api/api"
var api = new API();


export default {
   components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton,
      GateWayDropBox,
      GateWayDropBox2
    },
   data () {
      return {
        disabled: false,
        arrowMove1: false,
        arrowMove2: true,
        isTrue:false,
        list:[]
      }
    },
   methods: {
      onButtonClick (type) {
        alert('on button click ' + type)
      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      arrowTogle (){
        this.arrowMove1 = !this.arrowMove1;
        this.arrowMove2 = !this.arrowMove2;
        this.isTrue = !this.isTrue;
      },
      SaveID (id) {
        window.localStorage.setItem("GateWayUserID",id)
      }
   },
   mounted(){
      api.get("gatewayUser")
      .then(data => {
        this.list = data.data.data.list;
        // console.log(this.list[0].id)
        // window.localStorage.setItem("GateWayUserID",this.list.id)
      })
      .catch(err => {
        console.log(err)
      })
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
    flex:1;
    text-align: center;
  }
  .icon-top:before {
    @include font-dpr(16px);
    display: inline-block;
    position:relative;
    top:toRem(38);
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
    .router-link-active{
       color:#00AEFF;
    }
</style>

