import { useEffect, useState } from 'react';
import './App.css';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import SummaryBar from './components/SummaryBar';

import {
  getProducts,
  updateProduct,
  deleteProduct,
  resetProducts,
} from './api/mockApi';

function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let data = [...products];
    if (filters.brand) data = data.filter(p => p.brand === filters.brand);
    if (filters.category) data = data.filter(p => p.category === filters.category);
    if (filters.price) data = data.filter(p => p.price >= +filters.price);
    if (filters.rating) data = data.filter(p => p.rating >= +filters.rating);

    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      data.sort((a, b) => {
        if (key === 'rating' || key === 'price') {
          return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
        } else {
          const valA = a[key].toLowerCase();
          const valB = b[key].toLowerCase();
          return direction === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });
    }

    setFilteredData(data);
  }, [filters, products, sortConfig]);

  const handleRowUpdate = async (updatedRow) => {
    try {
      await updateProduct(updatedRow);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFilter = (key) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Product Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <Filters
            data={filteredData.length ? filteredData : products}
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => setFilters({})}
          />

          <SummaryBar
            filters={filters}
            sortConfig={sortConfig}
            onRemoveFilter={removeFilter}
            onClearSort={() => setSortConfig({ key: '', direction: 'asc' })}
          />

          {filteredData.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <DataTable
              data={filteredData}
              onRowUpdate={handleRowUpdate}
              onDelete={handleDelete}
              sortConfig={sortConfig}
              onSortChange={setSortConfig}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
