<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  starship: {},
  vehicle: {},
  userId: {
    type: Number,
  },
  name: {
    type: String,
  },
  model: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  cargo_capacity: {
    type: String,
  },
  starship_class: {
    type: String,
  },
  vehicle_class: {
    type: String,
  },
  cost_in_credits: {
    type: String,
  },
  crew: {
    type: String,
  },
  passengers: {
    type: String,
  },
  hyperdrive_rating: {
    type: String,
  },
});

/* Likes Count */
const likesCount = computed(() => {
  return props.likes.length;
});

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
const emit = defineEmits(["like-item", "unlike-item"]);

function likeItem(id) {
  emit("like-item", id);
}

function unlikeItem(id, itemId) {
  emit("unlike-item", { id, itemId });
}

const getId = (url) => {
  try {
    const arr = url.split("/");
    return arr[arr.length - 2];
  } catch (error) {
    return "";
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-900/[.7]"
  >
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-orange-200">
        {{ props.name }}
      </h3>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Model: {{ props.model }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Manufacturer: {{ props.manufacturer }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Capacity: {{ props?.cargo_capacity }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Class: {{ props?.starship_class }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Class: {{ props?.vehicle_class }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Rating: {{ props?.hyperdrive_rating }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Cost: {{ props.cost_in_credits }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Crew #: {{ props.crew }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Passenger #: {{ props.passengers }}
        <br />
      </p>
    </div>
  </div>
</template>
