<template>
  <div class="relative inline-block text-left" v-on-clickaway="close">
    <div>
      <span class="rounded-md shadow-sm">
        <button
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="isOpen = !isOpen"
        >
          {{ label }}
          <!-- Heroicon name: chevron-down -->
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </span>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="isOpen" class="absolute right-0 z-20 w-56 mt-2 origin-top-right rounded-md shadow-lg" v-cloak>
        <div class="bg-white rounded-md shadow-xs">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              :href="item.url"
              class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
              v-for="(item, index) in items"
              :key="index"
            >{{item.text}}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
  mixins: [ clickaway ],
  props: {
    items: {
      type: Array,
    },
    label: {
      type: String,
    },
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    close(){
      this.isOpen = false;
    }
  }
};
</script>

<style>
</style>