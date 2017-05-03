<!-- 历史记录组件 -->
<template>
    <div>

        <!-- 历史记录列表部分 -->
        <div class="DeviceList">
            <!-- 上拉加载下拉滚动组件 -->
            <scroller lock-x  @on-scorll="onScroll"
             height="9.5rem"
            :use-pulldown='true'
            :use-pullup='true'
            :pulldown-config='pulldownConfig'
            :pullup-config='pullupConfig'
            @on-pullup-loading="pullupLoading"
            @on-pulldown-loading="pulldownLoading"
            ref="scrollerBottom"
            >
            <!-- 上拉加载下拉滚动组件内容填充 -->
              <div class="DeviceHeight" >
                    <!-- 侧滑组件 -->
                   <swipeout v-for="i in count">
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
                                <div class="DeviceOpenLock">
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
                    <!-- <load-more tip="loading"></load-more> -->
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
              disabled: false,
              pulldownConfig: {
                  content: '',
                  height: 40,
                  autoRefresh: false,
                  downContent: '下拉刷新 ↓',
                  upContent: '释放刷新 ↑',
                  loadingContent: '<div class="weui-cell__ft" style="text-align:center"><span class="vux-spinner vux-spinner-ios"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></span>  <!----></div>',
                  clsPrefix: 'xs-plugin-pulldown-'
              },
              pullupConfig: {
                  content: '',
                  pullUpHeight: 60,
                  height: 0,
                  autoRefresh: false,
                  downContent: '释放刷新 ↓',
                  upContent: '上拉刷新 ↑',
                  loadingContent: '加载中 ...',
                  clsPrefix: 'xs-plugin-pullup-'
              },
              count: 1,
              onFetching: false
            }
        },
        methods: {
            onScroll(){
                this.disabled = true

            },
            handleEvents (type) {
              console.log('event: ', type)
            },
            pulldownLoading(){
                setTimeout(() => {
                      this.count += 1
                      this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset({top:0})
                      })
                }, 2000)
            },
            pullupLoading(){
                console.log(this.count)
                setTimeout(() => {
                      this.count += 1
                      this.$nextTick(() => {
                        this.$refs.scrollerBottom.donePullup()
                      })
                }, 2000)
            },
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                } else {
                    console.log(this.count)
                    this.onFetching = true
                    setTimeout(() => {
                      this.count += 1
                      this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset()
                      })
                      this.onFetching = false
                    }, 2000)
                }
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
        width: toRem(229);
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
</style>



