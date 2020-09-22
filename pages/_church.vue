<template>
<div class="h-screen">
  <div class="relative h-80" :style="gradientBackground">
    <div class="flex justify-between items-center w-full z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl text-white">
        <NuxtLink :to="slug" class="text-white">{{ church.title }}</NuxtLink>
      </h2>
      <Dropdown :label="church.grade.title" :items="dropdownItems" class="mt-4"></Dropdown>
    </div>
    <div class="absolute bottom-flow-divider bottom-0 h-10 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-full"></div>
  </div>

  <div class="flex flex-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center lg:w-1/2 w-full z-10 -mt-60">
        <h1 class="text-3xl font-bold text-white">{{ church.sermon.title }}</h1>
        <div>Lesson for {{date()}}</div>
        <div>
          Video Player
        </div>
        <div>
          <div>{{ church.sermon.scripture }}</div>
          <div></div>
        </div>
    </div>
    <div class="flex items-center justify-center lg:w-1/4 w-full">
      <div>
        <h3 class="text-3xl font-medium leading-10 text-curious-blue-500 font-subheading">Activites + Resources</h3>
        <a href="/" class="inline-flex px-12 py-2 mt-6 text-lg text-white rounded-full bg-minsk-500 hover:bg-minsk-600" download="" target="_blank">
          Download All
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
    <div class="flex items-center justify-center lg:w-1/4 lg:order-first w-full">
      <div class="max-w-sm">
        <h3>Daily Discussion</h3>
        <p>Daily Discussion questions correspond with the lesson your kids learned the previous Sunday.</p>
        <div class="mt-2">
          <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input id="email" type="email" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="you@example.com">
          </div>
        </div>
        <div class="text-center mt-2">OR</div>
        <div class="">
          <label for="phone" class="block text-sm font-medium leading-5 text-gray-700">Phone</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input id="phone" type="tel" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="888-888-8888">
          </div>
        </div>
        <div class="flex justify-center">
        <a href="/" class="inline-flex px-12 py-2 mt-6 text-lg text-white rounded-full bg-minsk-500 hover:bg-minsk-600" target="_blank">
          Sign Up
        </a>
        </div>
      </div>
    </div>
  </div>
  <div class="sticky bottom-0 h-20 w-full" :style="gradientBackground"></div>
</div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue";
export default {
  async asyncData({ params }) {
    const slug = params.church;
    return { slug };
  },
  async fetch() {
    this.church = this.getLandingPage().data;
  },
  components: {
    Dropdown
  },
  data: () => ({
    church: {},
  }),

  methods: {
    getLandingPage() {
      return {
        data: {
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
            title: "A Bride for Isaac",
            s4k_url: "https://web-sermons4kids.test/bride_for_isaac.htm",
            verses: [
              {
                verse: "Genesis 24:1-67",
              },
            ],
            scripture: "Genesis 24:67",
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
        },
      };
    },
    date(){
      return new Date(this.church.start_time).toLocaleDateString();
    },
  },
  computed: {
    gradientBackground(){
      return "background-image: linear-gradient(60deg,#6f159d 0%,#7eccf0 100%)!important";
    },
    dropdownItems(){
      return this.church.grades.map(grade => {
        return {
          url: `${this.slug}/${grade.slug}`,
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
</style>
