<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot> 
    <!-- 插槽 -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { nextTick } from 'q';
export default {
  name: "Scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    // nextTick保证页面渲染完成后再调用
    this.$nextTick(() => {
      var scroll = new BScroll(this.$refs.wrapper, {
        tap: true,  //点击事件
        probeType: 1  //滚动的时候会派发scroll事件，会截流
      });
      this.scroll = scroll;
      scroll.on("scroll", pos => {
        this.handleToScroll(pos);
      });
      scroll.on("touchEnd", pos => {
        this.handleToTouchEnd(pos);
      });
    });
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>