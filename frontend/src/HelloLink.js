// HelloLink.js
import React from 'react';

function HelloLink({ setShowForm }) {
  return (
    <a href="#" onClick={() => setShowForm(true)}>Hello</a>
  );
}

export default HelloLink;
