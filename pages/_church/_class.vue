<template>
<div class="h-screen font-body">
  <div class="relative h-80" :style="gradientBackground">
    <div class="z-10 flex items-center justify-between w-full px-4 pt-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2>
        <NuxtLink :to="`/${church.slug}`" class="font-sans text-3xl font-semibold leading-none tracking-tight text-white opacity-75">{{ church.name }}</NuxtLink>
      </h2>
      <Dropdown :label="grade.title" :items="dropdownItems" v-if="dropdownItems.length"></Dropdown>
    </div>
    <div class="absolute bottom-0 w-full h-10 bottom-flow-divider sm:h-14 md:h-16 lg:h-20 xl:h-24"></div>
  </div>

  <div class="relative z-10 px-4 mx-auto mb-28 max-w-7xl sm:px-6 lg:px-8">
    <div class="flex flex-wrap space-y-8 lg:-mx-6">
      <div v-if="event" class="z-10 w-full px-6 text-center lg:w-1/2 -mt-52">
          <h1 class="text-4xl font-semibold leading-10 tracking-tighter text-white font-subheading">{{ event.sermon.title }}</h1>
          <div class="mt-4 font-sans text-xl font-bold tracking-tight text-white">{{ translate('Lesson_for') }} {{ lessonDate() }}</div>

          <div class="max-w-xl mx-auto mt-8" v-if="event.video_embed">
            <div class="mt-3 mb-5 rounded-lg shadow-lg embed-responsive aspect-ratio-16/9">
              <iframe class="embed-responsive-item" :src="event.video_embed" allowfullscreen></iframe>
            </div>
          </div>

          <div :class="{'mt-40': !event.video_embed, 'mt-10': !!event.video_embed}">
            <div v-if="event.sermon.theme">
              <h3 class="text-2xl font-medium text-curious-blue-500">{{ translate('Theme') }}</h3>
              <p class="text-xl text-gray-600">{{ event.sermon.theme }}</p>
            </div>
            <div class="mt-6" v-if="event.sermon.scripture">
              <h3 class="text-2xl font-medium text-curious-blue-500">{{ translate('Scripture') }}</h3>
              <p class="text-xl text-gray-600">{{ event.sermon.scripture }}</p>
            </div>
            <resource-video-player
              v-if="event.video_lesson"
              :video="event.video_lesson"
              class="max-w-xl mx-auto mt-12"
            ></resource-video-player>
          </div>
      </div>
      <!-- No Event -->
      <div class="z-10 w-full px-6 text-center lg:w-1/2 -mt-52" v-else>
        <h1 class="text-4xl font-semibold leading-10 tracking-tighter text-white font-subheading">
          {{ translate('No_Event') }}
        </h1>
        <a :href="`${$config.baseURL}/scheduler`" class="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium leading-5 text-indigo-700 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200">
          {{ translate('Schedule_Events') }}
        </a>
      </div>
      <div class="flex items-center justify-center w-full px-6 lg:w-1/4">
        <div v-if="event && event.resources">
          <h3 class="text-3xl font-medium leading-10 text-curious-blue-500 font-subheading">
            {{ translate('Activites_Resources') }}
          </h3>
          <a href="/" class="inline-flex px-12 py-2 mt-6 text-lg text-white rounded-full bg-minsk-500 hover:bg-minsk-600" download="" target="_blank">
            {{ translate('Download_All') }}
          </a>
          <ul class="mt-6">
            <li class="flex items-center" v-for="(resource, index) in event.resources" :key="index" >
              <a
              v-if="resource && resource.media_url"
              :href="resource.media_url"
              target="_blank"
              download
              class="inline-flex my-2 text-xl font-normal leading-6 text-center text-curious-blue-500 font-subheading">
                  <span class="mr-3 text-crusta-500">&rsaquo;</span>
                  {{resource.type}}
              </a>
              <a
              v-else-if="resource"
              :href="resource.s4k_url"
              target="_blank"
              class="inline-flex my-2 text-xl font-normal leading-6 text-center text-curious-blue-500 font-subheading">
                  <span class="mr-3 text-crusta-500">&rsaquo;</span>
                  {{resource.type}}
                  <svg class="w-4 h-4 pb-0.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center justify-center w-full px-6 lg:w-1/4 lg:order-first">
        <div class="max-w-sm">
          <h3 class="text-3xl font-semibold leading-tight text-center text-minsk-500">{{ translate('Daily_Discussion') }}</h3>
          <p class="mt-2 text-sm leading-normal">{{ translate('daily_discussion_overview') }}</p>
          <form method="GET" :action="`${$config.baseURL}/${church.slug}/parents`">
            <div class="mt-2">
              <label for="email" class="block text-sm font-medium leading-5 text-gray-700">{{ translate('Email') }}</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <input id="email" type="email" name="email" class="block w-full form-input sm:text-sm sm:leading-5" placeholder="you@example.com" required>
              </div>
            </div>
            <!-- <div class="mt-2 text-center">OR</div>
            <div class="">
              <label for="phone" class="block text-sm font-medium leading-5 text-gray-700">{{ translate('Phone') }}</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <input id="phone" type="tel" class="block w-full form-input sm:text-sm sm:leading-5" placeholder="888-888-8888">
              </div>
            </div> -->
            <div class="flex justify-center">
              <button type="submit" class="inline-flex px-12 py-2 mt-6 text-lg text-white rounded-full bg-minsk-500 hover:bg-minsk-600">
                {{ translate('Sign_Up') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="sticky bottom-0 w-full h-20 overflow-hidden bg-transparent" :style="gradientBackground">
    <div class="absolute top-0 w-full h-40 footer-flow-divider"></div>
  </div>
</div>
</template>

<script>
import { DateTime } from "luxon";
export default {
    async asyncData ({ $axios, $config, params, error }) {
      let data = await $axios.$get(`/church-pages/${params.church}/${params.class}`).catch(e => {
        error({ statusCode: e.response.status, message: e.response.data.message })
      });
      return {
        church: data.team,
        event: data.event,
        grade: data.grade,
        grades: data.grades,
      }
  },
  data: () => ({
    translations: {
      en: {
        Activities_Resources: "Activities + Resources",
        Daily_Discussion: "Daily Discussion",
        daily_discussion_overview: "Daily Discussion questions correspond with the lesson your kids learned the previous Sunday.",
        Download_All: "Download All",
        Email: "Email",
        Lesson_for: "Lesson for",
        Phone: "Phone",
        Theme: "Theme",
        Scripture: "Scripture",
        Sign_Up: "Sign Up",
        No_Event: "No Upcoming Events Scheduled",
        Schedule_Events: "Schedule Events"
      },
      es: {
        Activities_Resources: "Actividades + recursos",
        Daily_Discussion: "Discusión diaria",
        daily_discussion_overview: "Las preguntas de discusión diaria corresponden a la lección que sus hijos aprendieron el domingo anterior.",
        Download_All: "Descargar todo",
        Email: "Email",
        Lesson_for: "Lección para",
        Phone: "Teléfono",
        Theme: "Tema",
        Scripture: "Escritura",
        Sign_Up: "Regístrate",
        No_Event: "No hay eventos próximos programados",
        Schedule_Events: "Schedule Events"
      }
    },
  }),
  head() {
    return {
      title: `${this.church.name} ${this.grade.title} | Children\'s Curriculum`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Resources and activities for parents of ' + this.church.name
        }
      ],
      link: [{ rel: 'icon', href: this.church.photo_url }]
    }
  },
  methods: {
    translate(value){
      var lang = this.event ? this.event.sermon.locale : 'en';
      return this.translations[lang][value];
    },
    getLandingPage() {

    },
    lessonDate(){
      return DateTime.fromSQL(this.event.start_time).toLocaleString(DateTime.DATE_FULL);
    },
  },
  computed: {
    churchUrl(){
        return `/${this.church.slug}`;
    },
    gradientBackground(){
      return "background-image: linear-gradient(60deg,#6f159d 0%,#7eccf0 100%)!important";
    },
    dropdownItems(){
      return this.grades.map(grade => {
        return {
          url: `/${this.church.slug}/${grade.slug}`,
          text: grade.title
        }
      })
    }
  }
};
</script>

