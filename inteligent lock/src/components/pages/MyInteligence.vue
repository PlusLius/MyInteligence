<template>
  <div>

      <swipeout>
          <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
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
            <div slot="content" class="GateWayBox vux-1px-t">
                  <div class="GateWaySwiperBox">
                    <img src="../../assets/qietu/盒子.png"/>
                  </div>
                  <div class="GateWayIDBox">
                     <p class="GateWayName">乾元物联</p>
                     <p class="GateWayID">ID: 01234567890123456789</p>
                  </div>
                  <div class="GateWayAdminBox">
                      <div class="icon-Administrators"></div>
                      管理员
                  </div>
            </div>
          </swipeout-item>
       </swipeout>
       <ul class="GateWayDropBox">
         <li class="GateWayEdit icon-edit">编辑</li>
         <li class="GateWayUpDate icon-RemoteUpgrade">远程升级</li>
         <li class="GateWayArrow icon-top"></li>
       </ul>

      <swipeout>
        <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-t">
          {{'JavaScript is the best language'}}
          </div>
        </swipeout-item>
       </swipeout>

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
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
export default {
   components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton
    },
   data () {
      return {
        disabled: false
      }
    },
   methods: {
      onButtonClick (type) {
        alert('on button click ' + type)
      },
      handleEvents (type) {
        console.log('event: ', type)
      }
   },
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
    position:relative;
    top:toRem(38);
  }

  .icon-Administrators {
     margin-top: toRem(50);
     @include font-dpr(24px);
  }

  .AllListMenu {
      position: fixed;
      display:flex;
      align-items: center;
      bottom:0;
      width: 100%;
      height: 50px;
      background: #F8F8F8;
      border-top: 1px solid #ccc;
  }
  .MyHistoryUse,.MyInteligen {
      flex-grow:1;
      text-align:center;
      font-size: 10px;
      color:#999;
  }
  .icon-History:before,.icon-UserList:before {
      position: relative;
      top: 1px;
      font-size: 20px;
      vertical-align: top;
  }
  .icon-RecentUse:before,.icon-MyInteligence:before {
      display:block;
      font-size:24px;
      margin-bottom: 5px;
  }
  .router-link-active {
      color: #00A6F4 !important;
  }
  .colorBlue {
      color:#00AEFF;
      box-sizing:border-box;
      border-bottom:4px solid #00AEFF;
  }
</style>

