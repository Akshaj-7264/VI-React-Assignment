import React from 'react';

// Utility: Extract unique sorted values
const getUniqueValues = (data, key) => {
  const values = [...new Set(data.map(item => item[key]))];
  return values.sort((a, b) => (typeof a === 'string' ? a.localeCompare(b) : a - b));
};

// Generate price steps dynamically based on data
const generatePriceThresholds = (data, step = 500) => {
  const prices = data.map(p => p.price);
  const max = Math.max(...prices);
  const thresholds = [];
  for (let i = step; i <= max; i += step) {
    thresholds.push(i);
  }
  return thresholds;
};

const Filters = ({ data, filters, onFilterChange, onReset }) => {
  const brands = getUniqueValues(data, 'brand');
  const categories = getUniqueValues(data, 'category');

  const priceThresholds = generatePriceThresholds(data);
  const ratingThresholds = [1, 2, 3, 4];

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      {/* Brand Filter */}
      <label>
        Brand:
        <select value={filters.brand || ''} onChange={(e) => handleChange('brand', e.target.value || null)}>
          <option value="">All</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>

      {/* Category Filter */}
      <label>
        Category:
        <select value={filters.category || ''} onChange={(e) => handleChange('category', e.target.value || null)}>
          <option value="">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      {/* Price Filter (dynamic thresholds like 500+, 1000+) */}
      <label>
        Price:
        <select value={filters.price || ''} onChange={(e) => handleChange('price', e.target.value || null)}>
          <option value="">All</option>
          {priceThresholds.map(p => (
            <option key={p} value={p}>{p}+</option>
          ))}
        </select>
      </label>

      {/* Rating Filter */}
      <label>
        Rating:
        <select value={filters.rating || ''} onChange={(e) => handleChange('rating', e.target.value || null)}>
          <option value="">All</option>
          {ratingThresholds.map(r => (
            <option key={r} value={r}>{r}+</option>
          ))}
        </select>
      </label>

      {/* Reset Button */}
      <button onClick={onReset}>Reset Filters</button>
    </div>
  );
};

export default Filters;
