<template>
  <div class="page">
    <h2 class="page-title">Products</h2>

    <div class="form-card">
      <h3 class="section-title">
        {{ isEditing ? 'Edit Product' : 'Add Product' }}
      </h3>

      <div class="form-grid">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" />
        </div>

        <div class="form-group">
          <label>Price</label>
          <input v-model="form.price" type="number" />
        </div>

        <div class="form-group">
          <label>SKU</label>
          <input v-model="form.sku" />
        </div>

        <div class="form-group">
          <label>Description</label>
          <input v-model="form.description" />
        </div>

        <div class="form-group">
          <label>Image URL</label>
          <input v-model="form.image" />
        </div>

        <div class="form-group">
          <label>Category</label>
          <input v-model="form.category" />
        </div>

        <div class="form-group">
          <label>Stock</label>
          <input v-model="form.stock" type="number" />
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary" @click="saveProduct">
          {{ isEditing ? 'Update Product' : 'Add Product' }}
        </button>

        <button
          v-if="isEditing"
          class="btn btn-secondary"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </div>

    <div class="toolbar">
      <h3> Productors List </h3>
      <p class="count">Total products: {{ products.length }}</p>
    </div>

    <div class="table-card">
      <table class="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p._id">
            <td>{{ p.name }}</td>
            <td>${{ p.price }}</td>
            <td>{{ p.sku }}</td>
            <td>{{ p.category }}</td>
            <td>{{ p.stock }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn btn-edit" @click="startEdit(p)">Edit</button>
                <button class="btn btn-delete" @click="removeProduct(p._id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6" class="empty-state">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../api/productService'

const products = ref([])
const editingId = ref(null)

const form = ref({
  name: '',
  price: '',
  sku: '',
  description: '',
  image: '',
  category: 'Electronics',
  stock: 0
})

const isEditing = computed(() => !!editingId.value)

const resetForm = () => {
  form.value = {
    name: '',
    price: '',
    sku: '',
    description: '',
    image: '',
    category: 'Electronics',
    stock: 0
  }
}

const loadProducts = async () => {
  try {
    const res = await getProducts()
    products.value = res.data
  } catch (err) {
    console.error('Error loading products:', err.response?.data || err.message)
  }
}

const saveProduct = async () => {
  try {
    const payload = {
      name: form.value.name,
      price: Number(form.value.price),
      sku: form.value.sku,
      description: form.value.description,
      image: form.value.image,
      category: form.value.category,
      stock: Number(form.value.stock)
    }

    if (isEditing.value) {
      await updateProduct(editingId.value, payload)
    } else {
      await createProduct(payload)
    }

    resetForm()
    editingId.value = null
    await loadProducts()
  } catch (err) {
    console.error('Error saving product:', err.response?.data || err.message)
    alert(err.response?.data?.message || 'Save failed')
  }
}

const startEdit = (product) => {
  editingId.value = product._id
  form.value = {
    name: product.name || '',
    price: product.price || 0,
    sku: product.sku || '',
    description: product.description || '',
    image: product.image || '',
    category: product.category || 'Electronics',
    stock: product.stock || 0
  }
}

const cancelEdit = () => {
  editingId.value = null
  resetForm()
}

const removeProduct = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this product?')

  if (!confirmed) return

  try {
    await deleteProduct(id)
    await loadProducts()
  } catch (err) {
    console.error('Error deleting product:', err.response?.data || err.message)
    alert(err.response?.data?.message || 'Delete failed')
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.page-title {
  font-size: 26px;
  margin-bottom: 16px;
  color: #111;
}

.form-card,
.table-card {
  background: #fff;
  border: 1px solid #eee;
  padding: 18px;
  margin-bottom: 20px;
}

.section-title {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 两列 */
  gap: 20px 40px;                  /* 行距 + 列距 */
}

.form-group {
  display: flex;
  align-items: center;
}

.form-group label {
  width: 120px;        /* 👉 核心：统一 label 宽度 */
  font-size: 14px;
  color: #555;
}

.form-group input {
  flex: 1;             /* 👉 自动填满剩余空间 */
  padding: 8px;
  border: 1px solid #ccc;
}

.form-actions {
  margin-top: 12px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

/* 👉 BestBuy 主按钮（黄） */
.btn-primary {
  background: #ffe000;
  color: #000;
}

/* 👉 灰色按钮 */
.btn-secondary {
  background: #f2f2f2;
}

/* 👉 Edit */
.btn-edit {
  background: #ddd;
}

/* 👉 Delete */
.btn-delete {
  background: #000;
  color: #fff;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.product-table th {
  text-align: left;
  background: #f8f8f8;
  padding: 10px;
}

.product-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.action-buttons {
  display: flex;
  gap: 6px;
}

.toolbar {
  display: flex;
  justify-content: space-between; /* 👉 左右分开 */
  align-items: center;
}
</style>