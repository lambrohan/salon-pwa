<template>
  <div id="bottom-nav" class="w-full">
    <div
      class="w-full h-16 bg-primary rounded-tl-xl rounded-tr-xl shadow-xl flex flex-row items-center justify-evenly"
    >
      <UNavIcon
        v-for="item in nav"
        :key="item.icon"
        :path="item.icon"
        :route="localePath(item.route)"
      />
    </div>
  </div>
</template>

<script>
import NavIcon from './NavIcon.vue'
export default {
  name: 'BottomNav',
  components: { NavIcon },
  data() {
    return {
      nav: [
        {
          icon: '/icons/home.svg',
          route: '/home',
        },
        {
          icon: '/icons/u.svg',
          route: '/livechairs',
        },
        {
          icon: '/icons/user.svg',
          route: '/settings',
        },
      ],
    }
  },
}
</script>

<style></style>
