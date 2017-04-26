<!-- 历史记录组件 -->
<template>
    <div>

        <!-- 历史记录列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x  @on-scorll="onScroll" height="400px" :scroll-bottom-offst="100">
            <!-- 上拉加载下拉滚动组件内容填充 -->
              <div class="DeviceHeight" >
                    <!-- 侧滑组件 -->
                   <swipeout v-for="i in 10">
                    <!-- 侧滑组件容器 -->
                      <swipeout-item
                      :disabled="disabled"
                      transition-mode="follow"
                      :right-menu-width="83"
                      >
                      <!-- 侧滑组件右侧菜单 -->
                        <div slot="right-menu">
                          <swipeout-button background-color="#e84e40" :width="83">{{'删除'}}
                          </swipeout-button>
                        </div>
                        <!-- 侧滑组件正文显示部分 -->
                        <div slot="content" class="DeviceListSize">
                            <!-- <div class="DeviceListIcon1"> -->
                                <img src="../assets/qietu/icon/zhiwen@3x.png" class="DeviceListImg1">
                            <!-- </div> -->
                            <div class="DeviceListID">
                                <div>
                                    {{'指纹开锁'}}
                                </div>
                                <div class="DeviceListColor">
                                    {{'开锁人: 003'}}
                                </div>
                            </div>
                            <div class="DeviceListGetKey">
                                <div class="DeviceListDate">
                                    {{'2016-09-22'}}
                                </div>
                                <div class="DeviceListTime">
                                    {{'11:44:00'}}
                                </div>
                            </div>
                        </div>
                      </swipeout-item>

                    </swipeout>
                    <load-more tip="loading"></load-more>
              </div>
            </scroller>
        </div>

    </div>
</template>
<script>
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
    .DeviceListSize {
        height: 74px;
    }
    .DeviceListColor {
        color:#666;
        font-size: 12px;
    }
  /*   .DeviceListIcon1 {
        float: left;
        width: 13%;
        height: 80px;
        background: yellowgreen;
    } */
    .DeviceListImg1 {
        float: left;
        margin-top: 18px;
        margin-left: 23px;
        width: 39px;
        height: 39px;
    }
    .DeviceListID {
        float: left;
        margin-top: 16px;
        margin-left: 18px;
        width: 76px;
        font-size:16px;
    }
    .DeviceListGetKey {
        position: relative;
        float: right;
        margin-top:16px;
        margin-right: 25px;
        /* background: gray; */
        font-size: 12px;
        color:#A5A5A5;
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
</style>



