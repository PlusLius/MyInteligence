<!-- 锁系统密钥组件 -->
<template>
    <div>

        <!-- 锁系统列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x  @on-scorll="onScroll" height="500px">
            <!-- 上拉加载下拉滚动组件内容填充 -->
              <div class="DeviceHeight" v-for="i in 5">
                  <!-- 侧滑组件 -->
                   <swipeout>
                    <!-- 侧滑组件容器 -->
                      <swipeout-item
                      :disabled="disabled"
                      transition-mode="follow"
                      :right-menu-width="210"
                      >
                      <!-- 侧滑组件右侧菜单 -->
                        <div slot="right-menu">
                          <swipeout-button background-color="#26c6da" :width="70" class="demo">{{'编辑'}}
                          </swipeout-button>
                          <swipeout-button background-color="#ffa726" :width="70"> {{'分享'}}</swipeout-button>
                          <swipeout-button background-color="#e84e40" :width="70">{{'删除'}}</swipeout-button>
                        </div>
                        <!-- 侧滑组件正文显示部分 -->
                        <div slot="content" class="DeviceListSize">
                            <div class="DeviceListIcon1">

                            </div>
                            <div class="DeviceListID">
                                <div>
                                    {{'123456'}}
                                </div>
                                <div class="DeviceListColor">
                                    {{'ID: 123456654321'}}
                                </div>
                            </div>
                            <div class="DeviceListIcon2">
                                <router-link to="/MyDynamicKey/MyKeyManagement" class="DeviceIcon2">Home</router-link>
                            </div>
                            <div class="DeviceListGetKey">
                                <div class="DeviceGetKey">
                                    获取密钥
                                </div>
                            </div>
                        </div>
                      </swipeout-item>

                    </swipeout>

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
    .DeviceListIcon2 {
        position:relative;
        float: left;
        width: 12%;
        height: 80px;
        background: pink;
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
</style>








