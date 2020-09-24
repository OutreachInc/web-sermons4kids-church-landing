<template>
<div class="h-screen font-body">
  <div class="relative h-80" :style="gradientBackground">
    <div class="z-10 flex items-center justify-between w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2>
        <NuxtLink :to="churchUrl" class="font-sans text-3xl font-semibold tracking-tight text-white opacity-75">{{ church.title }}</NuxtLink>
      </h2>
      <Dropdown :label="church.grade.title" :items="dropdownItems" class="mt-4"></Dropdown>
    </div>
    <div class="absolute bottom-0 w-full h-10 bottom-flow-divider sm:h-14 md:h-16 lg:h-20 xl:h-24"></div>
  </div>

  <div class="relative z-10 px-4 mx-auto mb-28 max-w-7xl sm:px-6 lg:px-8">
    <div class="flex flex-wrap -mx-6 space-y-8">
      <div class="z-10 w-full px-6 text-center lg:w-1/2" :class="{'-mt-52': !church.video_embed, '-mt-60': !!church.video_embed}">
          <h1 class="text-4xl font-semibold leading-10 tracking-tighter text-white font-subheading">{{ church.sermon.title }}</h1>
          <div class="mt-4 font-sans text-xl font-bold tracking-tight text-white">{{ translate('Lesson_for') }} {{ lessonDate() }}</div>

          <div class="max-w-xl mx-auto mt-8" v-if="church.video_embed">
            <div class="mt-3 mb-5 rounded-lg shadow-lg embed-responsive aspect-ratio-16/9">
              <iframe class="embed-responsive-item" :src="church.video_embed" allowfullscreen></iframe>
            </div>
          </div>

          <div :class="{'mt-40': !church.video_embed, 'mt-10': !!church.video_embed}">
            <h3 class="text-2xl font-medium text-curious-blue-500">{{ translate('Theme') }}</h3>
            <p class="text-xl text-gray-600">{{ church.sermon.theme }}</p>
          </div>
          <div class="mt-6">
            <h3 class="text-2xl font-medium text-curious-blue-500">{{ translate('Scripture') }}</h3>
            <p class="text-xl text-gray-600">{{ church.sermon.scripture }}</p>
          </div>
          <resource-video-player
            v-if="church.video_lesson"
            :video="church.video_lesson"
            class="max-w-xl mx-auto mt-12"
          ></resource-video-player>
      </div>
      <div class="flex items-center justify-center w-full px-6 lg:w-1/4">
        <div>
          <h3 class="text-3xl font-medium leading-10 text-curious-blue-500 font-subheading">
            {{ translate('Activites_Resources') }}
          </h3>
          <a href="/" class="inline-flex px-12 py-2 mt-6 text-lg text-white rounded-full bg-minsk-500 hover:bg-minsk-600" download="" target="_blank">
            {{ translate('Download_All') }}
          </a>
          <ul class="mt-6">
            <li class="flex items-center my-4" v-for="resource in church.resources" :key="resource.id">
              <a
              :href="resource.s4k_url"
              target="_blank"
              class="flex-initial text-xl font-normal leading-6 text-center text-curious-blue-500 font-subheading">
                  <span class="mr-2 text-crusta-500">&rsaquo;</span>
                  {{resource.type}}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center justify-center w-full px-6 lg:w-1/4 lg:order-first">
        <div class="max-w-sm">
          <h3 class="text-3xl font-semibold leading-tight text-center text-minsk-500">{{ translate('Daily_Discussion') }}</h3>
          <p class="mt-2 text-sm leading-normal">{{ translate('daily_discussion_overview') }}</p>
          <div class="mt-2">
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">{{ translate('Email') }}</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input id="email" type="email" class="block w-full form-input sm:text-sm sm:leading-5" placeholder="you@example.com">
            </div>
          </div>
          <div class="mt-2 text-center">OR</div>
          <div class="">
            <label for="phone" class="block text-sm font-medium leading-5 text-gray-700">{{ translate('Phone') }}</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input id="phone" type="tel" class="block w-full form-input sm:text-sm sm:leading-5" placeholder="888-888-8888">
            </div>
          </div>
          <div class="flex justify-center">
          <a href="/" class="inline-flex px-12 py-2 mt-6 text-lg text-white rounded-full bg-minsk-500 hover:bg-minsk-600" target="_blank">
            {{ translate('Sign_Up') }}
          </a>
          </div>
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
    asyncData: ({ $config, params }) => ({
        churchSlug: params.church,
        classSlug: params.class,
        baseURL: $config.baseURL,
    // return { churchSlug, classSlug, baseURL };
  }),
  async fetch() {
    this.church = this.getLandingPage();
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
      }
    },
    church: {},
  }),

  methods: {
    translate(value){
      return this.translations[this.church.sermon.locale][value];
    },
    getLandingPage() {

        fetch(`${this.$config.apiURL}/api/v1/church-page${this.$route.path}`)
            .then(response => response.json())
            .then(response => this.church = response.data)
            .catch(e => {
                error({ statusCode: 404, message: 'Church class not found' })
            });

      return {
          id: 33,
          title: "odit eos natus",
          start_time: "2020-10-15 09:12:00",
          grade: {
            id: 93,
            title: "Preschool",
          },
          grades: [
            {
              id: 93,
              title: "Preschool",
              slug: "preschool"
            },
            {
              id: 94,
              title: "1st-2nd Grade",
              slug: "1st-2nd-grade",
            },
            {
              id: 95,
              title: "3rd-4th Grade",
              slug: "3rd-4th-grade",
            },
          ],
          teachers: [
            {
              id: 2705,
              name: "Norma Johnson",
              email: "pastor.norma01@gmail.com",
              church_role: null,
            },
          ],
          sermon: {
            id: 9,
            locale: 'en',
            title: "A Bride for Isaac",
            theme: "Some random theme title",
            s4k_url: "https://web-sermons4kids.test/bride_for_isaac.htm",
            verses: [
              {
                verse: "Genesis 24:1-67",
              },
            ],
            scripture: "Genesis 24:67",
          },
          video_embed: "https://www.youtube.com/embed/eW7Twd85m2g", // nullable
          video_lesson: {
            title: 'Water From A Rock',
            thumb_url: 'https://sermons4kids.s3.amazonaws.com/13742/conversions/Agua-de-una-roca-thumb.jpg',
            video_url: 'https://sermons4kids.s3.amazonaws.com/13741/Water-From-A-Rock.mp4',
          },
          resources: [
            {
              id: 684,
              type: "Group Activities",
              s4k_url:
                "https://web-sermons4kids.test/bride_for_isaac_group_activities.htm",
            },
            {
              id: 685,
              type: "Crossword",
              s4k_url:
                "https://web-sermons4kids.test/bride_for_isaac_crossword.htm",
            },
            {
              id: 686,
              type: "Decoder",
              s4k_url:
                "https://web-sermons4kids.test/bride_for_isaac_decoder.htm",
            },
            {
              id: 687,
              type: "Word Search",
              s4k_url:
                "https://web-sermons4kids.test/bride_for_isaac_wordsearch.htm",
            },
            {
              id: 1458,
              type: "Coloring Page",
              s4k_url: "https://web-sermons4kids.test/isaac_rebekah_colorpg",
            },
            {
              id: 1670,
              type: "Worship Bulletin",
              s4k_url: "https://web-sermons4kids.test/bride_for_isaac_bulletin",
            },
            {
              id: 3828,
              type: "Handout",
              s4k_url:
                "https://web-sermons4kids.test/find-the-bride-dot-handout",
            },
            {
              id: 3829,
              type: "Video Instruction",
              s4k_url:
                "https://web-sermons4kids.test/a-bride-for-isaac-how-to-video",
            },
            {
              id: 3830,
              type: "Video Lesson",
              s4k_url: "https://web-sermons4kids.test/a-bride-for-isaac",
            },
            {
              id: 3831,
              type: "Full Elementary Lesson Plan",
              s4k_url:
                "https://web-sermons4kids.test/a-bride-for-isaac-elementary-lesson",
            },
            {
              id: 3832,
              type: "Full Preschool Lesson Plan",
              s4k_url:
                "https://web-sermons4kids.test/a-bride-for-isaac-preschool-lesson",
            },
            {
              id: 3834,
              type: "Daily Discussion",
              s4k_url:
                "https://web-sermons4kids.test/a-bride-for-isaac-daily-discussion",
            },
          ],
        };
    },
    lessonDate(){
      return DateTime.fromSQL(this.church.start_time).toLocaleString(DateTime.DATE_FULL);
    },
  },
  computed: {
    churchUrl(){
        return `/${this.churchSlug}`;
    },
    gradientBackground(){
      return "background-image: linear-gradient(60deg,#6f159d 0%,#7eccf0 100%)!important";
    },
    dropdownItems(){
      return this.church.grades.map(grade => {
        return {
          url: `/${this.churchSlug}/${grade.slug}`,
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
