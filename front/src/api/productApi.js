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
