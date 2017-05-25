<!-- 动态秘钥组件 -->
<template>
    <div>
      <!-- 锁添加密钥部分 -->
        <div class="addDevice">
            <img src="../../assets/qietu/添加设备.png" class="DeviceIcon" @click="RichScan">
            <div class="RichScan">扫一扫添加</div>
            <div class="DeviceFont" @click="addKeyFun">手动添加</div>
        </div>
        <!--侧滑组件-->
        <swipeout>
          <!-- 侧滑组件容器 -->
          <swipeout-item
            :disabled="disabled" ref="swipeoutItem"
            :sensitivity="15" class="DeviceHeight"  v-for="item in Lis">
            <!-- 侧滑组件右侧菜单 -->
            <div slot="right-menu">
              <swipeout-button v-model="EditButton" @click.native="EditButtonFun(item.adminId,item.devCode,item.level,item.id)" background-color="#00A6F4" :width="83" v-if="item.effective !=-1">
                <span class="icon-edit"></span>
                {{('编辑')}}</swipeout-button>
              <swipeout-button v-model="TimePicker" @click.native="shareTimeFun(item.id,item.devCode)" background-color="#F1C40F" :width="83" v-if="item.level == 1" >
                <span class="icon-share" ></span>
                {{('分享')}}</swipeout-button>
              <swipeout-button @click.native="onButtonClick(item.level,item.adminId,item.id)" background-color="#E74C3C" :width="83">
                <span class="icon-delete"></span>
                {{('删除')}}</swipeout-button>
            </div>
            <!--正文部分-->
            <div slot="content" class="demo-content vux-1px-b DeviceListSize">
              <!--锁图片-->
              <img src="../../assets/qietu/icon/MyDynamicKeyLight.png" class="lightIcon" v-if="item.effective==1">
              <img src="../../assets/qietu/icon/MyDynamicKeyGray.png" class="grayIcon" v-if="item.effective!=1">
              </img>
              <!--锁id-->
              <div class="DeviceListID">
                <div :class="{'light-DeviceListTitle' :item.effective==1 ,'gray-DeviceListTitle': item.effective!=1}">
                  {{ item.name }}
                </div>
                <div :class="{'light-DeviceListColor':item.effective==1,'gray-DeviceListColor':item.effective!=1}">
                  {{ item.devCode }}
                </div>
              </div>
              <!--管理员-->
              <router-link :to="{ path: '/MyDynamicKey/MyKeyManagement', query: { id:item.id }}" class="DeviceListIcon2":class="{'light-Administrators':item.effective,'gray-Administrators':!item.effective}" v-if="item.level == 1">
                <div class="icon-Administrators"></div>
                <div class="DeviceListIcon2Font">管理员</div>
              </router-link>
              <div v-if="item.effective==-1" class="effectiveFont">已失效</div>
              <div v-if="item.effective==0" class="effectiveFont">未生效</div>
              <!--获取秘钥-->
              <div class="DeviceGetKey" :class="{'light-DeviceGetKey':item.effective==1,'gray-DeviceGetKey':item.effective!=1}" v-model="keysShow" @click="keysFun(item.id,item.effective,item.level,item.adminId)">
                获取密钥
              </div>
            </div>
          </swipeout-item>
        </swipeout>
        <!-- </div> -->
          <!--手动输入id弹出框-->
          <div id="dialog" v-if="addKey">
            <div class="weui-mask"></div>
            <div class="weui-dialog addKeyBox">
              <div class="weui-dialog__hd addCancelTitle">手动添加</div>
              <div class="weui-dialog__bd addBd"><input type="text" class="allInput" placeholder="请输入设备编码" v-model="DevCode"><input type="text" class="allInput" placeholder="请输入系统秘钥名" v-model="LockName"><input type="password" class="allInput" placeholder="请输入系统秘钥" v-model="LockPassword"></div>
              <div class="weui-dialog__ft">
                <a class="weui-dialog__btn weui-dialog__btn_primary" @click="addConfirmFun">确定</a>
                <a class="weui-dialog__btn weui-dialog__btn_default" @click="addCancelFun">取消</a>
              </div>
            </div>
          </div>
          <!--系统秘钥弹出框-->
          <div v-if="keysShow">
            <div class="weui-mask"></div>
            <div class="weui-dialog addKeyBox">
              <div class="weui-dialog__hd addCancelTitle">系统秘钥</div>
              <div class="weui-dialog__bd ">
                <div class="keysShowFont" v-if="keySuccess">{{DynamicSecret}}</div>
                <p class="keysShowWrong warning" v-if="KEYWrong">{{ keyWrong }}</p>
                <p class="keysShowWrong" v-if="frequently">{{ DynamicSecretHS }}</p>
                <p class="keysShowWrong" v-if="frequently">{{ countDown }}</p>
              </div>
              <div class="weui-dialog__ft">
                <a class="weui-dialog__btn weui-dialog__btn_primary" @click="keysShowOnConfirm">确定</a>
              </div>
            </div>
          </div>
          <!--编辑弹出框-->
          <div v-if="EditButton">
            <div class="weui-mask"></div>
            <div class="weui-dialog addKeyBox">
              <div class="weui-dialog__hd addCancelTitle">修改系统锁秘钥</div>
              <div class="weui-dialog__bd addBd"><p class="editDevCode">{{ DevCode }}</p><input type="text" class="allInput" placeholder="请输入系统秘钥名" v-model="LockName"><input type="password" class="allInput" placeholder="请输入系统秘钥" v-model="LockPassword" v-if="PsShow"></div>
              <div class="weui-dialog__ft">
                <a class="weui-dialog__btn weui-dialog__btn_primary" @click="editOnConfirm">确定</a>
                <a class="weui-dialog__btn weui-dialog__btn_default" @click="editCancelFun">取消</a>
              </div>
            </div>
          </div>
          <!--分享时间选择弹出框-->
          <div v-if="TimePicker">
            <div class="weui-mask"></div>
            <div class="weui-dialog addKeyBox">
              <div class="weui-dialog__hd addCancelTitle">请选择有效时长</div>
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
          <!--分享弹出框-->
        <div v-transfer-dom>
            <x-dialog v-model="shareDialogStyle" hide-on-blur :dialog-style="{'max-width': '80%', width: '80%', height: '50%', 'background-color': 'white'}">
              <p style="color:#cccccc;text-align:center;">
                <img v-bind:src=" Src " class="shareImg">
                <p class="shareFont">长按二维码可发送给朋友</p>
              <!--&lt;!&ndash;<div ></div><x-icon type="ios-close-outline" style="fill:#cccccc;" ></x-icon>&ndash;&gt;-->
              </p>
            </x-dialog>
          </div>
          <!--错误弹出框-->
          <toast width="45%" v-model="wrong" type="warn">{{ msg }}</toast>
          <!--成功弹框-->
          <toast width="45%" v-model="success" type="success">{{ successFont }}</toast>
          <!-- 扫描二维码后调弹框 -->
          <div v-if="scanBox">
            <div class="weui-mask"></div>
            <div class="weui-dialog addKeyBox">
              <div class="weui-dialog__hd addCancelTitle">添加系统密钥</div>
              <div class="weui-dialog__bd addBd">
                <input type="text" class="allInput" placeholder="请输入设备编码" v-model="myScanCode">
                <input type="text" class="allInput" placeholder="请输入系统秘钥名" v-model="myScanName">
                <input type="text" class="allInput" placeholder="请输入系统密钥" v-model="myScanPas">
              <div class="weui-dialog__ft">
                <a class="weui-dialog__btn weui-dialog__btn_primary" @click="addOK">确定</a>
                <a class="weui-dialog__btn weui-dialog__btn_default" @click="addCancel">取消</a>
              </div>
            </div>
          </div>
          </div>

          <!--没有网关的提示-->
        <div v-if="Lis == ''" class="hint">
          <img class="hintImg" src="../../assets/qietu/hint.png" alt="">
          <p class="hintFont">暂无智能设备请先添加</p>
        </div>

      </div>
    </div>

