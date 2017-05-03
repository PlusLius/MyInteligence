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
                        <div class="MyIcon icon-edit">
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

    </div>
</template>
<script>
    import { XSwitch, Group, Scroller} from 'vux'

    export default {
        components: {
            Group,
            XSwitch,
            Scroller
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
</style>



