<template>
    <div id="sweep" class="sweep" ref="ele">
        <!-- 提示 -->
        <!-- <div class="prompt">请对准扫描器启动设备</div> -->
        <div class="prompt" v-if="upay.template==='upay'|| upay.template === 'default'">请对准扫描器启动设备</div>
        <!-- 二维码 -->
        <div class="qrcode">
            <Qrcode :value="code" type="img" class="code" :size="qrSize"></Qrcode>
        </div>
        <!-- 提示 -->
        <div class="prompt guwei" v-if="upay.template==='guwei'||upay.template==='mogo'">请对准扫描器启动设备</div>
    </div>
</template>
<style scoped lang="stylus">
    @import '../../common/styl/public.styl';
    @import './sweep.styl';
</style>
<script src="./logic.js"></script>



