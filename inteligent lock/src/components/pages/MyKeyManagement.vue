<!-- 动态密钥管理员组件 -->
<template>
  <div>
    <div class="vux-1px-t">
      <!-- 上拉加载下拉滚动组件内容填充 -->
      <div v-if="Lis.length == 0" class="NoGateWayAllBox">
          <div class="NoGateWayBox">
              <div class="NoGateWayImg">
                <img src="../../assets/qietu/hint.png">
                <p class="NoGateWayFont">暂无系统密钥分享</p>
              </div>
          </div>
      </div>
      <div>
        <!--侧滑组件-->
        <swipeout>
          <!-- 侧滑组件容器  永久分享-->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :right-menu-width="166"
            :sensitivity="15" class="DeviceHeight" v-for="item in Lis">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu" class="DeviceRight">
              <swipeout-button @click.native="onButtonClick(item.adminId,item.id)" background-color="#00A6F4" :width="83">
                <span class="icon-edit"></span>
                {{('管理')}}
              </swipeout-button>
              <swipeout-button @click.native="deleteFun(item.adminId,item.id)" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}
              </swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content vux-1px-b DeviceListSize">
                  <!--头像-->
                  <img v-bind:src="item.headUrl" class="userAvatar">

                  <div class="DeviceContent">
                    <div class="DeviceContentName">{{ item.wechatName }}</div>
                    <div :class="{
                          'DeviceContentPermanent':item.level==2,
                          'DeviceContentTemporary':item.level==3,
                          'DeviceContentEfficacy':item.effective==-1}">{{ item.levelInfo}}</div>
                  </div>
                  <div v-if="item.effective==0" class="ineffective">未生效</div>
                  <div v-if="item.effective==-1" class="shixiao">已失效</div>
                    <!--开始结束时间-->
                  <div class="timeClass">
                    <div class="startTime" v-if="item.level!=2">开始时间:{{ item.startTime }}</div>
                    <div class="endTime" v-if="item.level!=2">结束时间:{{ item.endTime }}</div>
                  </div>

            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </div>

    <!--分享时间选择弹出框-->
    <div v-if="TimePicker">
      <div class="weui-mask"></div>
      <div class="weui-dialog addKeyBox">
        <div class="weui-dialog__hd addCancelTitle">编辑分享有效时长</div>
        <div class="weui-dialog__bd addBd">
          <div class="shareChoose">
            <group :title="('')">
              <datetime v-model="startValue"  :placeholder="('')" :min-year=2017 :max-year=2100 format="YYYY-MM-DD HH:mm" @on-change="startTimeValue" :title="('开始日期')" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消" style="padding-left: 0;padding-right: 0;"></datetime>
            </group>

            <group :title="('')">
              <datetime v-model="endValue" :placeholder="('永久分享')" :min-year=2017 :max-year=2100 format="YYYY-MM-DD HH:mm" @on-change="endTimeValue" :title="('结束日期')" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消" clear-text="永久分享" @on-clear="setForEver" style="padding-left: 0;padding-right: 0;"></datetime>
            </group>
          </div>
        </div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_primary" @click="onConfirm">确定</a>
          <a class="weui-dialog__btn weui-dialog__btn_default" @click="onCancel">取消</a>
        </div>
      </div>
    </div>
    <!--错误弹出-->
    <toast width="35%" v-model="wrong" type="warn">{{ msg }}</toast>
    <!--成功弹出-->
    <toast width="35%" v-model="success" type="success">{{ successFont }}</toast>
  </div>
