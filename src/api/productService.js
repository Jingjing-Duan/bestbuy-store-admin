import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001', // 如果你的真实地址不同，就改这里
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getProducts = () => api.get('/products')
export const createProduct = (product) => api.post('/products', product)
export const deleteProduct = (id) => api.delete(`/products/${id}`)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product)
