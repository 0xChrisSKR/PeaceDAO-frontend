import type { ReactNode } from "react";

export function Table({
  header,
  rows,
}: {
  header: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="rounded-lg border border-neutral-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-900/60">
          <tr>
            {header.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 text-neutral-400 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-neutral-900/40">
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
