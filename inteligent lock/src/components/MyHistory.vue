<!-- 历史记录组件 -->
<template>
    <div>
            <!-- 侧滑组件 -->
                <scroller
                  :on-refresh="refresh"
                  :on-infinite="infinite"
                   refresh-layer-color="#4b8bf4"
                   loading-layer-color="#4b8bf4"
                >
                <!-- 日期选择 -->
                  <div>
                        <datetime :min-year=2000 format="YYYY-MM-DD HH:mm" @on-change="change" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消" :title="''" class="selectDateBox" v-model="dateValue">
                          <ul class="selectDate" v-model="defaultDate">
                             <li>{{ dateFont[0] || this.defaultDateFont.year}} <span>年</span></li>
                             <li>{{ dateFont[1] || this.defaultDateFont.mounth}} <span>月</span></li>
                             <li>{{ dateFont[2] || this.defaultDateFont.day}} <span>日</span></li>
                             <li>{{ dateFont[3] || this.defaultDateFont.hour}} <span>时</span></li>
                             <li>{{ dateFont[4] || this.defaultDateFont.minutes}} <span>分</span></li>
                          </ul>
                        </datetime>
                  </div>

                   <swipeout>
                    <transition-group name="fade">
                    <!-- 侧滑组件容器 -->
                      <swipeout-item
                       v-for="(item,index) in list"
                      :disabled="disabled"
                      transition-mode="follow"
                      :right-menu-width="83"
                      :key="item"
                      >
                      <!-- 侧滑组件右侧菜单 -->
                        <div slot="right-menu">
                          <swipeout-button
                          background-color="#e84e40"
                          :width="83"
                          @click.native="onButtonClick('delLock',index,item.id)"
                          >{{'删除'}}
                          </swipeout-button>
                        </div>

                        <!-- 侧滑组件正文显示部分 -->
                        <div slot="content" class="DeviceListSize">
                            <!-- <div class="DeviceListIcon1"> -->
                                <img :src="lockImg(item.unlockWay)" class="DeviceListImg1">
                            <!-- </div> -->
                            <div class="DeviceListID">
                                <div class="DeviceOpenLock">
                                    {{item.unlockWayName}}
                                </div>
                                <div class="DeviceListColor">
                                   开锁人: {{item.userName}}
                                </div>
                            </div>
                            <div class="DeviceListGetKey">
                                <div class="DeviceListDate">
                                    {{item.unlockTime.split(" ")[0]}}
                                </div>
                                <div class="DeviceListTime">
                                    {{item.unlockTime.split(" ")[1]}}
                                </div>
                            </div>
                        </div>

                      </swipeout-item>
                      </transition-group>
                    </swipeout>
                 </scroller>
    </div>
