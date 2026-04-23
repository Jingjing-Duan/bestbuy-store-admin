<template>
  <div class="app-shell">
    <header class="topbar">
      <h1>Best Buy Store Admin</h1>
      <nav class="nav-links">
        <router-link to="/products">Products</router-link>
        <router-link to="/makeline">Makeline</router-link>
      </nav>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.topbar h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.nav-links a {
  color: #ffe000;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
}

.nav-links a:hover {
  border-color: #ffe000;
}

.nav-links a.router-link-active {
  background: #ffe000;
  color: #000;
}

.main-content {
  padding: 20px 24px;
}
</style>