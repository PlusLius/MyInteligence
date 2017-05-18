<!-- 锁系统密钥组件 -->
<template>
    <div>

        <!-- 历史记录列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x height="9.5rem">
            <!-- 上拉加载下拉滚动组件内容填充 -->
              <div class="DeviceHeight" >
                    <div class="MyAdmin" v-for="i in 300">
                        <div class="MyIcon icon-edit" @click="editName">
                        </div>
                        <div class="MyMessage">
                            <p class="MyName">{{'自己'}}</p>
                            <p class="MyID">{{'ID: 001  密码开锁'}}</p>
                        </div>
                        <div class="MySendMsg">
                              推送开门信息
                        </div>
                        <div class="MySwitch weui-cell__ft">
                            <input class="weui-switch" type="checkbox">
                        </div>
                    </div>
              </div>
            </scroller>
        </div>

        <div id="dialog1" v-if="show">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">
                    编辑锁用户信息
                </strong></div>
                <div class="weui-dialog__bd">
                    <input type="text" name="text" class="editLockMsg" placeholder="请编辑锁用户信息">
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default editLockOk" @click="editLockOK">确定</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary editLockCancel"  @click="editLockCancel">取消</a>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import { XSwitch, Group, Scroller} from 'vux'
    import API from "../api/api"
    var api = new API()

    export default {
        components: {
            Group,
            XSwitch,
            Scroller
        },
        data () {
            return {
              disabled: false,
              show: false
            }
        },
        methods: {
            editName () {
               this.show = true;
            },
            editLockOK(){
                this.show = false;
            },
            editLockCancel(){
                this.show = false;
            }
        },
        mounted(){
            api.get("gatewayUser/"+window.localStorage.getItem("gatewayUserId")+"/deviceStatus/"+window.localStorage.getItem("gatewayLockId")+"/lockUser")
            .then(res =>{
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })


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
    .MyAdmin {
        width: 100%;
        height: toRem(221);
        border-bottom: 1px solid #CCCCCC;
        overflow:hidden;
    }
    .MySwitchBox {
        height: 74px;
        line-height: 74px;
    }
    .MyIcon {
        float: left;
        width: toRem(175);
        height:toRem(221);
        text-align: center;
        line-height: toRem(221);
        @include font-dpr(21px);
        color:#00A6F4;
    }
    .MyMessage {
        float: left;
        width: toRem(364);
        height:toRem(221);
        line-height: 17px;
    }
    .MyAdminBox {
        height:74px;
    }
    .MyName {
        @include font-dpr(16px);
        margin-top: toRem(57);
        margin-bottom: 11px;
    }
    .MyID {
        margin-top:toRem(40) ;
        @include font-dpr(12px);
        color:#A5A5A5;
    }
    .MySendMsg {
        float: left;
        text-align: right;
        margin: toRem(88) 0 0 18px;
        @include font-dpr(13px);
        color:#444444;
    }
    .MySwitch {
        float: right;
        margin-right: toRem(20);
    }
    .weui-cell__ft {
        margin-top: toRem(60);
    }
     .editDialog {
    width: toRem(901);
  }

  .weui-dialog__hd {
    color:#00A6F4;
  }

  .gatewayDel {
    color:#666666;
  }

  .gatewaySure {
    color:#00A6F4;
  }

  .remoteUpdateMore {
    line-height: 1.8;
    padding-top: toRem(30);
    box-sizing:border-box;
  }

  .weui-dialog__hd:after {
    content: " ";
    position: absolute;
    left: 0;
    top:55px;
    right: 0;
    height: 1px;
    border-top: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .weui-dialog__bd {
    min-height:toRem(409);
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
  }

  .editMsg,.editLockMsg,.editRemote {

    width: toRem(762);
    height: toRem(120);
    text-align: center;
  }

  .editLockMsg {
    margin-top: toRem(50)
  }

  .pressUpdate {
    width: toRem(400);
    height: toRem(80);
    border-radius: 40px;
    border: 1px solid #0EAAF4;
    color:#0EAAF4;
    background: #fff;
    @include font-dpr(16px);
    font-family:"微软雅黑";
  }

  .editLockMsg {
    width: toRem(762);
    height: toRem(120);
  }

  .editLockOk {
    color:#00A6F4;
  }

  .editLockCancel {
    color:#666;
  }

 input[type=text] {
    border: 1px solid #ccc;
    background-color:transparent;
    color:black;
    @include font-dpr(15px);
    FILTER: alpha(opacity=0); /*androd*/
    appearance:none;  /*下拉框去掉右侧图标*/
    -moz-appearance:none;
    -webkit-appearance:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }
</style>



