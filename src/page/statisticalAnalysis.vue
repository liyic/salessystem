<template>
    <div>
        <div class="user-info-title">
            <i class="el-icon-arrow-left"></i>
            <span class="mleft20">用户信息</span>
        </div>
        <div class="mtop20">
            <div class="product-category">
                <button class="cayegory-btn active" type="button" style="margin-left: 0;">全部产品</button>
                <button class="cayegory-btn" type="button">easy</button>
                <button class="cayegory-btn" type="button">power</button>
                <button class="cayegory-btn" type="button">数据库</button>
            </div>
            <!--4个小卡片-->
            <div class="mtop40 staticprc">
                <div class="card" style="margin-left: 0">
                    <div class="img">
                        <img src="../assets/img/lastday.png" alt="">
                    </div>
                    <div class="text">
                        <p class="number">35</p>
                        <p class="title">昨日新增</p>
                    </div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../assets/img/total.png" alt="">
                    </div>
                    <div class="text">
                        <p class="number">1200</p>
                        <p class="title">总用户数</p>
                    </div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../assets/img/day.png" alt="">
                    </div>
                    <div class="text">
                        <p class="number">180</p>
                        <p class="title">日活用户数</p>
                    </div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../assets/img/weekday.png" alt="">
                    </div>
                    <div class="text">
                        <p class="number">200</p>
                        <p class="title">周活用户数</p>
                    </div>
                </div>
            </div>
            <!--频率选择div-->
            <div class="frq-div mtop40" style="padding:15px 20px">
                <button class="btn btn-main middle-btn">
                    最近一个月
                </button>
                <button class="btn btn-main middle-btn mleft20">
                    最近三个月
                </button>
                <button class="btn btn-main middle-btn mleft20">
                    最近半年
                </button>
                <div class="date-picker-div right">
                    <span class="title">区间选择：</span>
                    <el-date-picker
                        v-model="date1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span class="center">至</span>
                    <el-date-picker
                        v-model="date2"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="box-module mtop40" style="padding: 20px 15px">
                <div class="user-info-title">
                    <ul class="tab">
                        <li class="tabItem active">
                            <span class="tabLink">新增用户</span>
                        </li>
                        <li class="tabItem">
                            <span class="tabLink">总用户数</span>
                        </li>
                        <li class="tabItem">
                            <span class="tabLink">日活用户数</span>
                        </li>
                        <li class="tabItem">
                            <span class="tabLink">周活用户数</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box-module mtop40">
                分布
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "statisticalAnalysis",
        data(){
            return{
                date1:"",
                date2:"",
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
</style>
