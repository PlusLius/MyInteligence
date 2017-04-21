<template>

    <div>

        <div class="MyResentUse">
            <div class="Electricity">
                电量
            </div>
            <div class="RemoteUnlockBox">
                <div class="MyDynamicKey">
                    {{"智能锁: 12454848"}}
                </div>
                <div class="RemoteUnlock">
                    {{"远程开锁"}}
                </div>
            </div>
        </div>

        <div class="HistoryMenu">
            <router-link to="/MyResentUse/MyHistory" class="HistoryMenuFont1">
                历史记录
            </router-link>
            <router-link to="/MyResentUse/MyUserList" class="HistoryMenuFont2">
                用户列表
            </router-link>
        </div>
        <keep-alive>
              <router-view></router-view>
        </keep-alive>

    </div>

</template>

<script>
    export default {
        data(){
            return {

            }
        },
    }
</script>

<style scoped>
    .MyResentUse {
        width: 100%;
        height: 121px;
        background: #29b6f6;
    }
    .Electricity {
        float: left;
        width: 17%;
        height: 62px;
        background: #ccc;
    }
    .RemoteUnlockBox {
        float:right;
        width: 50%;
        height: 121px;
        background: #ccc;
    }
    .HistoryMenu {
        display:flex;
        align-items: center;
        height: 50px;
        border: 1px solid #ccc;
    }
    .HistoryMenuFont1,.HistoryMenuFont2 {
        flex-grow:1;
        text-align:center;
        height: 50px;
        line-height: 50px;
    }
    .HistoryMenuFont1 {
        border-right: 1px solid #ccc;
    }
</style>
