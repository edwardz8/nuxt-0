<script setup>
const results = ref({});
const count = ref("");
const perPage = ref(6);
const page = ref(1);
const loadingNext = ref(false);
const loadingPrev = ref(false);

const { data } = await useFetch("https://swapi.dev/api/starships");
results.value = data.value.results;
count.value = data.value.count;

const fetchPage = async (p) => {
  if (p > page.value) loadingNext.value = true;
  else loadingPrev.value = true;

  try {
    const { data } = await useFetch("https://swapi.dev/api/starships?page=" + p, {
      initialCache: false,
    });
    page.value = p;
    results.value = data.value.results;
  } catch (error) {
    console.log(error);
  } finally {
    loadingNext.value = false;
    loadingPrev.value = false;
  }
};

const showNextPage = computed(() => {
  return Math.floor(count.value / (page.value * perPage.value));
});
</script>

<template>
<!-- <pre>{{ results }}</pre> -->
  <div class="container mx-auto mt-6">
    <!-- pagination -->
    <div class="flex justify-between gap-4 py-4 px-4">
      <a
        href="#"
        :disabled="page === 1"
        @click="fetchPage(page - 1)"
        :class="[
          page === 1 ? 'border-gray-300 text-gray-500' : 'text-gray-800 border-gray-500',
        ]"
        class="relative items-center border rounded bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 md:inline-flex"
      >
        <svg
          v-if="loadingPrev"
          aria-hidden="true"
          class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span v-else>Previous</span>
      </a>

      <NuxtLink to="/">
        <div class="rounded-md shadow">
          <a
            href="#"
            class="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-3 text-base font-medium text-white hover:bg-orange-800 md:py-2 md:px-6 md:text-lg"
          >
            Home</a
          >
        </div>
      </NuxtLink>

      <a
        href="#"
        :disabled="showNextPage === 0"
        :class="[
          showNextPage === 0
            ? 'border-gray-300 text-gray-500'
            : 'text-gray-800 border-gray-500',
        ]"
        class="relative items-center border rounded bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 md:inline-flex"
        @click="fetchPage(page + 1)"
      >
        <svg
          v-if="loadingNext"
          aria-hidden="true"
          class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span v-else>Next </span>
      </a>
    </div>

    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-4">
      <Card
        v-for="ship in results"
        @like-item="likeItem"
        @unlike-item="unlikeItem"
        :starship="ship"
        :key="ship.name"
      />
    </div>
  </div>
</template>
