<template>
  <NuxtLayout>
    <NuxtPage />
    <NuxtLoadingIndicator :height="5" :color="'#2563eb'" />
    <NuxtRouteAnnouncer />
  </NuxtLayout>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
               Ubuntu, Cantarell, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}
</style>
