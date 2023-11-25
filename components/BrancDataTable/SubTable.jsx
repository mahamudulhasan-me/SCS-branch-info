import { TableCell, TableRow } from "@mui/material";

const SubTable = ({ cellData1, cellData2 }) => {
  return (
    <TableRow
      className="flex  w-full h-full subBranch-table"
      sx={{
        "& td": {
          borderRight: "1px solid #94a3b8",
          borderBottom: "1px solid #94a3b8", // Remove bottom border for all rows
        },
        "&:first-child td": {
          borderTop: "1px solid #94a3b8", // Add top border for the first row
        },
      }}
      //   key={index}
    >
      <TableCell
        className="flex justify-center items-center"
        sx={{
          borderLeft: "1px solid #94a3b8",
          width: "50%",
          padding: "4px",
          textAlign: "center",
        }}
      >
        <strong>{cellData1}</strong>
      </TableCell>
      <TableCell
        className="flex justify-center items-center"
        sx={{
          width: "50%",

          padding: "4px",
          textAlign: "center",
        }}
      >
        {cellData2.split(",").join("\n")}
      </TableCell>
    </TableRow>
  );
};

export default SubTable;
