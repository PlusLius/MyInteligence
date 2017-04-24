<!-- 锁系统密钥组件 -->
<template>
    <div>

        <!-- 锁系统列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x  @on-scorll="onScroll" height="500px">
            <!-- 上拉加载下拉滚动组件内容填充 -->
              <div class="DeviceHeight" v-for="i in 2">
                <!-- <cell-box  class="w51"> -->
                <div>
                    <group gutter='0'  class="w51">
                      <div class="w5">
                        lorem
                    </div>
                      <div class="w5">
                        lorem
                    </div>
                         <x-switch :title="'推送开门信息'"></x-switch>
                    </group>
                </div>

                <!-- </cell-box> -->
              </div>
            </scroller>
        </div>
    </div>
</template>
<script>
    import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
    import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
    import { XSwitch, CellBox } from 'vux'

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
            XSwitch,
            CellBox
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
            }
        }
    }


</script>
<style scoped>
    .DeviceHeight {
        border-bottom: 1px solid #ccc;
    }
    .DeviceListSize {
        font-size:12px;
        height: 80px;
    }
    .DeviceListColor {
        color:#666;
    }
    .DeviceListIcon1 {
        float: left;
        width: 13%;
        height: 80px;
        background: yellowgreen;
    }
    .DeviceListID {
        float: left;
        width: 53%;
    }
    .DeviceListGetKey {
        position: relative;
        float: left;
        width: 22%;
        height: 80px;
        background: gray;
    }
    .DeviceGetKey {
        position: absolute;
        top:50%;
        left:50%;
        margin-top: -20px;
        margin-left: -42%;
        width: 84%;
        height: 40px;
        border-radius:8px;
        color:#FFF;
        text-align: center;
        line-height: 40px;
        background: #29b6f6;
    }
    .demo:before {
        content:'';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: red;
    }
    .w5 {
        float: left;
        width: 25%;
    }
    .w51 {
        width: 100%;
    }
</style>



