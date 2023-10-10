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
  service,
  contacts,
  address,
  remarks
) {
  return {
    branchType,
    officeName,
    code,
    authorityContacts,
    service,
    contacts,
    address,
    remarks,
  };
}

const BranchDataTable = ({ branchData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatServiceAndContacts = (service, contacts) => {
    return `${service}:<br />${contacts}`;
  };

  const rows = branchData.map((branchInfo) => {
    const { contact, branch, service } = branchInfo;
    return createData(
      "Branch",
      branch?.name,
      branch?.code,
      contact,
      service.service_name,
      contact,
      branch?.address,
      branch?.remarks || "N/A"
    );
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align="center"
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  className="bg-violet-200 font-bold"
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
                            {column.id === "serviceAndContacts" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: formatServiceAndContacts(
                                    row.service,
                                    row.contacts
                                  ),
                                }}
                              />
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
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
        className="bg-violet-100"
      />
    </Paper>
  );
};

export default BranchDataTable;
