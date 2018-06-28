<template>
    <div class="x-bar">
        <div :id="id"
             :option="option"></div>
    </div>

</template>

<script>
    import HighCharts from 'highcharts/highcharts';
    export default {
        mounted(){
            this.myChart = HighCharts.chart(document.getElementById('line1'));
            this.initData();
        },
        props: ['categories', 'series'],
        methods: {
            initData(){
                const option = {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                    },
                    xAxis: {
                        categories: this.categories
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                    },
                    // tooltip: {
                    //     pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
                    // },
                    plotOptions: {
                        area: {
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name:"拜访客户数",
                        data:[1,1,1,1,1,1,1,1,3]
                    }]
                }
                this.myChart.setOption(option);
            }
        },
        watch: {
            categories: function (){
                this.initData()
            },
            // series: function (){
            //     this.initData()
            // }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
