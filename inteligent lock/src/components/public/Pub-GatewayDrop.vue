<!-- 网关管理员组件 -->
<template>
  <div>
    <!--用户-->
    <div class="SharePeople" @click="arrowTogle"  v-on:click="show = !show">
      <img :src="src" class="ShareImg">
      <div class="shareName">{{ userName }}</div>
      <div class="down">
        <div class="icon-down" :class="{'arrowUp':arrowMove1,'arrowDown':arrowMove2}">
        </div>
      </div>

    </div>
    <!--分享的设备-->
    <swipeout>
      <swipeout-item
        :disabled="disabled" ref="swipeoutItem"
        :right-menu-width="73"
        :sensitivity="15" v-for="shareItem in shareInfo">
        <!--侧滑的按钮 -->
        <div slot="right-menu">
          <swipeout-button @click.native="deleteFun(gatewayUserId,id)" background-color="#E74C3C" :width="73">{{('删除')}}</swipeout-button>
        </div>
      <!--正文部分-->
      <div slot="content" class="demo-content vux-1px-b">
        <!--分享的网关-->
        <transition name="fade">
          <div v-if="show" class="ShareList">
            <div class="icon-box" v-if="shareType==2"></div>
            <div class="icon-lock" v-if="shareType==3"></div>
            <div class="ShareFont">
              <div class="ShareFontName">{{ shareItem.name }}</div>
              <div class="ShareFontId">ID: {{ shareItem.code }}</div>
            </div>
          </div>
        </transition>

      </div>
      </swipeout-item>
    </swipeout>

  </div>


</template>
<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  import api from "../../api/api"
  let Api = new api();
  export default {
      props:[
        "src" ,
        "userName",
        "shareType",
        "shareInfo",
        "id",
        "gatewayUserId"
      ],
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data () {
      return {
        disabled: false,
        show: false,
        arrowMove1: false,
        arrowMove2: true,
      }
    },
    methods:{
      arrowTogle (){
        this.arrowMove1 = !this.arrowMove1;
        this.arrowMove2 = !this.arrowMove2;
        this.isTrue = !this.isTrue;
      },
      deleteFun(gatewayUserId,id){
          Api.del("gatewayUser/"+gatewayUserId+"/share/"+id)
            .then(data =>{
              if (data.data.status == 0){
                alert("删除成功");
                this.$emit('upup','hehe');
              }else{
                alert(data.data.msg)
              }
            })
      }
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
  .arrowUp{
    transform:rotate(-180deg);
    transition: all 0.2s linear;
  }
  .arrowDown {
    transition: all 0.2s linear;
  }
  div{
    margin:0;
    padding:0;
  }
  .SharePeople{
    position: relative;
    height: toRem(150);
    /*background-color: yellow;*/
  }
  .SharePeople::after{
    transform: scaleY(0.5);
    content: " ";
    position: absolute;
    left: 0;
    bottom: -1px;
    right: 0;
    height: 1px;
    border-top: 1px solid #cccccc;
    color: #cccccc;
  }
  .SharePeople::before{
    transform: scaleY(0.5);
    content: " ";
    position: absolute;
    left: 0;
    top: -1px;
    right: 0;
    height: 1px;
    border-top: 1px solid #CCCCCC;
    color: #CCCCCC;
  }
  .ShareImg{
    float: left;
    height: toRem(90);
    width: toRem(90);
    border-radius: 50%;
    margin-top: toRem(30);
    margin-left: toRem(50);
  }
  .shareName{
    float: left;
    height:toRem(45);
    line-height: toRem(45);
    margin-top:toRem(53);
    margin-left:toRem(39);
    @include font-dpr(16px);
    color: #444444;
  }
  .down{
    position: relative;
    height:toRem(150);
    width:toRem(140);
    float: right;
    text-align: center;
  }
  .icon-down{
    color: #00A6F4;
    position: absolute;
    left:50%;
    margin-left:toRem(-27.5);
    top:50%;
    margin-top:toRem(-27.5);
    @include font-dpr(18px);
  }
  .ShareList{
    position: relative;
    height: toRem(150);
    background-color: #F8F8F8;
  }
  .ShareList::after{
    transform: scaleY(0.5);
    content: " ";
    position: absolute;
    left: 0;
    bottom: -1px;
    right: 0;
    height: 1px;
    border-top: 1px solid #cccccc;
    color: #cccccc;
  }
  .icon-box{
    float: left;
    margin-left: toRem(213);
    margin-top: toRem(40);
    color: #00A6F4;
    @include font-dpr(20px);
  }
  .icon-lock{
    float: left;
    margin-left: toRem(213);
    margin-top: toRem(40);
    color: #00A6F4;
  @include font-dpr(20px);
  }
  .ShareFont{
    position: absolute;
    float: left;
    height:toRem(86);
    top:50%;
    left:toRem(312);
    margin-top: toRem(-43);
  }
  .ShareFontName{
    height: toRem(38);
    line-height: toRem(38);
    @include font-dpr(13.3333333px);
    color: #666666;
  }
  .ShareFontId{
    height: toRem(27);
    line-height: toRem(27);
    margin-top: toRem(21);
    color: #A5A5A5;
    @include font-dpr(10px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
