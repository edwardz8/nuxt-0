<template>
  <div class="container mx-auto mt-6">
    <div class="gap-3 px-4">
      <solo-card
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
      />
    </div>
  </div>
</template>

<script setup>
import { getUserLikes, addUserLike, removeUserLike } from "~/composables/useLike";

const route = useRoute();
const user = useState("user");

const item = ref(null);
const itemLikes = ref(null);

const { data: ship } = await useFetch(
  `https://swapi.dev/api/starships/${route.params.id}`
);

/* const itemIds = [...data.value.results[0]].map((item) => {
  return item.id;
});
itemLikes.value = await getUserLikes(itemIds.toString()); */

/* METHODS */

async function likeItem(id) {
  if (!user.value) return useRouter().push("/login");
  try {
    const like = await addUserLike({ itemId: id, userId: user.value.id });
    if (itemLikes.value[id]) {
      itemLikes.value[id].push({ ...like });
    } else {
      itemLikes.value[id] = [{ ...like }];
    }
  } catch (error) {
    console.log(error);
  }
}

async function unlikeItem({ id, itemId }) {
  try {
    await removeUserLike(id);
    const index = itemLikes.value[itemId].findIndex((like) => like.id === id);
    itemLikes.value[itemId].splice(index, 1);
  } catch (error) {
    console.log(error);
  }
}

async function showItem(id) {
  item.value = null;
  const res = await Promise.all([
    useFetch(`https://swapi.dev/api/starships/${route.params.id}`),
  ]);
  console.log(item.value, "item");
  item.value = {
    ...res[0].data.value[0],
  };
}
</script>
