export default {
  data() {
    return {
      debounceTimer: null
    }
  },
  methods: {
    // 防抖
    $debounce(func, ...args) {
      const context = this
      if (this.debounceTimer) clearTimeout(this.debounceTimer)
      const callNow = !this.debounceTimer // 是否立即执行
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null
      }, 1000)
      if (callNow) func.apply(context, args)
    },
    // echarts等地方需要动态改变字体大小，传入目标字体大小
    resetSize(px) {
      const clientWidth = window.innerWidth || document.body.clientWidth // 屏幕尺寸
      if (!clientWidth) { return 0 }
      const fontSize = clientWidth / 1920
      const count = px * fontSize
      if (count < px) {
        return px
      }
      return count
    }
  }
}
