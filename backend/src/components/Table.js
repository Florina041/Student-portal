export default function Table({ data, columns }) {
  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((col) => (
              <td key={col}>
                {Array.isArray(item[col])
                  ? item[col].map((x) => x.name || x).join(", ")
                  : item[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
