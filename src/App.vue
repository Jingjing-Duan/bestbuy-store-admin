<template>
  <div class="app-shell">
    <header class="topbar">
      <h1>Best Buy Store Admin</h1>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
  .app-shell {
    min-height: 100vh;
    background: #fff;
    font-family: Arial, sans-serif;
  }

  .topbar {
    background: #000;
    color: #ffe000;
    padding: 16px 24px;
  }

  .topbar h1 {
    margin: 0;
    font-size: 22px;
  }

  .main-content {
    padding: 20px 24px;
  }
</style>