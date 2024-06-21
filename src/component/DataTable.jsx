import React from 'react';

const DataTable = ({ data }) => {
    const allColumns = data.reduce((columns, item) => {
      Object.keys(item).forEach(key => {
        if (!columns.includes(key)) {
          columns.push(key);
        }
      });
      return columns;
    }, []);

    return (
      <table>
        <thead>
          <tr>
            {allColumns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {allColumns.map((column, i) => (
                <td key={i}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default DataTable