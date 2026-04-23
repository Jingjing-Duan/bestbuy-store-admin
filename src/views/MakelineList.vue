<template>
  <section class="page">
    <div class="page-header">
      <h2>Makeline Orders</h2>
      <button class="refresh-btn" @click="fetchOrders">Refresh</button>
    </div>

    <p class="count">Total records: {{ orders.length }}</p>

    <div class="table-wrap">
      <table v-if="orders.length">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Items</th>
            <th>Received</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td class="order-id">{{ order.orderId }}</td>
            <td>{{ order.customerName || '-' }}</td>
            <td>
              <span class="status" :class="order.status">
                {{ order.status }}
              </span>
            </td>
            <td>${{ Number(order.total || 0).toFixed(2) }}</td>
            <td>{{ order.items?.length || 0 }}</td>
            <td>{{ formatDate(order.receivedAt) }}</td>
            <td>{{ formatDate(order.completedAt) }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else class="empty">No makeline records found.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MakelineList',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch('/api/makeline')
        if (!res.ok) {
          throw new Error('Failed to fetch makeline orders')
        }
        this.orders = await res.json()
      } catch (err) {
        console.error(err)
        this.orders = []
      }
    },
    formatDate(value) {
      if (!value) return '-'
      return new Date(value).toLocaleString()
    }
  },
  mounted() {
    this.fetchOrders()
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h2 {
  margin: 0;
  font-size: 24px;
}

.refresh-btn {
  padding: 10px 16px;
  border: none;
  background: #000;
  color: #ffe000;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}

.refresh-btn:hover {
  opacity: 0.9;
}

.count {
  margin: 0;
  color: #444;
  font-size: 14px;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
}

th {
  background: #fafafa;
  font-weight: 700;
}

.order-id {
  max-width: 220px;
  word-break: break-all;
}

.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
}

.status.received {
  background: #eef2ff;
  color: #3730a3;
}

.status.processing {
  background: #fff7ed;
  color: #c2410c;
}

.status.completed {
  background: #ecfdf5;
  color: #15803d;
}

.status.failed {
  background: #fef2f2;
  color: #b91c1c;
}

.empty {
  padding: 20px;
  margin: 0;
  color: #666;
}
</style>