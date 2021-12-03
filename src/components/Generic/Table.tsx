import { FC } from "react";
import Code from "./Code";
import "./Table.scss";

interface TableHotkeysProps {
  header: string[];
  rows: {
    action: string;
    hotkeys: string[];
  }[];
}

export const TableHotkeys: FC<TableHotkeysProps> = ({ header, rows }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {header.map((headerItem) => (
            <th className="table__cell">{headerItem}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return row.hotkeys.map((hotkey, i) => {
            const hotkeyWords = hotkey.split(" + ");
            return (
              <tr
                className={
                  row.hotkeys.length - 1 === i
                    ? "table__row_last"
                    : "table__row"
                }
              >
                {i === 0 && (
                  <td
                    className="table__cell"
                    rowSpan={row.hotkeys.length}
                    width="35%"
                  >
                    {row.action}
                  </td>
                )}
                <td className="table__cell">
                  {hotkeyWords.map((hotkeyWord) => {
                    return <Code>{hotkeyWord}</Code>;
                  })}
                </td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};
