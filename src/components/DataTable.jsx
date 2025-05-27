import React from 'react';

const SortableHeader = ({ label, column, sortConfig, onSortChange }) => {
  const isSorted = sortConfig.key === column;
  const arrow = isSorted ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '';

  return (
    <th
      onClick={() => {
        const direction = isSorted && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        onSortChange({ key: column, direction });
      }}
      style={{ cursor: 'pointer' }}
    >
      {label} {arrow}
    </th>
  );
};

const DataTable = ({ data, onRowUpdate, onDelete, sortConfig, onSortChange }) => {
  const [editId, setEditId] = React.useState(null);
  const [editedRow, setEditedRow] = React.useState({});

  const startEditing = (product) => {
    setEditId(product.id);
    setEditedRow({ ...product });
  };

  const handleChange = (field, value) => {
    setEditedRow(prev => ({ ...prev, [field]: value }));
  };

  const saveRow = () => {
    onRowUpdate(editedRow);
    setEditId(null);
    setEditedRow({});
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditedRow({});
  };

  if (!data.length) return <p>No products to display.</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <SortableHeader label="Title" column="title" sortConfig={sortConfig} onSortChange={onSortChange} />
          <th>Brand</th>
          <SortableHeader label="Category" column="category" sortConfig={sortConfig} onSortChange={onSortChange} />
          <SortableHeader label="Price ($)" column="price" sortConfig={sortConfig} onSortChange={onSortChange} />
          <SortableHeader label="Rating" column="rating" sortConfig={sortConfig} onSortChange={onSortChange} />
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(product => (
          <tr key={product.id}>
            {editId === product.id ? (
              <>
                <td><input type="text" value={editedRow.title} onChange={(e) => handleChange('title', e.target.value)} /></td>
                <td><input type="text" value={editedRow.brand} onChange={(e) => handleChange('brand', e.target.value)} /></td>
                <td><input type="text" value={editedRow.category} onChange={(e) => handleChange('category', e.target.value)} /></td>
                <td><input type="number" value={editedRow.price} onChange={(e) => handleChange('price', +e.target.value)} /></td>
                <td><input type="number" step="0.01" min="0" max="5" value={editedRow.rating} onChange={(e) => handleChange('rating', +e.target.value)} /></td>
                <td>
                  <button onClick={saveRow}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <button onClick={() => startEditing(product)}>Edit</button>
                  <button onClick={() => onDelete(product.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
