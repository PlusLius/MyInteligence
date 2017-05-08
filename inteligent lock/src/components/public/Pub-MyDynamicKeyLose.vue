<!-- 动态密码组件 失效组件-->
<template>
  <div>
          <!-- 侧滑组件容器  失效-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="83"
            :sensitivity="15" class="DeviceHeight">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('删除')" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}</swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content vux-1px-b DeviceListSize">
              <!--锁图片-->
              <div class="DeviceListIcon1 icon-lock">
              </div>
              <!--锁id-->
              <div class="DeviceListID">
                <div class="DeviceListTitle">
                  {{'智能锁'}}
                </div>
                <div class="DeviceListColor">
                  {{'ID: 12454864571263'}}
                </div>
              </div>
              <!--获取秘钥-->
              <div class="DeviceGetKey">
                获取密钥
              </div>
            </div>
          </swipeout-item>
  </div>
</template>
<script>
  import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
  import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'

  export default {
    components: {
      Scroller,
      Divider,
      Spinner,
      XButton,
      Group,
      Cell,
      LoadMore,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
    },
    data () {
      return {
        disabled: false
      }
    },
    methods: {
      onScroll(){
        this.disabled = true

      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      onButtonClick (type) {
        alert( type + '按钮 ')
      },
      handleEvents (type) {
        console.log('event: ', type)
      }
    },
    data () {
      return {
        disabled: false
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
  div{
    margin:0;
    padding:0;
  }
  .DeviceHeight{
    position: relative;
  }
  .DeviceHeight::after{
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
  .DeviceListSize {
    font-size:12px;
    height: toRem(220);
  }
  .DeviceListColor {
    height:toRem(32);
    line-height: toRem(32);
  @include font-dpr(12px);
    color:#cccccc;
    margin-top:toRem(34);
  }
  .DeviceListIcon1 {
    float: left;
    margin-top:toRem(60);
    margin-left: toRem(50);
    width: toRem(80);
    height: toRem(95);
  }
  .icon-lock:before{
  @include font-dpr(34px);
    color: #CCCCCC;
  }
  .DeviceListTitle{
    color: #CCCCCC;
    height:toRem(47);
    line-height: toRem(47);
  @include font-dpr(16px);
  }
  .DeviceListID {
    float: left;
    width: toRem(510);
    height:toRem(113);
    margin-left:toRem(58);
    margin-top:toRem(54);
  }
  .DeviceGetKey {
    position: absolute;
    margin-top: toRem(70);
    left: toRem(850);
    width: toRem(180);
    height: toRem(80);
    border-radius:8px;
    color:#FFFFFF;
    text-align: center;
    line-height: toRem(80);
    background: #CCCCCC;
  }
  .vux-swipeout-button{
  @include font-dpr(16px);
  }
</style>