</template>
<script>
  import {Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore,Toast} from 'vux'
  import {Swipeout, SwipeoutItem, SwipeoutButton,Datetime,TransferDomDirective as TransferDom } from 'vux'
  import api from "../../api/api"
  let Api = new api();
  export default {
    directives: {
      TransferDom
    },
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
      Datetime,
      Toast
    },
    data () {
      return {
        disabled: false,
        Lis : "",//获取列表
        TimePicker:false,
        format: 'YYYY-MM-DD HH:mm',//日期格式
        startValue:"",
        endValue:"永久分享",
        adminId:"",
        ID:"",
        msg:"",
        wrong:false,
        successFont:"",
        success:false
      }
    },
    methods: {
      onScroll(){
        this.disabled = true
      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      //管理点击
      onButtonClick (adminId, id) {
        this.TimePicker = true;
        this.adminId = adminId;
        this.ID = id;
      },
      //开始时间
      startTimeValue(value){
        this.startValue = value;
      },
      //结束时间
      endTimeValue(value){
        this.endValue = value;
      },
      //编辑取消
      onCancel () {
        this.TimePicker = false;
        console.log('取消')
      },
      //编辑确定
      onConfirm (){
        console.log('确定');
        this.TimePicker = false;
        let timeStr, _date, startTM, endTM, continueDate;
        let qs = require('qs');

        function getTs(time) {//转时间戳函数
          var arr = time.split(/[- :]/),
            _date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]),
            timeStr = Date.parse(_date);
          return timeStr
        }

        if (this.startValue == "") {
          startTM = ""
        } else {
          startTM = getTs(this.startValue);
        }
        endTM = getTs(this.endValue);
        if (this.endValue == "永久分享") {
          continueDate = -1
        } else {
          continueDate = endTM - startTM;
        }
        console.log(continueDate);
        Api.put("systemSecret/" + this.adminId + "/systemSecretShare/" + this.ID, qs.stringify({
          duration: continueDate,
          startTime: startTM
        }))
          .then(data => {
            if (data.data.status == 0) {
              this.TimePicker = false;
              this.success = true;
              this.successFont = "修改成功";
              Api.get("systemSecret/" + this.$route.query.id + "/systemSecretShare")
                .then(data => {
                  this.Lis = data.data.data.list;
                })
            } else {
              this.wrong = true;
              this.msg = data.data.msg
            }
          })
      },
      //永久分享
      setForEver (val){
        this.$data.endValue = "永久分享";
      },
      //删除
      deleteFun(adminID, ID){
        Api.del("systemSecret/" + adminID + "/systemSecretShare/" + ID)
          .then(data => {
            if (data.data.status == 0) {
              this.success = true;
              this.successFont = "删除成功";
              Api.get("systemSecret/"+this.$route.query.id+"/systemSecretShare")
                .then(data => {
                  this.Lis = data.data.data.list;
                })
            } else {
              this.wrong = true;
              this.msg = data.data.msg
            }
          })
      },
    },
    mounted(){

    },
    created () {
//      alert('deviceid: ' + this.$route.query.id);
      Api.get("systemSecret/"+this.$route.query.id+"/systemSecretShare")
        .then(data =>{
          this.Lis = data.data.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
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
  .DeviceContentPermanent{
    height:toRem(35);
    line-height: toRem(35);
    margin-top:toRem(27);
    color: #00A6F4;
    @include font-dpr(12px);
    float: left;
  }
  .DeviceContentTemporary{
    height:toRem(35);
    line-height: toRem(35);
    margin-top:toRem(27);
    color: #F39C12;
  @include font-dpr(12px);
    float: left;
  }
  .DeviceContentEfficacy{
    height:toRem(35);
    line-height: toRem(35);
    margin-top:toRem(27);
    color: #CCCCCC;
    @include font-dpr(12px);
    float: left;
  }

  .DeviceListSize{
    height: toRem(200);
    position: relative;
  }
  .vux-swipeout-button{
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
  .weui-dialog__hd{
    margin:0;
    padding:0;
  }
  .weui-dialog__btn_default{
    color: #666666;
  @include font-dpr(16px);
  }
  .weui-dialog__btn_primary{
    color: #00A6F4;
  @include font-dpr(16px);
  }
  .ineffective{
    width: toRem(110);
    height: toRem(40);
    line-height:toRem(40);
    text-align: center;
    position: absolute;
    left:toRem(376);
    top:toRem(118);
    background-color: #F39C12;
    color: #FFFFFF;
  @include font-dpr(9.333333px);
  }
  .shixiao{
    width: toRem(110);
    height: toRem(40);
    line-height:toRem(40);
    text-align: center;
    position: absolute;
    left:toRem(376);
    top:toRem(118);
    background-color: #CCCCCC;
    color: #FFFFFF;
  @include font-dpr(9.333333px);
  }
  .timeClass{
    position: absolute;
    height:toRem(100);
    left:toRem(628);
    top:toRem(49);
  @include font-dpr(12px);
    color: #666666;
  }
  .startTime{
    line-height:toRem(36);
  }
  .endTime{
    margin-top: toRem(27);
    line-height:toRem(36);
  }
   .NoGateWayAllBox {
    width: 100%;
    height: toRem(1557);
    display:flex;
    justify-content:center;
    align-content:center;
  }
  .NoGateWayBox {
    width: 100%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .NoGateWayImg {
    min-height:toRem(320);
    text-align: center;
  }
  .NoGateWayImg img {
    align-items:center;
    width: toRem(201);
    height: toRem(201);
  }
  .NoGateWayFont {
    margin-top: toRem(30);
   @include font-dpr(15px);
   color:#ccc;
  }
</style>








