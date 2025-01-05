const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="table-fixed mt-4 rounded-lg">
      <thead>
        <tr className="text-left text-2xl md:text-3xl underline">
          {columns.map((col) => (
            <th key={col.accessor} className={`p-1 md:p-4 ${col.className} w-1/${columns.length}` }>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
