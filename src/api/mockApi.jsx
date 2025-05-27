import productsData from '../data/products.json';

let products = [];

const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('productData');
  if (stored) {
    products = JSON.parse(stored);
  } else {
    products = [...productsData.products];
    localStorage.setItem('productData', JSON.stringify(products));
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem('productData', JSON.stringify(products));
};

// Load once on initial import
loadFromLocalStorage();

const API_DELAY = 500;

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...products]);
    }, API_DELAY);
  });
};

export const updateProduct = (updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex(p => p.id === updatedProduct.id);
      if (index === -1) {
        reject(new Error("Product not found"));
      } else {
        products[index] = { ...products[index], ...updatedProduct };
        saveToLocalStorage();
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
        saveToLocalStorage();
        resolve(deleted);
      }
    }, API_DELAY / 2);
  });
};

export const resetProducts = () => {
  products = [...productsData.products];
  saveToLocalStorage();
};
