export function Table<T>({
  data,
  columns,
}: {
  data: T[];
  columns: { label: string; render: (row: T) => React.ReactNode }[];
}) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map(c => (
            <th key={c.label} className="border p-2 text-left">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(c => (
              <td key={c.label} className="border p-2">
                {c.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