</template>
<script>
    // import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
    import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
    import Vue from "vue"
    import API from "../api/api"
    import { dateFormat,Datetime } from 'vux'
    var api = new API ()

    export default {
        components: {
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
            Datetime,
        },
        watch: {
          dateValue(){
                var year = this.dateValue.split(" ")[0].split("-");
                var Hour = this.dateValue.split(" ")[1].split(":");
                var arr = year.concat(Hour);
                for(var k in arr){
                  this.dateFont[k] = arr[k];
                }
                return this.dateFont;
          },
          defaultDate(){
              var oDate = new Date(); //实例一个时间对象；
              this.defaultDateFont.year = oDate.getFullYear();   //获取系统的年；
              this.defaultDateFont.mounth = oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
              this.defaultDateFont.day = oDate.getDate(); // 获取系统日，
              this.defaultDateFont.hour =  oDate.getHours(); //获取系统时，
              this.defaultDateFont.minutes =  oDate.getMinutes(); //分

              return this.defaultDateFont
          }
        },
        data () {
            return {
              disabled: false,
              list:[],
              nowDate:"",
              oldData:"",
              num:1,
              selcNum:2,
              flagRefresh:true,
              flagInfinite:true,
              dataIndex:0,
              dateValue:'',
              dateFont:{},
              selectNowDate:'',
              selectDataIndex:0,
              selectMsg:'',
              oldSelectData:"",
              defaultDate:"",
              defaultDateFont:{}
            }
        },
        methods: {
            change (value) {

                // this.changeOk = false;
                this.selectNowDate = value;
                this.selectMsg = value;
                // if(this.flagInfinite){
                //   this.flagInfinite = false;
                //   var timer = null;
                // timer = setTimeout(() => {
                      // if(this.num == 1){
                        api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                           unlockTime: value + ":00"
                        })
                        .then(res => {
                              this.list = ''
                              this.list = res.data.data.content;
                              sessionStorage.setItem("SelectHistoryDate", res.data.data.content[0]["unlockTime"]);
                              this.list = res.data.data.content;
                        })
                        .catch(err => {
                          console.log(err)
                          // clearTimeout(timer)
                        })
                      // }
                      // else {
                      //   api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                      //      unlockTime:sessionStorage.getItem("historyDate"),
                      //      pageNum:this.num
                      //   })
                      //   .then(res => {
                      //       for (var k in res.data.data.content){
                      //         this.list.push( res.data.data.content[k])
                      //       }
                      //       if(res.data.data.content.length > 0){
                      //           this.num++
                      //       }
                      //       this.flagInfinite = true;
                      //       clearTimeout(timer)
                      //       done(true)
                      //   })
                      //   .catch(err => {
                      //     clearTimeout(timer)
                      //     done(true)
                      //   })
                      // }
                // }, 500)
              // }

            },
            onScroll(){
                this.disabled = true
            },
            handleEvents (type) {
              console.log('event: ', type)
            },
            lockImg(name){
              switch(name){
                case 1:
                return require("../assets/qietu/icon/zhiwen@3x.png")
                break;
                case 2:
                return require("../assets/qietu/icon/password@3x.png")
                break;
                case 3:
                return require("../assets/qietu/icon/ICCard@3x.png")
                break;
                case 4:
                return require("../assets/qietu/icon/fingerprintAndPassWord@3x.png")
                break;
                case 5:
                return require("../assets/qietu/icon/fingerprintAndICard@3x.png")
                break;
                case 6:
                return require("../assets/qietu/icon/pasAndICCard@3x.png")
                break;
                case 7:
                return require("../assets/qietu/icon/fingerprintAndPasAndIC@3x.png")
                break;
                case 8:
                return require("../assets/qietu/icon/dynamicOpen@3x.png")
                break;
                case 9:
                return require("../assets/qietu/icon/fingerprintAndFingerCard@3x.png")
                break;
                case 10:
                return require("../assets/qietu/icon/keyOpenLock@3x.png")
                break;
                case 11:
                return require("../assets/qietu/icon/violentUnlock@3x.png")
                break;
                case 12:
                return require("../assets/qietu/icon/lllegalUserUnlock@3x.png")
                break;
                case 13:
                return require("../assets/qietu/icon/stressUnlock@3x.png")
                break;
                case 20:
                return require("../assets/qietu/icon/remoteOpen@3x.png")
                break;
              }
            },
            refresh(done) {
                if(this.selectMsg == ''){
                    if(this.dataIndex == 0){
                     this.oldData = sessionStorage.getItem("historyDate")
                    }
                    var timer = null;
                     timer = setTimeout(() => {
                      api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                          unlockTime: this.oldData,
                          direction: true
                      })
                      .then(res => {
                        this.dataIndex = 1;
                        if(res.data.data.content.length > 0){
                          this.oldData = res.data.data.content[0]["unlockTime"]
                          for(var k in res.data.data.content){
                              // this.$nextTick(()=>{
                                this.list.unshift(res.data.data.content[k])
                              // })
                          }
                        }
                         this.flagRefresh = true
                         clearTimeout(timer)
                         done()
                      })
                      .catch(err => {
                        clearTimeout(timer)
                         done()
                        console.log(err)
                      })

                    }, 500)
                }
                if(this.selectMsg.length > 0){
                   if(this.selectDataIndex == 0){
                     this.oldSelectData = sessionStorage.getItem("SelectHistoryDate")
                    }
                    var timer = null;
                     timer = setTimeout(() => {
                      api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                          unlockTime: this.oldSelectData,
                          direction: true
                      })
                      .then(res => {
                        this.selectDataIndex = 1;
                        if(res.data.data.content.length > 0){
                          this.oldSelectData = res.data.data.content[0]["unlockTime"]
                          for(var k in res.data.data.content){
                              // this.$nextTick(()=>{
                                this.list.unshift(res.data.data.content[k])
                              // })
                          }
                        }
                         // this.flagRefresh = true
                         clearTimeout(timer)
                         done()
                      })
                      .catch(err => {
                        clearTimeout(timer)
                         done()
                        console.log(err)
                      })

                    }, 500)
                }


            },
            infinite(done) {

              if(this.flagInfinite && this.selectNowDate == ''){
                this.flagInfinite = false;
                this.nowDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
                var timer = null;
                timer = setTimeout(() => {
                      if(this.num == 1){
                        api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                           // unlockTime: this.nowDate
                        })
                        .then(res => {
                              sessionStorage.setItem("historyDate", res.data.data.content[0]["unlockTime"])
                              this.list = res.data.data.content
                              this.flagInfinite = true;
                              done(true)
                              if(res.data.data.content.length > 0){
                                  this.num++
                              }
                              clearTimeout(timer)
                              console.log(res)
                        })
                        .catch(err => {
                          console.log(err)
                          clearTimeout(timer)
                        })
                      }
                      else {
                        api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                           unlockTime:sessionStorage.getItem("historyDate"),
                           pageNum:this.num
                        })
                        .then(res => {
                            for (var k in res.data.data.content){
                              this.list.push( res.data.data.content[k])
                            }
                            if(res.data.data.content.length > 0){
                                this.num++
                            }
                            this.flagInfinite = true;
                            clearTimeout(timer)
                            done(true)
                        })
                        .catch(err => {
                          clearTimeout(timer)
                          done(true)
                        })
                      }
                }, 500)
              }
              if(this.selectNowDate.length > 0){
                 var timer = null;
                timer = setTimeout(() => {
                      // if(this.selcNum == 1){
                      //   alert(this.selectNowDate)
                      //   api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                      //      unlockTime: this.selectNowDate
                      //   })
                      //   .then(res => {

                      //         // this.list = '';
                      //         sessionStorage.setItem("historyDate", res.data.data.content[0]["unlockTime"])
                      //         this.list = res.data.data.content
                      //         // this.flagInfinite = true;
                      //         done(true)
                      //         if(res.data.data.content.length > 0){
                      //             this.selcNum++
                      //         }
                      //         clearTimeout(timer)
                      //         console.log(res)
                      //   })
                      //   .catch(err => {
                      //     console.log(err)
                      //     clearTimeout(timer)
                      //   })
                      // }
                      // else {
                        api.get("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord",{
                           unlockTime:sessionStorage.getItem("SelectHistoryDate"),
                           pageNum:this.selcNum
                        })
                        .then(res => {
                            for (var k in res.data.data.content){
                              this.list.push( res.data.data.content[k])
                            }
                            if(res.data.data.content.length > 0){
                                this.selcNum++
                            }
                            // this.flagInfinite = true;
                            clearTimeout(timer)
                            done(true)
                        })
                        .catch(err => {
                          clearTimeout(timer)
                          done(true)
                        })
                      // }
                }, 500)
              }
            },
           onButtonClick(type,index,id){
              if(type == "delLock"){
                 var qs = require('qs')
                api.deletes("gatewayUser/"+window.localStorage.getItem("currentUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockRecord/"+id)
                .then( res =>{
                    if(res.data.data == true){
                        // Vue.set(this.list[index],"userListHide",true)
                        // console.log(this.list[index])
                         this.list.splice(index, 1)
                    }
                })
                .catch( err =>{
                    console.log(err)
                })
                 console.log(this.list[index])
              }
           }
        },
        mounted(){

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

    .DeviceListSize {
        height: toRem(221);
    }
    .DeviceListColor {
        color:#666;
        @include font-dpr(12px);
    }
  /*   .DeviceListIcon1 {
        float: left;
        width: 13%;
        height: 80px;
        background: yellowgreen;
    } */
    .DeviceListImg1 {
        float: left;
        margin-top: toRem(55);
        margin-left: toRem(70);
        width: toRem(116);
        height: toRem(116);
    }
    .DeviceOpenLock {
      color:#444444;
      @include font-dpr(16px);
    }
    .DeviceListID {
        float: left;
        margin-top: toRem(50);
        margin-left: toRem(53);
        // width: toRem(229);
    }
    .DeviceListGetKey {
        position: relative;
        float: right;
        margin-top:toRem(45);
        margin-right: toRem(75);
        /* background: gray; */
        @include font-dpr(12px);
        color:#A5A5A5;
    }
    .DeviceListTime {
      text-align: right;
    }
    .DeviceListSize {
        border-bottom: 1px solid #ccc;
    }
    .SwipeOutIcon {
        position: absolute;
        top: 13px;
        /* left: 0; */
        width: 17px;
        height: 20px;
    }
    .demo:before {
        content:'';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: red;
    }
    .selectDateBox {
      width: 100%;
      height: toRem(130);
      background: #F8F8F8;
      padding: 0;
    }
    .selectDate {
       max-height: toRem(130);
       list-style: none;
       text-align:right;
    }
    .selectDate:first-child {
       margin-left: toRem(110);
    }
    .selectDate li{
      float: left;
      width: toRem(170);
      color:#00AEFF;
      @include font-dpr(16px);
    }
    .selectDate span {
       color:#666666;
      @include font-dpr(10px);
    }
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>



