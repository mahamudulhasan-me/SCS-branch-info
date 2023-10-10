import BranchDataTable from "@/components/BrancDataTable/BranchDataTable";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const BranchInfoBySearch = () => {
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    fetch("./data/branchInfo.json")
      .then((res) => res.json())
      .then((data) => {
        setBranchData(data.data?.branch_services);
      });
  }, []);
  return (
    <div className="px-[5%] mt-16">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-between items-start md:gap-10 gap-5 mb-8">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
        />

        <Button
          type="submit"
          className="bg-[#0C4A9A] hover:bg-[#3C74BD] text-white font-semibold py-2 px-4 w-4/5 lg:ml-10 mx-auto lg:mx-0"
        >
          Search
        </Button>
      </form>
      <BranchDataTable branchData={branchData} />
    </div>
  );
};

export default BranchInfoBySearch;
