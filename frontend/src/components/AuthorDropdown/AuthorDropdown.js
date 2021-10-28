import React, { useState, useEffect } from 'react';
import Combobox from "react-widgets/lib/Combobox";

import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await listAuthors();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  return (
    <div className="AuthorDropdown">
      <Combobox
        value={value}
        data={authors}
        dataKey="id"
        textField={(item) =>
          item && (item.firstName || item.lastName)
            ? `${item.firstName} ${item.lastName}`
            : ""
        }
        onChange={onChange}
      />
    </div>
  );
}

export default AuthorDropdown;