<style>
.bottom-flow-divider{
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMjgwIDMuNEMxMDUwLjU5IDE4IDEwMTkuNCA4NC44OSA3MzQuNDIgODQuODljLTMyMCAwLTMyMC04NC4zLTY0MC04NC4zQzU5LjQuNTkgMjguMiAxLjYgMCAzLjRWMTQwaDEyODB6IiBmaWxsLW9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTAgMjQuMzFjNDMuNDYtNS42OSA5NC41Ni05LjI1IDE1OC40Mi05LjI1IDMyMCAwIDMyMCA4OS4yNCA2NDAgODkuMjQgMjU2LjEzIDAgMzA3LjI4LTU3LjE2IDQ4MS41OC04MFYxNDBIMHoiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNMTI4MCA1MS43NmMtMjAxIDEyLjQ5LTI0Mi40MyA1My40LTUxMy41OCA1My40LTMyMCAwLTMyMC01Ny02NDAtNTctNDguODUuMDEtOTAuMjEgMS4zNS0xMjYuNDIgMy42VjE0MGgxMjgweiIvPjwvZz48L3N2Zz4=);
    background-size: 100% 100%;
    z-index: 1;
}
.footer-flow-divider{
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxOTFweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0wIDB2LjQ4QzE4LjYyIDkuMzggMjk3LjgxIDE0MCA2MzkuNSAxNDAgOTkzLjI0IDE0MCAxMjgwIDAgMTI4MCAweiIgZmlsbC1vcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik0wIC42YzE0IDguMjggMTc2LjU0IDk5LjggNTU1LjQ1IDExOS4xNEM5NTIuNDEgMTQwIDEyODAgMCAxMjgwIDBIMHoiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNNzI2LjI5IDEwMS4yQzExMjYuMzYgNzkuOTIgMTI4MSAwIDEyODEgMEgxYy4wNSAwIDMyNS4yNSAxMjIuNDggNzI1LjI5IDEwMS4yeiIvPjwvZz48L3N2Zz4=);
  background-size: 100% 100%;
    z-index: 1;
}
</style>
