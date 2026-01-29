//SearchSort.jsx to search orchids by name and sort them by price or name
// Use sort in FilterSort.jsx to sort the search results by price or name

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function SearchSort({ onSearchChange }) {
  return (
    <InputGroup className="search-box">
      <InputGroup.Text>🔍</InputGroup.Text>
      <Form.Control
        placeholder="Search orchids..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </InputGroup>
  );
}

export default SearchSort;
