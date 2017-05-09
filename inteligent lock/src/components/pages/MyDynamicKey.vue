<!-- 动态秘钥组件 -->
<template>
    <div>
      <!-- 锁添加密钥部分 -->
        <div class="addDevice">
            <img src="../../assets/qietu/添加设备.png" class="DeviceIcon">
            <div class="DeviceFont">添加设备</div>
        </div>
        <div class="vux-1px-t">
        <!-- 上拉加载下拉滚动组件内容填充 -->
        <div>
        <!--侧滑组件-->
        <swipeout>
          <!-- 侧滑组件容器  管理员-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="210"
              :sensitivity="15" class="DeviceHeight">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('编辑')"  background-color="#00A6F4" :width="83">
                <span class="icon-edit"></span>
                {{('编辑')}}</swipeout-button>
              <swipeout-button @click.native="onButtonClick('分享')" background-color="#F1C40F" :width="83">
                <span class="icon-share"></span>
                {{('分享')}}</swipeout-button>
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
              <!--管理员-->
              <router-link to="/MyDynamicKey/MyKeyManagement" class="DeviceListIcon2" >
                  <div class="icon-Administrators"></div>
                  <div class="DeviceListIcon2Font">管理员</div>
              </router-link>
              <!--获取秘钥-->
              <div class="DeviceGetKey">
                  获取密钥
              </div>
            </div>
          </swipeout-item>
          <!-- 侧滑组件容器  非管理员-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="210"
            :sensitivity="15" class="DeviceHeight ">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('编辑')"  background-color="#00A6F4" :width="83">
                <span class="icon-edit"></span>
                {{('编辑')}}</swipeout-button>
              <swipeout-button @click.native="onButtonClick('分享')" background-color="#F1C40F" :width="83">
                <span class="icon-share"></span>
                {{('分享')}}</swipeout-button>
              <swipeout-button @click.native="onButtonClick('删除')" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}</swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content DeviceListSize">
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
        </swipeout>
          <MyDynamicKey></MyDynamicKey>
        </div>
      </div>
        <!-- 锁系统列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x  @on-scorll="onScroll" height="500px">
            <!-- 上拉加载下拉滚动组件内容填充 -->
            </scroller>
        </div>
    </div>

</template>
<script>
    import MyDynamicKey from "../public/Pub-MyDynamicKeyLose.vue"
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
            MyDynamicKey
        },
        data () {
            return {
              disabled: false,
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
    div{
      margin:0;
      padding:0;
    }
    .addDevice {
        position: relative;
        width: 100%;
        height: toRem(450);
        background: #29b6f6;
    }
    .DeviceIcon,.DeviceFont {
        position: absolute;
        left:50%;
    }
    .DeviceIcon {
        top:toRem(87);
        margin-left: toRem(-100);
        width: toRem(200);
        height: toRem(200);
    }
    .DeviceFont {
        bottom:toRem(72);
        margin-left: toRem(-120);
        text-align: center;
        width: toRem(240);
        height: toRem(46);
        color:#FFFFFF;
        @include font-dpr(16px);
    }
    .DeviceListSize {
        font-size:12px;
        height: toRem(220);
    }
    .DeviceListColor {
        height:toRem(32);
        line-height: toRem(32);
        @include font-dpr(12px);
        color:#A5A5A5;
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
      color: #00A6F4;
    }
    .DeviceListTitle{
      height:toRem(47);
      line-height: toRem(47);
      @include font-dpr(16px);
    }
    .DeviceListIcon2 {
        position:relative;
        float: left;
        height: toRem(112);
        margin-top:toRem(57);
        text-align: center;
        color: #F39C12;
    }
    .icon-Administrators{
        @include font-dpr(25px);
    }
    .DeviceListIcon2Font{
        height: toRem(28);
        line-height: toRem(28);
        margin-top:toRem(13);
        @include font-dpr(9px);
    }
    .DeviceIcon2 {
        position:absolute;
        left:50%;
        top:50%;
        margin-left: -10%;
        margin-top: -10%;
        width: 20%;
        height: 20%;
        background: red;
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
        color:#FFF;
        text-align: center;
        line-height: toRem(80);
        background: #29b6f6;
    }
    .demo:before {
        content:'';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: red;
    }
    .vux-swipeout-button{
    @include font-dpr(16px);
    }
</style>








