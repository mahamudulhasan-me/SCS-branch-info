import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import SearchForm from "../SearchForm/SearchForm";

const columns = [
  { id: "branchType", label: "Branch Type", minWidth: 120 },
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
  // state variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2000);
  const [searchedBranchData, setSearchedBranchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update searchedBranchData whenever branchData changes
    setSearchedBranchData([...branchData]);
  }, [branchData, searchedBranchData]); // This will trigger the effect whenever branchData changes
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = searchedBranchData.map((branchInfo) => {
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

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value === "object") {
        // Handle objects (e.g., services and contacts)
        return Object.values(value).some((nestedValue) =>
          nestedValue
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page to 0 when the search term changes
    // Check if there are no matching results and set an error message
  };

  // Effect to handle error messages and loading state
  useEffect(() => {
    if (searchedBranchData.length === 0) {
      setError("This Service is Not Available in This Branch");
    } else if (filteredRows.length === 0) {
      setError("Search Not Match");
    } else {
      setError("");
      setLoading(false);
    }
  }, [searchedBranchData, filteredRows]);

  return (
    <>
      <div className="md:grid grid-cols-4  justify-between items-center mb-10 gap-10 md:space-y-0  space-y-5">
        <TextField
          fullWidth
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Search Anything"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="col-span-3">
          <SearchForm
            setSearchedBranchData={setSearchedBranchData}
            branchData={branchData}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{
            maxHeight: 600,
            overflow: "auto",
            "::-webkit-scrollbar": { width: "2px", height: "4px" },
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
              {searchedBranchData &&
                filteredRows
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
          {loading ? (
            <p className="w-full flex justify-center items-center py-8 ">
              <ScaleLoader color="#36d7b7" />
            </p>
          ) : (
            error && (
              <p className="w-full flex justify-center items-center py-10 text-orange-500 text-lg">
                {error}
              </p>
            )
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2000, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-[#FDF4F5]"
        />
      </Paper>
    </>
  );
};

export default BranchDataTable;
