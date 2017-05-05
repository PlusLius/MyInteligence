<template>
  <div>
        <div>
           <div>
                {{order}}
           </div>
            <div>
                {{token}}
            </div>
            <div>
                aaa
            </div>
        </div>
    <!--     <div id="dialog1">
            <div class="weui-mask"></div>
            <div class="weui-dialog My-dialog ">
                <div class="weui-dialog__hd My-title"><strong class="weui-dialog__title">远程开锁</strong></div>
                <div class="weui-dialog__bd My-dialogBody">
                    <input class="My-PassWord" type="password" name="password" placeholder="请输入您的远程开锁密码">
                    <div class="MyChangePassWordBox">
                         <div class="MyChangePassWord">
                            修改密码
                        </div>
                    </div>

                </div>
                <div class="weui-dialog__ft My-dialogBottom">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default MyOk">确定</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary MyCancel ">取消</a>
                </div>
            </div>
        </div> -->
  </div>
</template>



<script>
import Vux from 'vux'

export default {
    data() {
        return {
            order: window.localStorage.getItem("order"),
            token: window.localStorage.getItem("token")
        }
    }
}

</script>


<style lang='scss' scoped >
    @function toRem ($DraftSize) {
      @return  ($DraftSize / 144 * 100) / 75 * 1rem;
    }
    @mixin font-dpr($font-size){
      font-size: $font-size;
      [data-dpr="2"] & { font-size: $font-size * 2; }
      [data-dpr="3"] & { font-size: $font-size * 3; }
    }

    .My-dialog {
        width: toRem(901);
        height: toRem(723);
        background: #F8F8F8;
    }

    .My-title {
        position: relative;
        height: toRem(145);
        line-height: toRem(145);
        @include font-dpr(15px);
        color:#00A6F4;

      /*   border-bottom: 1px solid #B5B5B5; */
    }
    .My-title:after {
        transform: scaleY(0.5);
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #D5D5D6;
        color: #D5D5D6;
    }
    .weui-dialog__hd {
        box-sizing:border-box;
        padding:0;
    }
    .My-dialogBody {
        height:toRem(409);
    }
    .My-PassWord {
        margin-top: toRem(70);
        width: 100%;
        height: toRem(120);
        text-align: center;
        @include font-dpr(15px);
        color:#CCCCCC;
    }
    .MyChangePassWordBox {
        display:flex;
        justify-content:center;
    }
    .MyChangePassWord {
        margin-top: toRem(65);
        width: toRem(400);
        height: toRem(80);
        line-height: toRem(80);
        border-radius: 40px;
        border: 1px solid #0EAAF4;
        color:#0EAAF4;
    }
    .My-dialogBottom {
        height:toRem(140);
        line-height:toRem(150);
        display:flex;
        justify-content:flex-starts;
    }
    .MyOk {
        color:#0EAAF4;
    }
    .MyCancel {
        color:#666666;
    }
</style>


