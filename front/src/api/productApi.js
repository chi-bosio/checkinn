import axios from "axios";

export const createProduct = async (data, images) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  images.forEach((file) => formData.append("images", file));

  return axios.post("/api/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Obtener productos aleatorios
export const getRandomProducts = async () => {
  const response = await axios.get("/api/products/random");
  return response.data;
};

// Obtener todos los productos
export const getAllProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

// Obtener productos paginados (con seed opcional)
export const getProductsPaginated = async (page = 0, size = 10, seed = null) => {
  let url = `/api/products?page=${page}&size=${size}`;
  if (seed) url += `&seed=${seed}`;
  const response = await axios.get(url);
  return response.data;
};

// Obtener detalle de producto por id
export const getProductById = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};
