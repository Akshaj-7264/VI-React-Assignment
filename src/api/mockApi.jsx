import productsData from '../data/products.json';

let products = [...productsData.products];

const API_DELAY = 500;

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...products]);
    }, API_DELAY);
  });
};

// ✅ New full-row update method
export const updateProduct = (updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex(p => p.id === updatedProduct.id);
      if (index === -1) {
        reject(new Error("Product not found"));
      } else {
        products[index] = { ...products[index], ...updatedProduct };
        resolve({ ...products[index] });
      }
    }, API_DELAY / 2);
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        reject(new Error("Product not found"));
      } else {
        const deleted = products.splice(index, 1)[0];
        resolve(deleted);
      }
    }, API_DELAY / 2);
  });
};

export const resetProducts = () => {
  products = [...productsData.products];
};
