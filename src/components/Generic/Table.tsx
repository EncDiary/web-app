import { FC } from "react";
import Code from "./Code";
import "./Table.scss";

interface TableHotkeysProps {
  header: string[];
  rows: IRow[];
}

interface TableHotkeysHeaderItemProps {
  headerItem: string;
}

interface TableHotkeysRowProps {
  row: IRow;
}

interface TableHotkeysRowPartProps {
  row: IRow;
  i: number;
  hotkey: string;
}

interface TableHotkeysLeftCellProps {
  row: IRow;
}

interface TableHotkeysRightCellProps {
  hotkey: string;
}

interface IRow {
  action: string;
  hotkeys: string[];
}

export const TableHotkeys: FC<TableHotkeysProps> = ({ header, rows }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {header.map((headerItem, i) => (
            <TableHotkeysHeaderItem headerItem={headerItem} key={i} />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          return <TableHotkeysRow row={row} key={i} />;
        })}
      </tbody>
    </table>
  );
};

const TableHotkeysHeaderItem: FC<TableHotkeysHeaderItemProps> = ({
  headerItem,
}) => {
  return <th className="table__cell">{headerItem}</th>;
};

const TableHotkeysRow: FC<TableHotkeysRowProps> = ({ row }) => {
  return (
    <>
      {row.hotkeys.map((hotkey, i) => {
        return <TableHotkeysRowPart row={row} i={i} hotkey={hotkey} key={i} />;
      })}
    </>
  );
};

const TableHotkeysRowPart: FC<TableHotkeysRowPartProps> = ({
  row,
  i,
  hotkey,
}) => {
  return (
    <tr
      className={
        row.hotkeys.length - 1 === i ? "table__row_last" : "table__row"
      }
      key={i}
    >
      {i === 0 && <TableHotkeysLeftCell row={row} />}
      <TableHotkeysRightCell hotkey={hotkey} />
    </tr>
  );
};

const TableHotkeysLeftCell: FC<TableHotkeysLeftCellProps> = ({ row }) => {
  return (
    <td className="table__cell" rowSpan={row.hotkeys.length} width="35%">
      {row.action}
    </td>
  );
};

const TableHotkeysRightCell: FC<TableHotkeysRightCellProps> = ({ hotkey }) => {
  const hotkeyWords = hotkey.split(" + ");

  return (
    <td className="table__cell">
      {hotkeyWords.map((hotkeyWord, j) => {
        return <Code key={j}>{hotkeyWord}</Code>;
      })}
    </td>
  );
};
