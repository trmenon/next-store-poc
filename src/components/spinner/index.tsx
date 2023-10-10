import React from 'react';
import './Spinner.styles.css';

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <div className="spinner-inner" />
      </div>
    </div>
  );
};