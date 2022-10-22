<template>
  <div class="container mx-auto mt-6">
    <div class="gap-3 px-4">
      <ship-card
        v-if="ship"
        :name="ship.name"
        :model="ship.model"
        :manufacturer="ship.manufacturer"
        :cargo_capacity="ship.cargo_capacity"
        :starship_class="ship.starship_class"
        :cost_in_credits="ship.cost_in_credits"
        :crew="ship.crew"
        :passengers="ship.passengers"
        :hyperdrive_rating="ship.hyperdrive_rating"
        :likes="itemLikes"
        :userId="user.id"
        :id="getId(ship.url)"
        @unlike-item="unlikeItem"
        @like-item="likeItem"
      />
    </div>
  </div>
</template>

<script setup>
import { getUserLikes, addUserLike, removeUserLike } from "~/composables/useLike";
import { useUser } from "@/composables/useAuth";

const route = useRoute();

const user = await useUser();

const itemLikes = ref([]);

const loading = ref(false);
loading.value = true;

const { data: ship } = await useFetch(
  `https://swapi.dev/api/starships/${route.params.id}`
);

/* METHODS */

/* get id based on url */
const getId = (url) => {
  try {
    const arr = url.split("/");
    return arr[arr.length - 2];
  } catch (error) {
    return "";
  }
};

/* get likes */
const getLikes = async () => {
  const likes = await getUserLikes(route.params.id);
  itemLikes.value = Object.values(likes)[0] || [];
  loading.value = false;
};

await getLikes();

/* like item based on user */
async function likeItem(id) {
  // if (!user.value) return useRouter().push("/login");
  try {
    const like = await addUserLike({
      itemId: id,
      userId: user.value.id,
    });
    itemLikes.value.push({ ...like });
  } catch (error) {
    console.log(error);
  }
}

/* unlike item based on user */
async function unlikeItem({ id, itemId }) {
  try {
    await removeUserLike(id);
    const index = itemLikes.value.findIndex((like) => like.id === id);
    itemLikes.value.splice(index, 1);
  } catch (error) {
    console.log(error);
  }
}
</script>
