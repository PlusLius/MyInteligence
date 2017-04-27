<!-- 锁系统密钥组件 -->
<template>
    <div>
        <div class="MyAdmin">
            <group gutter='0'>
                <div class="MyIcon">
                    lorem
                </div>
                <div class="MyMessage">
                    lorem
                </div>
                <div class="weui-cell__ft">
                    推送开门信息
                    <input class="weui-switch" type="checkbox">
                </div>
            </group>
        </div>

    </div>
</template>
<script>
    import { XSwitch, Group} from 'vux'

    export default {
        components: {
            Group,
            XSwitch,
        },
        data () {
            return {
              disabled: false
            }
        },
        methods: {
        }
    }


</script>
<style scoped>
    .MyAdmin {
        width: 100%;
        height: 74px;
        background: #ccc;
    }
    .MySwitchBox {
        /* height: 74px; */
        line-height: 74px;
    }
    .MyIcon {
        float: left;
        width: 14%;
        /* height:74px; */
        background: red;
    }
    .MyMessage {
        float: left;
        /* height:74px; */
        width: 36%;
        background: gray;
    }
  .weui-switch, .weui-switch-cp__box {
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    -webkit-transition: background-color 0.1s, border 0.1s;
    transition: background-color 0.1s, border 0.1s;
}
</style>



