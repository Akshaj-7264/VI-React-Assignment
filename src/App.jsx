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
  const [allProducts, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let temp = [...allProducts];
    if (filters.brand) temp = temp.filter(p => p.brand === filters.brand);
    if (filters.category) temp = temp.filter(p => p.category === filters.category);
    if (filters.price) temp = temp.filter(p => p.price >= +filters.price);
    if (filters.rating) temp = temp.filter(p => p.rating >= +filters.rating);

    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      temp.sort((a, b) => {
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

    setFilteredData(temp);
  }, [filters, sortConfig, allProducts]);

  const handleRowUpdate = async (updatedRow) => {
    try {
      await updateProduct(updatedRow);
      const data = await getProducts();
      setAllProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      const data = await getProducts();
      setAllProducts(data);
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
    <div className="app" style={{ padding: '2rem' }}>
      <h2>Product Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <Filters
            data={allProducts}
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