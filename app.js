const App = {
  data() {
    return {
      squares: new Array(10).fill(new Array(10).fill(0))
    }
  }
}

Vue.createApp(App).mount('#app')
