<script setup lang="ts">
</script>

<!-- or we can turn off layout for index.page -->
<template>
  <div class="layout">
    <!-- <header class="header">
      <h1>Портал новостей</h1>
    </header> -->

    <main class="main">
      <slot /> <!-- страницы -->
    </main>

    <!-- <footer class="footer">
      <p>© 2025 Новостной портал. Все права защищены.</p>
    </footer> -->
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: #2563eb;
  color: white;
  padding: 1rem 2rem;
}

.nav {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background: #1e40af;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
