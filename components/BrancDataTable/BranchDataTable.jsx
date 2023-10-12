import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

const columns = [
  { id: "branchType", label: "Branch Type", minWidth: 170 },
  { id: "officeName", label: "Office Name", minWidth: 170 },
  { id: "code", label: "\u00a0Code", minWidth: 100 },
  { id: "authorityContacts", label: "Authority Contacts", minWidth: 170 },
  { id: "serviceAndContacts", label: "Service & Contacts", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "remarks", label: "Remarks", minWidth: 170 },
];

function createData(
  branchType,
  officeName,
  code,
  authorityContacts,
  serviceAndContacts,
  address,
  remarks
) {
  return {
    branchType,
    officeName,
    code,
    authorityContacts,
    serviceAndContacts,
    address,
    remarks,
  };
}

const BranchDataTable = ({ branchData }) => {
  console.log(branchData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = branchData.map((branchInfo) => {
    const { name, code, type, incharge, address, branch_services, remark } =
      branchInfo;

    const serviceAndContacts = branch_services?.map((services) => {
      const { id, contact, service } = services;
      return (
        <>
          <span key={id}>
            {service?.service_name}: <br /> {contact}
          </span>{" "}
          <br />
        </>
      );
    });
    return createData(
      type,
      name,
      code,
      incharge,
      serviceAndContacts,
      address,
      remark || "N/A"
    );
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: 440,
          overflow: "auto",
          "::-webkit-scrollbar": { width: "2px", height: "3px" },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align="center"
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#FDF4F5",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {branchData &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowIndex}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="center">
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        {branchData.length === 0 && (
          <div className="w-full flex justify-center items-center py-10">
            <ScaleLoader color="#36d7b7" />
          </div>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="bg-[#FDF4F5]"
      />
    </Paper>
  );
};

export default BranchDataTable;
