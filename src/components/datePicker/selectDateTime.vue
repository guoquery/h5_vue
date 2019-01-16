
<template>
    <div ref="homePage">
        <el-input id="persian" class="example1" :class="onevent" :placeholder="placeholder" :value="timeValue" v-model="timeValue"
            @clear='onClear' clearable :calendarType='calendarType'>
        </el-input>
    </div>
</template>
<script>
    // import {} from "../../../static/persian/persian-datepicker.js"
    export default {
        name: 'datePicker',
        data() {
            return {
                timeValue: '', //选择日期之后input里面显示的值
                dateValue: '', //保存插件生成的日历组件对象
            }
        },
        props: {
            //日历选择值的格式
            type: {
                type: String,
                default: 'L',
            },

            placeholder: {
                type: String,
                default: ''
            },
            //子组件日历默认选择时间，若组件vmodle有值则，此组件有初始值
            defaultDate: {
                type: String,
                default: ''
            },
            //父组件传入的参数，用于new日历对象，以避免同一页面new多个日历对象时选择时间时相互影响
            onevent: {
                type: String,
                default: 'change' //为input设置一个类名 随意设置就好
            },
            //父组件vmodle绑定的值
            value: {
                type: String,
                default: ''
            },
            viewMode :{
                type:String,//year/day/month
                default:'day'
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let that = this;
                // 判断语言
                if(that.$i18n.locale == 'en'){  //英语情况下判定日历类型
                    if(that.$store.getters.date === 'GregorianDate'){
                        that.calendarType = 'gregorian'
                    }else{
                        that.calendarType = 'persian'
                    }
                }else if(that.$i18n.locale == 'dr'){//dr语情况下判定日历类型

                }else{//其他语情况下判定日历类型

                }
                // if ((that.$i18n.locale == 'en' && this.$store.getters.date === 'GregorianDate') ||
                //     (that.$i18n.locale == 'pashto' && this.$store.getters.date === 'GregorianDate')) {
                //     that.calendarType = 'gregorian'
                // }
                if (that.value) {
                    that.timeValue = that.calendarType === 'persian' ? that.$persianDate(that.value, 'LLL') : this.$GregorianDateFormat(
                        that.value, 'MM/DD/YYYY');
                }
                $(document).ready(function () {
                    //设置初始日期值
                    if (that.defaultDate) {
                        // that.timeValue = that.defaultDate
                        $(`.${that.onevent}>.el-input__inner`).attr('value', that.defaultDate)
                    }
                    console.log("mmmmmm", $(`.${that.onevent}>.el-input__inner`))
                    let pDatepickerConfig = {  //初始化日历相关配置
                        altFormat: 'LL',
                        format: that.type,
                        onSelect: that.onChange,
                        calendarType: that.calendarType, //persian波斯，gregorian公历
                        calendar: {
                            'persian': {
                                'locale': that.$i18n.locale == 'en' ? 'en' : 'fa',
                                'showHint': true,
                                'leapYearMode': 'algorithmic' // "astronomical"
                            },
                            'gregorian': {
                                'locale': that.$i18n.locale == 'en' ? 'en' : 'fa',
                                'showHint': true
                            }
                        },
                        initialValue: false, //是否有初始值,
                        viewMode :that.viewMode,
                        // maxDate:new Date('1989/12/31'),
                        // minDate:new Date('1980/1/1'),
                        // position:[],
                        // initialValueType:'persian',
                        toolbox: {
                            calendarSwitch: {
                                onSwitch: that.calendarTypeChange
                            },
                            onToday: that.todayClick,
                        }
                    };
                    if(that.viewMode==='year'&&that.defaultDate){
                        pDatepickerConfig.maxDate=new Date('1989/12/31')
                        pDatepickerConfig.minDate=new Date('1980/01/01')
                        // maxDate:new Date('1989/12/31'),
                        // minDate:new Date('1980/1/1'),
                    }
                    that.dateValue = $(`.${that.onevent}>.el-input__inner`).pDatepicker(pDatepickerConfig);
                    console.log("<><><><><>>>>>><><><><>", that.dateValue)
                    //设置初始日期值
                    if (that.defaultDate || !that.value) {
                        $(`.${that.onevent}>.el-input__inner`).attr('value', '')
                    }
                });
            },
            /**
             * 点击日历上面的日期
             * @param 时间(毫秒值)
             */
            onChange(e) {
                if (!e) {
                    return
                } //选择月份直接退出
                let date = new Date(e);
                date = this.$formatDate(date);
                console.log(e, new Date(date), 666, this.onevent, this.dateValue,this.calendarType)
                this.timeValue = this.calendarType === 'persian' ? new persianDate(e).toLocale('en').format("LLL") : date;
                // this.timeValue = this.calendarType === 'persian' ? this.$persianDate(date) : date;
                this.$emit('change', date)
            },
            //清除日期
            onClear() {
                this.$emit('change', '')
            },
            // 点击切换日期语言
            calendarTypeChange(e) {
                console.log("点击切换语言", e)
                console.log(e, 7777, e.options.calendar_);
                this.calendarType = e.options.calendar_;
            },
            // 点击today
            todayClick(e) {
                let date = e.state.selected.unixDate
                console.log(e, 77777, date)
                this.onChange(date);
            },
            changeFixed(clientHeight) {
                this.$refs.homePage.style.height = clientHeight + 'px';
                // alert(this.$refs.homePage.style.height )

            },

        },
        computed: {
            /**
             * persian波斯，gregorian公历
             */
            calendarType: {
                get: function () {
                    // if (this.$store.getters.date === 'SolarDate') {
                    //     return 'persian'
                    // }
                    // this.init()
                    return this.$store.state.app.date === 'SolarDate'?'persian':'gregorian'
                },
                set: function (val) {
                    if (val === 'persian') {
                        this.$store.dispatch('setDate', 'SolarDate');
                        api.storage('date', 'SolarDate')
                        return 'persian'
                    } else {
                        this.$store.dispatch('setDate', 'GregorianDate');
                        api.storage('date', 'GregorianDate')
                        return 'gregorian'
                    }
                }
            }
        },
        watch: {
            // 如果 `clientHeight` 发生改变，这个函数就会运行
            clientHeight: function () {
                this.changeFixed(this.clientHeight)
            },
            calendarType:function(newVal,oldVal){
                this.init();
            }

        },
    }

</script>
<style lang="less">
    #persian {
        padding-right: -10px !important;
    }

</style>
