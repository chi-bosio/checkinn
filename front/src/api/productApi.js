import axios from "axios";

export const createProduct = async (data, images) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  images.forEach((file) => formData.append("images", file));

  return axios.post("/api/admin/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
