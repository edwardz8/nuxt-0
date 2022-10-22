<template>
  <div>
    <SiteHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "~/composables/useAuth";

await useUser();
</script>
