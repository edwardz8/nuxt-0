<script setup>
const props = defineProps({
  likes: {
    type: Array,
    default: [],
  },
  userId: {
    type: Number,
    default: undefined,
  },
  starship: Object,
  vehicle: Object,
});

/*
 *** only url is present and no ID, we have to get an id from url
 */
const getId = (url) => {
  try {
    const arr = url.split("/");
    return arr[arr.length - 2];
  } catch (error) {
    return "";
  }
};

/* Likes Count */
const likesCount = computed(() => {
  return props.likes.length;
});

/* if a user has liked an item or not */
const userLike = computed(() => {
  return props.likes.find((like) => like.userId === props.userId);
});

const isLiked = computed(() => {
  if (!props.userId) return false;
  const index = props.likes.findIndex((like) => {
    return like.userId === props.userId;
  });
  return index > -1 ? true : false;
});

/* Emit Like Item and Unlike Item Events */
const emit = defineEmits(["like-item", "unlike-item", "show-item"]);

function likeItem(id) {
  emit("like-item", id);
}

function unlikeItem(id, itemId) {
  emit("unlike-item", { id, itemId });
}

function showSidebar(id) {
  emit("show-item", id);
}
</script>

<template>
  <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-900/[.7]"
  >
    <template v-if="starship">
      <button
        v-if="isLiked"
        @click="unlikeItem(userLike.id, getId(starship.url))"
        :disabled="!props.userId"
        class="text-sm mt-1 py-2 px-2 inline-flex justify-center items-center gap-2 font-semibold text-blue-500 hover:text-gray-300"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21C8.38661 17.7733 2 13.7597 2 8.3951C2 5.37384 4.42 3 7.5 3C9.24 3 10.91 3.74441 12 5C13.09 3.74441 14.76 3 16.5 3C19.58 3 22 5.37384 22 8.3951C22 13.751 15.6214 17.7907 12 21Z"
            fill="#2F80ED"
          />
        </svg>
        <span>{{ likesCount }} Likes</span>
      </button>
      <button
        v-else
        type="button"
        :disabled="!props.userId"
        @click="likeItem(getId(starship.url))"
        class="text-sm mt-1 py-2 px-2 inline-flex justify-center items-center gap-2 font-semibold text-gray-400 hover:text-gray-300"
      >
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 2C9.66042 1.60884 9.26455 1.26729 8.82781 0.982401C7.86267 0.352837 6.69792 0 5.5 0C2.42 0 0 2.37384 0 5.3951C0 6.46861 0.255742 7.48801 0.693829 8.45784C2.0526 11.4686 5.16576 14.0093 7.8455 16.1963C8.61699 16.8259 9.35256 17.4262 10 18C10.6474 17.4262 11.383 16.8259 12.1545 16.1963C14.8342 14.0093 17.9473 11.4687 19.3061 8.458C19.7442 7.48813 20 6.46866 20 5.3951C20 2.37384 17.58 0 14.5 0C13.3021 0 12.1373 0.352837 11.1722 0.982401C10.7354 1.26729 10.3396 1.60884 10 2ZM10 15.3699C10.3228 15.1024 10.6527 14.8326 10.9822 14.5633C11.2612 14.3351 11.5399 14.1073 11.8136 13.8813C12.9091 12.9769 13.9814 12.058 14.9309 11.095C16.106 9.90333 16.9793 8.75632 17.4879 7.62419C17.8233 6.8767 18 6.13633 18 5.3951C18 3.51455 16.5119 2 14.5 2C13.3116 2 12.2025 2.51373 11.5103 3.31111L10 5.05084L8.48971 3.31111C7.79748 2.51373 6.68843 2 5.5 2C3.48808 2 2 3.51455 2 5.3951C2 6.13633 2.17674 6.8767 2.51214 7.62419C3.02069 8.75633 3.89402 9.90333 5.06909 11.095C6.01864 12.058 7.09095 12.9769 8.18643 13.8813C8.46009 14.1073 8.73877 14.3351 9.01783 14.5633C9.34727 14.8326 9.67722 15.1024 10 15.3699Z"
            fill="#222B45"
          />
        </svg>
        <span>{{ likesCount }} Likes</span>
      </button>
    </template>
    <!-- vehicle likes -->
    <div v-else>
      <button
        v-if="isLiked"
        @click="unlikeItem(userLike.id, getId(vehicle.url))"
        :disabled="!props.userId"
        class="text-sm mt-1 py-2 px-2 inline-flex justify-center items-center gap-2 font-semibold text-blue-500 hover:text-gray-300"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21C8.38661 17.7733 2 13.7597 2 8.3951C2 5.37384 4.42 3 7.5 3C9.24 3 10.91 3.74441 12 5C13.09 3.74441 14.76 3 16.5 3C19.58 3 22 5.37384 22 8.3951C22 13.751 15.6214 17.7907 12 21Z"
            fill="#2F80ED"
          />
        </svg>
        <span>{{ likesCount }} Likes</span>
      </button>
      <button
        v-else
        type="button"
        :disabled="!props.userId"
        @click="likeItem(getId(vehicle.url))"
        class="text-sm mt-1 py-2 px-2 inline-flex justify-center items-center gap-2 font-semibold text-gray-400 hover:text-gray-300"
      >
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 2C9.66042 1.60884 9.26455 1.26729 8.82781 0.982401C7.86267 0.352837 6.69792 0 5.5 0C2.42 0 0 2.37384 0 5.3951C0 6.46861 0.255742 7.48801 0.693829 8.45784C2.0526 11.4686 5.16576 14.0093 7.8455 16.1963C8.61699 16.8259 9.35256 17.4262 10 18C10.6474 17.4262 11.383 16.8259 12.1545 16.1963C14.8342 14.0093 17.9473 11.4687 19.3061 8.458C19.7442 7.48813 20 6.46866 20 5.3951C20 2.37384 17.58 0 14.5 0C13.3021 0 12.1373 0.352837 11.1722 0.982401C10.7354 1.26729 10.3396 1.60884 10 2ZM10 15.3699C10.3228 15.1024 10.6527 14.8326 10.9822 14.5633C11.2612 14.3351 11.5399 14.1073 11.8136 13.8813C12.9091 12.9769 13.9814 12.058 14.9309 11.095C16.106 9.90333 16.9793 8.75632 17.4879 7.62419C17.8233 6.8767 18 6.13633 18 5.3951C18 3.51455 16.5119 2 14.5 2C13.3116 2 12.2025 2.51373 11.5103 3.31111L10 5.05084L8.48971 3.31111C7.79748 2.51373 6.68843 2 5.5 2C3.48808 2 2 3.51455 2 5.3951C2 6.13633 2.17674 6.8767 2.51214 7.62419C3.02069 8.75633 3.89402 9.90333 5.06909 11.095C6.01864 12.058 7.09095 12.9769 8.18643 13.8813C8.46009 14.1073 8.73877 14.3351 9.01783 14.5633C9.34727 14.8326 9.67722 15.1024 10 15.3699Z"
            fill="#222B45"
          />
        </svg>
        <span>{{ likesCount }} Likes</span>
      </button>
    </div>
    <div class="p-4 md:p-5">
      <h3 v-if="starship" class="text-lg font-bold text-gray-800 dark:text-orange-200">
        {{ starship.name }}
      </h3>
      <h3 v-else class="text-lg font-bold text-gray-800 dark:text-orange-200">
        {{ vehicle.name }}
      </h3>
      <p v-if="starship" class="mt-1 text-gray-800 dark:text-gray-400">
        Model: {{ starship.model }}
        <br />
      </p>
      <p v-else class="mt-1 text-gray-800 dark:text-gray-400">
        Model: {{ vehicle.model }}
        <br />
      </p>
      <p v-if="starship" class="mt-1 text-gray-800 dark:text-gray-400">
        Manufacturer: {{ starship.manufacturer }}
        <br />
      </p>
      <p v-else class="mt-1 text-gray-800 dark:text-gray-400">
        Manufacturer: {{ vehicle.manufacturer }}
        <br />
      </p>
      <p v-if="starship" class="mt-1 text-gray-800 dark:text-gray-400">
        Capacity: {{ starship.cargo_capacity }}
        <br />
      </p>
      <p v-else class="mt-1 text-gray-800 dark:text-gray-400">
        Capacity: {{ vehicle.cargo_capacity }}
        <br />
      </p>
      <p v-if="starship" class="mt-1 text-gray-800 dark:text-gray-400">
        Class: {{ starship.starship_class }}
        <br />
      </p>
      <p v-else class="mt-1 text-gray-800 dark:text-gray-400">
        Class: {{ vehicle.vehicle_class }}
        <br />
      </p>
      <div class="flex">
        <NuxtLink
          v-if="starship"
          class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          :to="`/starships/` + getId(starship.url)"
        >
          View Starship
        </NuxtLink>
        <NuxtLink
          v-else
          class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          :to="`/vehicles/` + getId(vehicle.url)"
        >
          View Vehicle
        </NuxtLink>

        <button
          v-if="starship"
          class="top-2 rounded-md mt-4 ml-2 py-2 px-2 cursor-pointer flex bg-orange-500 hover:text-gray-700 text-white hover:bg-gray-100 focus:outline-none"
          data-hs-overlay="#player-sidebar"
          @click="showSidebar(getId(starship.url))"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
