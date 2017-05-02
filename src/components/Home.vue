<template>
  <div id="home">
    <header>组件列表</header>
    <section class="v-c-content">
      <homeul>
        <homeli v-for="compo in compos" v-bind:cpath="compo.cpath" v-bind:ckey="compo.ckey" v-bind:cname="compo.cname"></homeli>
      </homeul>
    </section>
  </div>
</template>

<script>
import homeul from '../components/Homeul'
import homeli from '../components/Homeli'

export default {
  name: 'Home',
  data () {
    return {
      compos: [
        {ckey: 'Button', cname: '按钮', cpath: '/toButton'},
        {ckey: 'Input', cname: '输入框', cpath: '/toInput'},
        {ckey: 'Checkbox', cname: '复选框', cpath: '/toCheckbox'},
        {ckey: 'Radio', cname: '单选框', cpath: '/toRadio'},
        {ckey: 'Select', cname: '下拉框', cpath: '/toSelect'},
        {ckey: 'Textarea', cname: '文本框', cpath: '/toTextarea'},
        {ckey: 'Loading', cname: '加载圈', cpath: '/toLoading'},
        {ckey: 'Toast', cname: '吐司', cpath: '/toToast'},
        {ckey: 'Message-box', cname: '消息弹框', cpath: '/toMessageBox'},
        {ckey: 'Infinite-scroll', cname: '无限滚动', cpath: '/toInfiniteScroll'},
        {ckey: 'Pull-up-down-refresh', cname: '上下拉刷新', cpath: '/toPullUpDownRefresh'},
        {ckey: 'Fileupload', cname: '文件上传', cpath: '/toFileupload'},
        {ckey: 'Pop-list', cname: '弹出列表', cpath: '/toPopList'},
        {ckey: 'Popup', cname: '弹出框', cpath: '/toPopup'},
        {ckey: 'Swipe', cname: '滑动', cpath: '/toSwipe'},
        {ckey: 'Lazy-load', cname: '惰性加载', cpath: '/toLazyLoad'},
        {ckey: 'Range', cname: '范围选择', cpath: '/toRange'},
        {ckey: 'City-Relative', cname: '城市联动', cpath: '/toCityRelative'},
        {ckey: 'Progress', cname: '进度条', cpath: '/toProgress'},
        {ckey: 'DateTime', cname: '日期时间控件', cpath: '/toDateTime'},
        {ckey: 'Index-List', cname: '索引列表', cpath: '/toIndexList'},
        {ckey: 'Switch', cname: '开关', cpath: '/toSwitch'},
        {ckey: 'Search', cname: '搜索', cpath: '/toSearch'},
        {ckey: 'Badge', cname: '徽章', cpath: '/toBadge'},
        {ckey: 'Picker', cname: '选择器', cpath: '/toPicker'},
        {ckey: 'Header', cname: '头部', cpath: '/toHeader'},
        {ckey: 'Tabbar', cname: '标签', cpath: '/toTabbar'},
        {ckey: 'Navbar', cname: '导航栏', cpath: '/toNavbar'},
        {ckey: 'Cell', cname: '单行', cpath: '/toCell'},
        {ckey: 'Swipe-Cell', cname: '滑动单行', cpath: '/toSwipeCell'},
        {ckey: 'Loading-Cell', cname: '加载中单行', cpath: '/toLoadingCell'},
        {ckey: 'Form', cname: '表单', cpath: '/toForm'}
      ]
    }
  },
  components: { homeli, homeul }
}
</script>

<style scoped>
  header{
    padding:16px 0;
    border-bottom: 1px solid #999;
    text-align: center;
  }
</style>
