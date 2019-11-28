<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size ? size : '24'"
    :height="size ? size : '24'"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    :stroke-width="strokeWidth"
    :stroke="color"
  >
    <template v-if="name === 'attachment'">
      <path
        d="M23.25 9.9L12.273 20.878a6.75 6.75 0 0 1-9.546-9.546l9.016-9.015a4.5 4.5 0 1 1 6.363 6.363L9.091 17.7a2.25 2.25 0 0 1-3.182-3.181L14.925 5.5"
      />
    </template>
    <template v-else-if="name === 'vedtatt'">
      <path d="M15.75 9.749l-3.981 5.308a.75.75 0 01-1.13.08L8.25 12.749" />
      <path
        d="M10.73 1.357a1.63 1.63 0 012.54 0l1.512 1.881a1.629 1.629 0 001.446.6l2.4-.261a1.63 1.63 0 011.8 1.8l-.261 2.4a1.629 1.629 0 00.6 1.446l1.881 1.512a1.63 1.63 0 010 2.54l-1.887 1.505a1.632 1.632 0 00-.6 1.447l.261 2.4a1.629 1.629 0 01-1.8 1.8l-2.4-.261a1.628 1.628 0 00-1.446.6L13.27 22.64a1.629 1.629 0 01-2.54 0l-1.511-1.88a1.631 1.631 0 00-1.447-.6l-2.4.261a1.628 1.628 0 01-1.8-1.8l.261-2.4a1.631 1.631 0 00-.6-1.447l-1.88-1.511a1.629 1.629 0 010-2.54l1.88-1.512a1.628 1.628 0 00.6-1.446l-.261-2.4a1.629 1.629 0 011.8-1.8l2.4.261a1.632 1.632 0 001.447-.6z"
      />
    </template>
    <template v-else-if="name === 'close'">
      <circle class="a" cx="12" cy="11.999" r="11.25" />
      <path d="M7.5 16.499l9-9M16.5 16.499l-9-9" />
    </template>
    <template v-else-if="name === 'back'">
      <path d="M23.25 12.497H.75M4.5 16.247l-3.75-3.75 3.75-3.75" />
    </template>
    <template v-else-if="name === 'downvote'">
      <path
        d="M18.75 2.248a5.954 5.954 0 01-1.558-.229L13.558.981A6 6 0 0011.911.75H7.026a6 6 0 00-5.97 5.4l-.3 5.1a4.5 4.5 0 003.4 4.594l1.455.318a1.5 1.5 0 011.139 1.455V21a2.25 2.25 0 004.5 0v-1.554a7.5 7.5 0 017.5-7.5zM18.75.75h4.5v13.5h-4.5z"
      />
    </template>
    <template v-else-if="name === 'upvote'">
      <path
        d="M5.25 21.751a6 6 0 011.558.23l3.634 1.038a6 6 0 001.647.231h4.885a6 6 0 005.97-5.4l.3-5.1a4.5 4.5 0 00-3.4-4.594l-1.455-.318a1.5 1.5 0 01-1.139-1.456V3a2.25 2.25 0 00-4.5 0v1.554a7.5 7.5 0 01-7.5 7.5zM.75 9.75h4.5v13.5H.75z"
      />
    </template>
    <template v-else-if="name === 'pending'">
      <path d="M6 .75a1.5 1.5 0 00-1.5 1.5v2.367a7.5 7.5 0 0015 0V2.25A1.5 1.5 0 0018 .75z" />
      <path
        class="a"
        d="M6 23.25a1.5 1.5 0 01-1.5-1.5v-2.367a7.5 7.5 0 0115 0v2.367a1.5 1.5 0 01-1.5 1.5zM5.477 8.25h13.046"
      />
      <path d="M18.548 23.147C17.264 20.451 14.813 18 12 18s-5.264 2.451-6.548 5.147" />
    </template>
    <template v-else-if="name === 'user'">
      <circle cx="12" cy="12" r="11.25" />
      <path
        d="M7.5 17.007a6.68 6.68 0 009 0M6.75 6.75V9M17.25 6.75V9M12 6.75V12a1.5 1.5 0 01-1.5 1.5h-.75"
      />
    </template>
    <template v-else-if="name === 'checkbox_check'">
      <path class="a" d="M6 13.223L8.45 16.7a1.049 1.049 0 001.707.051L18 6.828" />
      <rect class="rect" x=".75" y=".749" width="22.5" height="22.5" rx="1.5" ry="1.5" />
    </template>
    <template v-else-if="name === 'checkbox_uncheck'">
      <rect class="rect" x=".75" y=".749" width="22.5" height="22.5" rx="1.5" ry="1.5" />
    </template>
    <template v-else-if="name === 'new_issue'">
      <path class="a" d="M8.492 11.265l-1.06 4.243 4.242-1.061 6.364-6.364-3.182-3.182-6.364 6.364zM21.751 4.371l1.06 1.06a1.5 1.5 0 010 2.122l-3.311 3.31"/><path class="a" d="M18.038 8.083l3.713-3.712a1.5 1.5 0 000-2.122l-1.061-1.06a1.5 1.5 0 00-2.121 0L14.856 4.9"/><path class="a" d="M20.251 13.5v3.128a1.5 1.5 0 01-.44 1.061L14.69 22.81a1.5 1.5 0 01-1.061.44H2.25a1.5 1.5 0 01-1.5-1.5V2.25a1.5 1.5 0 011.5-1.5H13.5"/><path class="a" d="M14.251 23.115V18.75a1.5 1.5 0 011.5-1.5h4.365"/>
    </template>
    <template v-else-if="name === 'social-google'">
      <path class="cls-1" d="M18.1 14.7h-4.63v-4.17h9.78v2.06a11.27 11.27 0 11-3-8.29l-3.4 3.13A6.61 6.61 0 0012 5.33a6.67 6.67 0 106.1 9.37zM6.18 8.71L2.59 5.84M6.19 15.32l-3.44 3.1M15.92 17.39l3.07 3.45"/>
    </template>
    <template v-else-if="name === 'social-facebook'">
      <path d="M12.15 23.25H1.75a1 1 0 01-1-1V1.75a1 1 0 011-1h20.5a1 1 0 011 1v20.5a1 1 0 01-1 1h-6.1v-8.5h2.56a.5.5 0 00.5-.44l.38-3a.5.5 0 00-.5-.56h-2.94V9.69A1.69 1.69 0 0117.84 8h1.81a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-1.81a5.69 5.69 0 00-5.69 5.69v1.06h-2.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h2.5v8.5z" />
    </template>
    <template v-else-if="name === 'social-twitter'">
      <path d="M23.18 6.71l-2.1-.9 1.1-2.4-2.56.85a4.47 4.47 0 00-3-1.2 4.51 4.51 0 00-4.5 4.5v1c-3.54.73-6.63-1.2-9.5-4.5q-.75 4 1.5 6l-3.29-.5a4.55 4.55 0 004.25 4l-2.75 1c1 2 2.82 2.31 5.25 2.5a11.52 11.52 0 01-6.75 2c12.76 5.67 20.25-2.66 20.25-10v-.83z" />
    </template>
    <template v-else-if="name === 'email'">
      <rect class="a" x=".75" y="4.5" width="22.5" height="15" rx="1.5" ry="1.5"/><path class="a" d="M15.687 9.975L19.5 13.5M8.313 9.975L4.5 13.5M22.88 5.014l-9.513 6.56a2.406 2.406 0 01-2.734 0L1.12 5.014"/>
    </template>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    strokeWidth: {
      default: 1.5,
      type: Number
    },
    color: {
      default: 'currentColor',
      type: String
    },
    size: {
      default: 24,
      type: Number
    }
  },
  computed: {
    path() {
      return icons[this.name];
    }
  }
};
</script>