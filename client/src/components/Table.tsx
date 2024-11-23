import React from "react";

interface TableProps {
  data: Array<{ [key: string]: string | number }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No Data Available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="border border-gray-300 p-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 p-2">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
