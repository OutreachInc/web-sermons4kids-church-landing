<template>
  <div>
    <div class="relative flex justify-center">
      <div v-if="!played" class="inline w-full">
        <button
          class="relative w-full rounded-lg shadow-lg focus:outline-none focus:shadow"
          @click="playVideo()"
        >
          <img
            class="w-full rounded-lg shadow-lg"
            :src="video.thumb_url"
            :alt="video.title"
          />
          <div class="absolute inset-0 flex items-center justify-center w-full h-full">
            <div>
              <svg
                class="w-24 h-24 text-white border-4 border-white rounded-full opacity-75"
                fill="currentColor"
                viewBox="0 0 84 84"
              >
                <circle opacity="0.9" cx="42" cy="42" r="42" fill="#249BD7" />
                <path
                  d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <video
        v-show="played"
        :src="video.video_url"
        controls
        preload="none"
        class="w-full rounded-lg shadow-lg outline-none"
        ref="resourceVideo"
        v-cloak
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object
    }
  },
  data: () => ({
    played: false,
  }),
  methods: {
    playVideo(){
      this.played = true;
      this.$refs.resourceVideo.play();
    }
  }
};
</script>

<style>
</style>