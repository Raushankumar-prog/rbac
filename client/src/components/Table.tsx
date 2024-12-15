import React from "react";

interface TableProps {
  data: { Name: string; Role: string; Email: string }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200 text-white">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} >
              <td className="border border-gray-300 px-4 py-2">{row.Name}</td>
              <td className="border border-gray-300 px-4 py-2">{row.Role}</td>
              <td className="border border-gray-300 px-4 py-2">{row.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
