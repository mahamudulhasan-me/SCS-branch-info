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
import LoaderSkeleton from "../LoaderSkeleton/LoaderSkeleton";
import SearchForm from "../SearchForm/SearchForm";

const columns = [
  { id: "branchType", label: "Branch Type", minWidth: 140 },
  { id: "officeName", label: "Office Name", minWidth: 140 },
  { id: "code", label: "\u00a0Code", minWidth: 100 },
  { id: "authorityContacts", label: "Authority Contacts", minWidth: 180 },
  { id: "serviceAndContacts", label: "Service & Contacts", minWidth: 210 },
  { id: "address", label: "Address", minWidth: 200 },
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

const BranchDataTable = ({ branchData, setBranchData }) => {
  // state variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2000);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = branchData.map((branchInfo) => {
    const {
      name,
      code,
      type,
      branch_incharge,
      address,
      branch_services,
      remark,
    } = branchInfo;

    // Extract names and contacts of all incharges from branch_incharge
    const inChargeDetails =
      branch_incharge && branch_incharge.length > 0
        ? branch_incharge
            .filter(
              (incharge) => incharge?.user?.name || incharge?.user?.contact
            ) // Filter out items where both name and contact are null
            .map(
              (incharge) =>
                `${incharge?.user?.name || ""} ${incharge?.user?.contact || ""}`
            )
            .join("\n")
        : "";

    const serviceAndContacts = branch_services
      ?.map((services) => {
        const { id, contact, service } = services;
        return `${service?.service_name}: ${contact}`;
      })
      .join("\n");

    // const remarkOrStatus = status ? remark : "Inactive";

    return createData(
      type,
      name,
      code,
      inChargeDetails,
      serviceAndContacts,
      address,
      remark
    );
  });
  // Filter rows based on search term
  const filteredRows = rows.filter((row) => {
    const flattenedRow = Object.values(row)
      .filter((value) => value !== undefined && value !== null)
      .join(" ")
      .toLowerCase();

    return flattenedRow.includes(searchTerm.toLowerCase());
  });

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page to 0 when the search term changes
    // Check if there are no matching results and set an error message
  };

  // Effect to handle error messages and loading state
  useEffect(() => {
    if (branchData.length === 0) {
      setError("This Service is Not Available in This Branch");
    } else if (filteredRows.length === 0) {
      setError("Search Not Match");
    } else {
      setError("");
      setLoading(false);
    }
  }, [branchData, filteredRows]);

  return (
    <>
      <div className="md:grid md:grid-cols-4 justify-between items-center gap-10 md:space-y-0  space-y-5 my-8">
        <TextField
          fullWidth
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Search Anything"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="md:col-span-3">
          <SearchForm
            setBranchData={setBranchData}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{
            maxHeight: 600,
            overflow: "auto",
            "::-webkit-scrollbar": { width: "4px", height: "5px" },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
            border: "1px solid #94a3b8",
            borderRadius: "5px",
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
                      // fontSize: "0.9rem",
                      borderBottom: "1px solid #94a3b8",
                      borderRight: "1px solid #94a3b8", // Horizontal borders
                      color: "#1e293b",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* // Inside the TableBody component of BranchDataTable component */}

            <TableBody>
              {branchData &&
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}
                        sx={{
                          "&:not(:last-child) td": {
                            borderBottom: "1px solid #94a3b8", // Horizontal borders
                          },
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align="center"
                              sx={{
                                borderRight: "1px solid #94a3b8",
                                color: "#1e293b",
                              }}
                            >
                              {column.id === "serviceAndContacts" && value
                                ? // Custom rendering for "Service & Contacts" column
                                  value
                                    .split("\n")
                                    .map((serviceContact, index) => {
                                      const [service, contact] =
                                        serviceContact.split(": "); // Split by ": " to get service and contact
                                      return (
                                        <p
                                          key={index}
                                          className="w-full h-full border border-slate-400 flex justify-between items-center"
                                        >
                                          <span className="p-1 border-r w-1/2 border-gray-400">
                                            {service}
                                          </span>{" "}
                                          {contact &&
                                            contact !== "null" && ( // Check if contact is not null or "null" string
                                              <span className="p-1">
                                                {contact}
                                              </span>
                                            )}
                                        </p>
                                      );
                                    })
                                : column.id === "authorityContacts" && value
                                ? // Custom rendering for "Authority Contacts" column
                                  value
                                    .split("\n")
                                    .map((authorityContact, index) => {
                                      const [name, contact] =
                                        authorityContact.split(": "); // Split by ": " to get name and contact
                                      return (
                                        <>
                                          <div key={index} className="mb-2">
                                            <span>{name}</span> <br />
                                            {contact && contact}
                                          </div>
                                        </>
                                      );
                                    })
                                : column.format && typeof value === "number"
                                ? // Format number if required
                                  column.format(value)
                                : // Default rendering for other columns
                                  value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          {loading ? (
            <LoaderSkeleton />
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
          sx={{ border: "1px solid #94a3b8", borderRadius: "5px" }}
          className="bg-[#FDF4F5]"
        />
      </Paper>
    </>
  );
};

export default BranchDataTable;
