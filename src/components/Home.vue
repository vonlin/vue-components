<template>
  <div id="home">
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
import configs from '../components.config.json'

export default {
  name: 'Home',
  data () {
    return {
      compos: configs
    }
  },
  components: { homeli, homeul}
}
</script>


