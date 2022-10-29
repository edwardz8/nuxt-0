<script setup>
import { Popover, PopoverPanel } from "@headlessui/vue";
import { useState } from "#app";

const user = useState("user");
</script>

<template>
  <div class="relative overflow-hidden bg-white">
    <div class="mx-auto max-w-7xl">
      <div
        class="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32"
      >
        <svg
          class="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <Popover>
          <div class="relative px-4 pt-6 sm:px-6 lg:px-8">
            <nav
              class="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div class="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                <div class="flex w-full items-center justify-between md:w-auto">
                  <a href="#">
                    <span class="sr-only">Star Wars Directory</span>
                    <!-- <img alt="Your Company" class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600" /> -->
                  </a>
                </div>
              </div>
              <!--  <div class="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                  <a href="#" class="font-medium text-orange-600 hover:text-orange-500">Log in</a>
                </div> -->
            </nav>
          </div>

          <transition
            enter-active-class="duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <PopoverPanel
              focus
              class="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
            >
              <div
                class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5"
              >
                <div class="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img
                      class="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
                      alt=""
                    />
                  </div>
                </div>
                <a
                  href="#"
                  class="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-orange-600 hover:bg-gray-100"
                  >Log in</a
                >
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <main
          class="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
        >
          <div class="sm:text-center lg:text-left">
            <h1
              class="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block xl:inline">Star Wars Directory</span>
              {{ " " }}
              <span class="block text-orange-700 xl:inline"
                >Made possible by swapi.dev</span
              >
            </h1>
            <p
              class="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0"
            >
              May the force be with you...
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <NuxtLink to="/starships">
                <div class="rounded-md shadow mt-2 mr-2">
                  <a
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-700 px-6 py-2 text-base font-medium text-white hover:bg-orange-500 md:py-2 md:px-6 md:text-lg"
                    >View Ships</a
                  >
                </div>
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
        src="https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt=""
      />
    </div>
  </div>
</template>