</template>
<script>
    import MyDynamicKey from "../public/Pub-MyDynamicKeyLose.vue"
    import { Divider, Spinner, XButton, Group, Cell, LoadMore ,Datetime ,Confirm ,Toast} from 'vux'
    import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
    import { Alert, XSwitch , XDialog, TransferDomDirective as TransferDom } from 'vux'
    import api from "../../api/api"
    import Vue from "vue"
    import { WechatPlugin } from 'vux'
    Vue.use(WechatPlugin)

    let Api = new api();
    export default {
        directives: {
          TransferDom
        },
        components: {
            Divider,
            Spinner,
            XButton,
            Group,
            Cell,
            LoadMore,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
            MyDynamicKey,
            Alert,
            XSwitch,
            XDialog,
            Datetime,
            Confirm,
            Toast
        },
        data () {
            return {
              PsShow : true ,
              successFont:"",
              success:false,
              msg:"",
              wrong:false,
              DynamicSecretHS:"",
              keyWrong:"",
              KEYWrong:"false",//秘钥请求错误提示
              frequently:false,//秘钥请求频繁 系统秘钥请求id以及秒数显示
              keySuccess:false,//秘钥请求成功
              Level:"",//判断是否为管理员
              addKey:false,//手动添加锁
              LockName:"",//设备名称
              LockPassword:"",//秘钥
              EditButton:false,//编辑弹出
              Src:"",//分享二维码图片路径
              ID:"",//设备id
              MyID:"",//自己的id
              DevCode:"",//设备编码
              TimePicker: false,//分享选择日期弹出
              format: 'YYYY-MM-DD HH:mm',//日期格式
              startValue: "" ,//开始时间
              endValue:"永久分享",//结束时间
              shareDialogStyle: false,//分享图片弹出框
              disabled: false,
              keysShow: false,//获取秘钥alert
              Lis:[],//获取系统秘钥列表
              DynamicSecret:"",//获取锁动态密码
              countDown:"",//倒计时显示的提示文字
              timer: "",       //默认倒数30秒
              stop :false,   //默认是停止的，但界面加载之后会变成false
              Interval:null,  //setInterval的对象
              myScanCode:"",
              myScanName:"",
              scanBox:false,
              wrong:false,
              success:false,
              successFont:"",
              myScanPas:""
            }
        },
        methods: {
            //扫一扫添加
            RichScan(){
               var that = this;
                Vue.wechat.scanQRCode({
                      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                      success: function (res) {
                //          // this.scanBox = true;
                         that.myScanCode = res.resultStr;
                         // that.myScanCode = 'A00609290801146D';
                      }
                })
                  this.scanBox = true;
            },
            //手动添加锁
            addKeyFun(){
                this.addKey = true
            },
            //手动添加取消按钮
            addCancelFun (){
                this.addKey = false
            },
            //手动添加确定按钮
            addConfirmFun(){
              let qs = require('qs');
              if (this.DevCode.length <15){
                this.wrong = true;
                this.msg ="请输入正确的设备编码"
              }else if (this.LockPassword.length!=8){
                this.wrong = true;
                this.msg ="请输入8位的锁系统密钥"
              }else{
                this.addKey = false;
                Api.post("systemSecret",qs.stringify({
                  deviceCode:this.DevCode,
                  name:this.LockName,
                  systemSecret:this.LockPassword
                }))
                  .then(data =>{
                    if (data.data.status == 0){
                      this.success = true;
                      this.successFont = "添加成功";
                        //成功后重新获取列表
                      Api.get("systemSecret")
                        .then(data =>{

                          this.Lis = data.data.data.list;

                        })
                        .catch(function (error) {

                        });
                    }
                    else{
                      this.wrong = true;
                      this.msg = data.data.msg
                    }
                  })
              }
            },
            //倒计时
            update () {
              if(this.timer <= 1)
              {
//                this.keysShow = false;
                this.countDown = "请重试";
                this.timer = "";
                clearInterval(this.Interval);
              }
              else{
                this.timer --;
                this.countDown =this.timer+"秒后重试";
              }
            },
            handleEvents (type) {
              console.log('event: ', type)
            },
            //删除按钮
            onButtonClick (level,id,myId) {
                let qs = require('qs');
                this.Level = level;
                this.ID = id;
                this.MyID = myId;
                //管理员
                if (this.Level == 1){
                    Api.del("systemSecret/"+this.ID,qs.stringify({

                    }))
                    .then(data =>{
                    if (data.data.status == 0){
                      this.success = true;
                      this.successFont = "删除成功";
                      Api.get("systemSecret")
                        .then(data =>{
                          this.Lis = data.data.data.list;
                          console.log(this.Lis);
                        })
                      }else{
                      alert(data.data.msg)
                    }
                    })
                }else{
                  console.log("非管理员");
                  Api.del("systemSecret/"+this.ID+"/systemSecretShare/"+this.MyID,qs.stringify({

                  }))
                    .then(data =>{
                      if (data.data.status == 0){
                        this.success = true;
                        this.successFont = "删除成功";
                        Api.get("systemSecret")
                          .then(data =>{
                            this.Lis = data.data.data.list;
                            console.log(this.Lis);
                          })
                      }else{
                        this.wrong = true;
                        this.msg = data.data.msg
                      }
                    })
                }
            },
            handleEvents (type) {
              console.log('event: ', type)
            },
            //获取秘钥alert
            keysFun (ID,effective,level,MyID){
              this.DynamicSecret = "";
              this.countDown = "";
               if(effective !=1){
                 this.keysShow = false;//失效的就不弹出
               }else{
                 let URL;
                 if (level == 1){//管理员
                 URL = "systemSecret/"+ID+"/dynamicSecret"
                 }else{
                     URL = "systemSecret/"+MyID+"/systemSecretShare/"+ID+"/dynamicSecret"
                 }
                 Api.post(URL)
                   .then(data =>{
                     if (data.data.status == 0){
                       console.log("请求成功");
                       this.frequently = false;//系统秘钥请求id以及秒数显示
                       this.KEYWrong = false;//密钥错误提示
                       this.keySuccess = true;
                       this.keysShow = true;
                       this.DynamicSecret = "";
                       this.countDown = "";
                       this.DynamicSecret = data.data.data.dynamicSecret;
                     }else if(data.data.status == 3096){
                       //如果是false就开始倒计时，如果是true就停止倒计时
                       if(this.stop == false) {
                         clearInterval(this.Interval);
                         this.Interval = setInterval(this.update,1000);
                       }
                       else {
                         clearInterval(this.Interval);
                       }
                       this.KEYWrong = true;
                       this.keyWrong = data.data.msg;
                       if (data.data.data.ttl){//请求频繁
                         this.keySuccess = false;
                         this.frequently = true;
                         this.keysShow = true;
                         this.timer = data.data.data.ttl;
                         this.DynamicSecretHS = "历史秘钥 : "+data.data.data.dynamicSecret;
                       }else{

                       }
                     }else{
                       this.wrong = true;
                       this.msg = data.data.msg
                     }
                   })
                   .catch(data =>{

                   });
               }


               },
            //获取秘钥确定
            keysShowOnConfirm(){
                  this.keysShow = false
            },
            //编辑弹出
            EditButtonFun(ID,DevCode,level,MyID){
                this.Level = level;
                this.EditButton = true;
                this.DevCode = DevCode;
                this.ID = ID;
                this.MyID = MyID;
              if (level == 1){
                    this.PsShow = true
              }else{
                  this.PsShow = false
              }
            },
            //编辑取消
            editCancelFun(){
                this.EditButton = false;
            },
            //编辑确定
            editOnConfirm(){
              let qs = require('qs');
//              如果是管理员
              if (this.Level == 1){
                  //管理员
                if (this.LockPassword.length!=8 && this.LockPassword.length!=0){
                  this.wrong = true;
                this.msg ="请输入8位的锁系统密钥"
                }else{
                  Api.put("systemSecret/"+this.ID,qs.stringify({
                    name : this.LockName,
                    systemSecret : this.LockPassword
                  }))
                    .then(data =>{
                      if (data.data.status == 0){
                        this.EditButton = false;
                        this.success = true;
                        this.successFont = "编辑成功";
                        Api.get("systemSecret")
                          .then(data =>{
                            this.Lis = data.data.data.list;
                            console.log(this.Lis);
                          })
                      }else{
                        this.wrong = true;
                        this.msg = data.data.msg
                      }
                    })
                }
              }else{//不是管理员
                  Api.put("systemSecret/"+this.ID+"/systemSecretShare/"+this.MyID,qs.stringify({
                  name : this.LockName,
                }))
                  .then(data =>{
                    if (data.data.status == 0){
                      this.success = true;
                      this.successFont = "编辑成功";
                      this.EditButton = false;
                      Api.get("systemSecret")
                        .then(data =>{
                          this.Lis = data.data.data.list;
                          console.log(this.Lis);
                        })
                    }else{

                    }
                  })
              }

            },
            //分享有效时长弹出
            shareTimeFun(ID,DevCode){
              this.TimePicker = true;
              this.ID = ID;
              this.DevCode = DevCode;
            },
            //  取消
            onCancel () {
              this.TimePicker = false;
              console.log('取消')
            },
            //确定 --s生成二维码
            onConfirm () {
              this.TimePicker = false;
              let timeStr,_date, startTM, endTM;
              function getTs(time){
                var arr = time.split(/[- :]/),
                  _date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]),
                  timeStr = Date.parse(_date);
                return timeStr
              }
              if (this.startValue ==""){
                startTM = getTs("2017-01-01 00:00");
              }else{
                startTM = getTs(this.startValue);
              }
              endTM = getTs(this.endValue);
              let continueDate;
              if (this.endValue == "永久分享"){
                continueDate = -1
              }else {
                continueDate = endTM - startTM;
              }
              console.log(continueDate);
              let qs = require('qs');
              Api.post("systemSecret/"+this.ID+"/share",qs.stringify({
                devCode:this.DevCode,
                duration:continueDate,
                startTime:startTM
              }))
                .then(data =>{
                  if (data.data.status == 0){
                    this.$data.shareDialogStyle = true;
                    this.$data.Src = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + data.data.data.ticket;
                  }else{
                    this.wrong = true;
                    this.msg = data.data.msg
                  }
//                  this.Lis = data.data.data.list;
//                  console.log(this.Lis);
                })
                .catch(function (error) {
                  console.log(error);
                });

            },
            //选择分享开始时间
            startTimeValue (value) {
              let  ddate = new Date(value).getTime();
              console.log('开始时间', value,ddate)
            },
            //选择分享结束时间
            endTimeValue (value){
              this.$data.endValue = value;
              console.log('结束时间', value,this.endValue)
            },
            //永久分享
            setForEver (val){
              this.$data.endValue = "永久分享";
            },
            //分享二维码alert
            shareFun(){
                   this.shareDialogStyle = true
              },
            addOK(){
             var qs = require('qs');
             Api.post("systemSecret",qs.stringify({
                  deviceCode:this.myScanCode,
                  name: this.myScanName,
                  systemSecret:this.myScanPas
                    // deviceCode:"A00609290801146D",
                    // name:"dsfadf",
                    // systemSecret:"12345678"
                 }))
                 .then(data => {
                    this.scanBox = false;
                    if(data.data.status == 0){
                       this.success = true;
                       this.successFont = "添加系统密钥成功!";
                        //成功后重新获取列表
                        Api.get("systemSecret")
                          .then(data =>{
                            console.log(data)
                            this.Lis = data.data.data.list;
                          })
                          .catch(function (error) {
                            console.log(error)
                          });
                    }
                    else {
                       this.wrong = true;
                       this.msg = data.data.msg;
                    }
                 })
                 .catch(err => {
                   console.log(err)
                 })
            },
            addCancel(){
              this.scanBox = false;
              this.deviceCode = "";
              this.deviceName = "";
            }
        },
        mounted(){
          //    获取动态密钥列表
          Api.get("systemSecret")
            .then(data =>{
                this.Lis = data.data.data.list;
                console.log(this.Lis);
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
    .weui-dialog{
      padding:0;
      margin:0;
    }
    .addKeyBox{
      background-color: #F8F8F8;
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
    .keysShowFont{
      height:toRem(300);
      line-height: toRem(300);
      color: #00A6F4;
    @include font-dpr(18px);
    }
    .keysShowWrong{
      height:toRem(100);
      line-height: toRem(100);
    }
    .warning{
    @include font-dpr(16px);
      font-weight: 600;
      color: black;
      /*text-shadow: black 1px 1px 1px;*/
    }
    .editDevCode{
      display: inline-block;
      width:toRem(762);
      height:toRem(48);
      margin-bottom:toRem(48);
      line-height: toRem(48);
    }
    .addBd{
      margin-top:toRem(48);
      margin-bottom: toRem(16);
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
    .weui-dialog__btn_default{
      color: #666666;
    @include font-dpr(16px);
    }
    .weui-dialog__btn_primary{
      color: #00A6F4;
    @include font-dpr(16px);
    }
    .shareChoose{
      margin-left:toRem(70);
      margin-right: toRem(70);
      margin-bottom:toRem(48);
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
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
    .DeviceListSize {
        font-size:12px;
        height: toRem(220);
    }
    .light-DeviceListColor {
        height:toRem(32);
        line-height: toRem(32);
        @include font-dpr(12px);
        color:#A5A5A5;
        margin-top:toRem(34);
    }
    .gray-DeviceListColor {
      height:toRem(32);
      line-height: toRem(32);
      @include font-dpr(12px);
      color:#CCCCCC;
      margin-top:toRem(34);
    }
    .lightIcon{
      float: left;
      margin-top:toRem(56);
      margin-left: toRem(41);
      width: toRem(112);
      height: toRem(108);
    }
    .grayIcon {
        float: left;
        margin-top:toRem(56);
        margin-left: toRem(41);
        width: toRem(112);
        height: toRem(108);
    }
    .light-DeviceListTitle{
      height:toRem(47);
      line-height: toRem(47);
      @include font-dpr(16px);
    }
    .gray-DeviceListTitle{
      height:toRem(47);
      line-height: toRem(47);
      color: #CCCCCC;
    @include font-dpr(16px);
    }
    .DeviceListIcon2 {
        position:relative;
        float: left;
        height: toRem(112);
        margin-top:toRem(57);
        text-align: center;
    }
    .effectiveFont{
      color: #CCCCCC;
      float: left;
    @include font-dpr(10px);
      margin-top:toRem(95);
      height:toRem(30);
      line-height:toRem(30);
    }
    .light-Administrators{
      color: #F39C12;
    }
    .gray-Administrators{
      color: #CCCCCC;
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
      overflow: hidden;
    }
    .DeviceGetKey {
        position: absolute;
        margin-top: toRem(70);
        right: toRem(50);
        width: toRem(180);
        height: toRem(80);
        border-radius:8px;
        color:#FFF;
        text-align: center;
        line-height: toRem(80);
    }
    .shareImg{
      width:toRem(650);
      height:toRem(650);
      margin-top:toRem(86);
    }
    .shareFont{
    @include font-dpr(18px);
      margin-bottom: toRem(88);
    }
    .editBox{
      background-color: red;
      color: red;
    }

    .editTitle{
      color: #00A6F4;
    @include font-dpr(16px);
    }
    .LockInput{
      margin-top: toRem(32);
      width:toRem(672);
      height:toRem(120);
      border:1px solid #CCCCCC;
      padding-left:toRem(40);
    @include font-dpr(16px);
      background-color: #F8F8F8;
    }
    .light-DeviceGetKey{
      background: #00A6F4;
    }
    .gray-DeviceGetKey{
      background: #CCCCCC;
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
    .hint {
    text-align: center;
    margin-top: toRem(383);
  }
  .hintImg{
    width:toRem(200);
    height:toRem(200);
    margin-bottom: toRem(60);
  }
  .hintFont{
    color: #cccccc;
  @include font-dpr(16px);
  }
</style>








