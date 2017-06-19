<template>
  <div>
      <div class="loadingBox" v-transfer-dom >
          <loading v-model="loading" :text="text1"></loading>
      </div>
      <scroller v-show="!loading">
        <!-- content goes here -->
            <div v-if="list.length === 0" class="NoGateWayAllBox">
              <div class="NoGateWayBox">
                  <div class="NoGateWayImg">
                    <img src="../../assets/qietu/hint.png">
                    <p class="NoGateWayFont">暂无设备请先添加</p>
                  </div>
              </div>
            </div>
            <div v-for="(item,index) in list">
            <!--         <div v-for= "item in item.Devlist">

                  {{item.code}}
                  </div> -->
                <GateWayDropBox
                  v-if = "item.level === 1"
                  :name = "item.name"
                  :gatewayCode = "item.gatewayCode"
                  :online = "item.online"
                  :gatewayLockList = "item.Devlist"
                  :gatewayUserId = "item.id"
                  :index = "index"
                  :list = "list"
                  :flag = "item.flag"
                  :level = "item.level"
                ></GateWayDropBox>

                <GateWayDropBox2
                  v-if = "item.level !== 1"
                  :name = "item.name"
                  :gatewayCode = "item.gatewayCode"
                  :online = "item.online"
                  :gatewayLockList = "item.Devlist"
                  :gatewayUserId = "item.id"
                  :index = "index"
                  :list = "list"
                  :flag = "item.flag"
                  :level = "item.level"
                >
                </GateWayDropBox2>

            </div>
            <div class="hidenHeight"></div>

      </scroller>

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
import {Loading,TransferDomDirective as TransferDom}  from 'vux'

import GateWayDropBox from "../public/Pub-GateWayDropBox"
import GateWayDropBox2 from "../public/Pub-GateWayDropBox2"
import API from "../../api/api"
import Vue from "vue"

var api = new API();


export default {
    directives: {
      TransferDom
    },
   components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton,
      GateWayDropBox,
      GateWayDropBox2,
      Loading
    },
   data () {
      return {
        disabled: false,
        arrowMove1: false,
        arrowMove2: true,
        isTrue:false,
        list:[],
        loading: true,
        text1: 'loading'
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
      fetchData(){
        var timer = setInterval(()=>{
          this.loading = false
          clearInterval(timer)
        },3000)
        

        api.get("gatewayUser")
      .then(data => {
        this.loading = false
        //获取网关列表的list
        //{"list":[{"gatewayCode":"B00495A17D023149"}]}
        // gatewayUserlist = data.data.data.list;

        // this.list = gatewayUserlist;
        this.list = data.data.data.list
        //保存第一次网关id
        //用户第一次进入网关列表,没有锁ID的情况
        if(!window.localStorage.getItem('gatewayUserId')){
            //没有网关ID的时候,默认将第一条数据的网关ID
            // window.localStorage.setItem('gatewayUserId',gatewayUserlist[0].id);
            window.localStorage.setItem('gatewayUserId',this.list[0].id);
            //没有锁ID的时候,去请求锁ID
            //window.localStorage.getItem('gatewayUserId')是当前Id
            api.get("gatewayUser/" + this.list[0].id + "/deviceStatus")
            .then(data => {
              //默认渲染第一条数据的id

              var devlist = data.data.data.list;
              Vue.set(this.list[0],"Devlist",devlist)
              Vue.set(this.list[0],"flag",true)
            })
            .catch(err => {
              console.log(err)
            });

        }

        else {
           var index
          for(var i = 0; i < this.list.length; i++) {
              if(this.list[i].id == window.localStorage.getItem('gatewayUserId')){
                //不是第一次的时候,用用户点的网关列表去请求,网关锁数据
                index = i
                api.get("gatewayUser/" +  window.localStorage.getItem('gatewayUserId') + "/deviceStatus")
                .then(data => {
                    var devlist = data.data.data.list;
                    //网关id用来证明,是当前id
                    //用户点击后存储当前数据下的网关id,
                    //根据网关id与当前网关id比对后将锁列表加入当前网关数据列表后面
                    //进入这里说明是当前网关列表,将lock数据放入当前网关列表下面
                     Vue.set(this.list[index],"Devlist",devlist)
                     Vue.set(this.list[index],"flag",true)
                })
                .catch( err => {
                  console.log(err)
                })
              }

            }

        }
        // console.log(this.list)
        //然后用户网关ID请求锁信息,如果没有锁,提示添加锁,如果有锁

        //点击的时候保存锁ID,和网关ID

        //下次进入的时候比对网关的ID,如果一致显示对应的列表

      })
      .catch(err => {
        console.log(err)
      });
      }
   },
  mounted(){

      // var gatewayUserlist
      //请求网关数据
   this.fetchData()

   },
   watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.hidenHeight{
  height: toRem(159);
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

    .loadingBox {
      display:flex;
      justify-content:center;
      /* background: black; */
    }

  //  .loading {
  //     @include font-dpr(30px);

  //     text-indent: -9999em;
  //     overflow: hidden;
  //     width: toRem(100);
  //     height: toRem(100);
  //     border-radius: 50%;
  //     margin: 0.8em auto;
  //     position: relative;
  //     animation: loading 1.7s infinite ease;
  //  }

  // @keyframes loading
  //   {
  //     0% {
  //     transform: rotate(0deg);
  //     box-shadow: -0.11em -0.83em 0 -0.4em skyblue, -0.11em -0.83em 0 -0.42em skyblue, -0.11em -0.83em 0 -0.44em skyblue, -0.11em -0.83em 0 -0.46em skyblue, -0.11em -0.83em 0 -0.477em skyblue;
  //      }
  //     5%, 95% {
  //         box-shadow: -0.11em -0.83em 0 -0.4em skyblue, -0.11em -0.83em 0 -0.42em skyblue, -0.11em -0.83em 0 -0.44em skyblue, -0.11em -0.83em 0 -0.46em skyblue, -0.11em -0.83em 0 -0.477em skyblue;
  //     }
  //     30% {
  //         box-shadow: -0.11em -0.83em 0 -0.4em gold, -0.51em -0.66em 0 -0.42em gold, -0.75em -0.36em 0 -0.44em gold, -0.83em -0.03em 0 -0.46em gold, -0.81em 0.21em 0 -0.477em gold;
  //     }
  //     55% {
  //         box-shadow: -0.11em -0.83em 0 -0.4em pink, -0.29em -0.78em 0 -0.42em pink, -0.43em -0.72em 0 -0.44em pink, -0.52em -0.65em 0 -0.46em pink, -0.57em -0.61em 0 -0.477em pink;
  //     }
  //     100% {
  //         -webkit-transform: rotate(360deg);
  //         transform: rotate(360deg);
  //         box-shadow: -0.11em -0.83em 0 -0.4em skyblue, -0.11em -0.83em 0 -0.42em skyblue, -0.11em -0.83em 0 -0.44em skyblue, -0.11em -0.83em 0 -0.46em skyblue, -0.11em -0.83em 0 -0.477em skyblue;
  //     }
  //   }
</style>

