import BranchDataTable from "@/components/BrancDataTable/BranchDataTable";
import SearchForm from "@/components/SearchForm/SearchForm";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

const BranchInfoBySearch = () => {
  const [branchData, setBranchData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get("/get-branch-contacts").then((res) => {
      setBranchData(res.data[1]);
    });
  }, []);

  return (
    <div className="px-[5%] mt-16">
      <SearchForm setBranchData={setBranchData} setError={setError} />
      <div className="my-10">
        <BranchDataTable branchData={branchData} />
      </div>
    </div>
  );
};

export default BranchInfoBySearch;
