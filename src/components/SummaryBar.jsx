import React from 'react';

const SummaryBar = ({ filters, sortConfig, onRemoveFilter, onClearSort }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
      {Object.entries(filters).map(([key, value]) => (
        <span key={key} style={{ background: '#c8e6c9', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center' }}>
          {key}: {value}
          <button
            onClick={() => onRemoveFilter(key)}
            style={{ marginLeft: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#2e7d32', fontWeight: 'bold' }}
            title="Remove Filter"
          >
            ✕
          </button>
        </span>
      ))}
      {sortConfig.key && (
        <span style={{ background: '#ffe0b2', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center' }}>
          Sort: {sortConfig.key} ({sortConfig.direction})
          <button
            onClick={onClearSort}
            style={{ marginLeft: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef6c00', fontWeight: 'bold' }}
            title="Clear Sorting"
          >
            ✕
          </button>
        </span>
      )}
    </div>
  );
};

export default SummaryBar;
