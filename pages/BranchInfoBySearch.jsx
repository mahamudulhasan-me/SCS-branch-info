import BranchDataTable from "@/components/BrancDataTable/BranchDataTable";

import { useEffect, useState } from "react";
import axiosInstance from "./api/axios";

const BranchInfoBySearch = () => {
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/get-branch-contacts-list").then((res) => {
      setBranchData(res.data.data);
    });
  }, []);

  return (
    <div className="px-[5%] mt-16">
      <BranchDataTable branchData={branchData} setBranchData={setBranchData} />
    </div>
  );
};

export default BranchInfoBySearch;
