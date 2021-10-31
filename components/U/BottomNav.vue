<template>
  <div id="bottom-nav" class="fixed w-full bottom-0 left-0 p-6">
    <div
      class="
        w-full
        h-16
        bg-primary
        rounded-full
        shadow-xl
        flex flex-row
        items-center
        justify-evenly
      "
    >
      <UNavIcon
        v-for="item in nav"
        :key="item.icon"
        :path="item.icon"
        :route="item.route"
      />
    </div>
  </div>
</template>

<script>
import NavIcon from './NavIcon.vue'
export default {
  components: { NavIcon },
  data() {
    return {
      nav: [
        {
          icon: 'icons/home.svg',
          route: '/home',
        },
        {
          icon: 'icons/u.svg',

          route: '/live',
        },
        {
          icon: 'icons/user.svg',
          route: '/settings',
        },
      ],
    }
  },
}
</script>

<style></style>
