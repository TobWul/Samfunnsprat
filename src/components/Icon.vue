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
      <path d="M18.75 2.248a5.954 5.954 0 01-1.558-.229L13.558.981A6 6 0 0011.911.75H7.026a6 6 0 00-5.97 5.4l-.3 5.1a4.5 4.5 0 003.4 4.594l1.455.318a1.5 1.5 0 011.139 1.455V21a2.25 2.25 0 004.5 0v-1.554a7.5 7.5 0 017.5-7.5zM18.75.75h4.5v13.5h-4.5z"/>
    </template>
    <template v-else-if="name === 'upvote'">
      <path d="M5.25 21.751a6 6 0 011.558.23l3.634 1.038a6 6 0 001.647.231h4.885a6 6 0 005.97-5.4l.3-5.1a4.5 4.5 0 00-3.4-4.594l-1.455-.318a1.5 1.5 0 01-1.139-1.456V3a2.25 2.25 0 00-4.5 0v1.554a7.5 7.5 0 01-7.5 7.5zM.75 9.75h4.5v13.5H.75z"/>
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