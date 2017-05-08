<!-- 动态密码管理员组件 -->
<template>
  <div>
    <div class="vux-1px-t">
      <!-- 上拉加载下拉滚动组件内容填充 -->
      <div>
        <!--侧滑组件-->
        <swipeout>
          <!-- 侧滑组件容器  永久分享-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="166"
            :sensitivity="15" class="DeviceHeight" v-for="i in 3">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu" class="DeviceRight">
              <swipeout-button @click.native="onButtonClick('管理')" background-color="#00A6F4" :width="83">
                <span class="icon-edit"></span>
                {{('管理')}}
              </swipeout-button>
              <swipeout-button @click.native="onButtonClick('删除')" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}
              </swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content vux-1px-b DeviceListSize">
                  <!--头像-->
                  <img src="../../assets/11.png" alt="" class="userAvatar">
                  <div class="DeviceContent">
                        <div class="DeviceContentName">王耨耨</div>
                        <div class="DeviceContentStatus1">永久分享</div>
                  </div>
            </div>
          </swipeout-item>

          <!-- 侧滑组件容器 临时分享-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="166"
            :sensitivity="15" class="DeviceHeight">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu" class="DeviceRight">
              <swipeout-button @click.native="onButtonClick('delete')" background-color="#00A6F4" :width="83">
                <span class="icon-edit"></span>
                {{('管理')}}
              </swipeout-button>
              <swipeout-button @click.native="onButtonClick('ignore')" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}
              </swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content vux-1px-b DeviceListSize">
              <!--头像-->
              <img src="../../assets/guliguli.png" alt="" class="userAvatar">
              <div class="DeviceContent">
                <div class="DeviceContentName">咕力咕力</div>
                <div class="DeviceContentStatus2">临时分享</div>
              </div>
            </div>
          </swipeout-item>

          <!-- 侧滑组件容器 已失效分享-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="166"
            :sensitivity="15" class="DeviceHeight">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu" class="DeviceRight">
              <swipeout-button @click.native="onButtonClick('delete')" background-color="#00A6F4" :width="83" >
                <span class="icon-edit"></span>
                {{('管理')}}
              </swipeout-button>
              <swipeout-button @click.native="onButtonClick('ignore')" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}
              </swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content vux-1px-b DeviceListSize">
              <!--头像-->
              <img src="../../assets/xiaoyueyue.png" alt="" class="userAvatar">
              <div class="DeviceContent">
                <div class="DeviceContentName3">小岳岳</div>
                <div class="DeviceContentStatus3">已失效</div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </div>
  </div>
</template>
<script>
  import {Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore} from 'vux'
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'

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
        alert(type +'按钮 ' )
      },
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
  /*用户头像*/
  .userAvatar{
    float: left;
    margin-left:toRem(45);
    margin-top:toRem(40);
    width:toRem(120);
    height:toRem(120);
    border-radius:50%;
  }
  .DeviceContent{
    float: left;
    margin-left: toRem(52);
    margin-top:toRem(49);
    height:toRem(108);
  }
  /*分享用户名字*/
  .DeviceContentName{
    height:toRem(45);
    line-height: toRem(45);
    color: #444444;
    @include font-dpr(16px);
  }
  .DeviceContentName3{
    height:toRem(45);
    line-height: toRem(45);
    color: #CCCCCC;
    @include font-dpr(16px);
  }
  /*分享状态字体*/
  .DeviceContentStatus1{
    height:toRem(35);
    line-height: toRem(35);
    margin-top:toRem(27);
    color: #00A6F4;
    @include font-dpr(12px);
  }
  .DeviceContentStatus2{
    height:toRem(35);
    line-height: toRem(35);
    margin-top:toRem(27);
    color: #F39C12;
    @include font-dpr(12px);
  }
  .DeviceContentStatus3{
    height:toRem(35);
    line-height: toRem(35);
    margin-top:toRem(27);
    color: #CCCCCC;
    @include font-dpr(12px);
  }

  .DeviceListSize{
    height: toRem(200);
  }
  .vux-swipeout-button{
  @include font-dpr(16px);
  }
</style>








