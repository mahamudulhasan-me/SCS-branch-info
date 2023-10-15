import axiosInstance from "@/utils/axiosInstance";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SearchForm = ({ setBranchData, branchData }) => {
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // axiosInstance.get("/get-services").then((res) => {
    //   console.log(res);
    // });
    // // fetch all branch name data
    // axiosInstance.get("/get-branches").then((res) => {
    //   setBranches(res.data[1].map((branch) => branch));
    // });
    // // fetch all service data
    // axiosInstance.get("/get-services").then((res) => {
    //   setServices(res.data[1].map((service) => service));
    // });
  }, []);

  console.log(branches);
  const handleBranchChange = (event, newValue) => {
    setSelectedBranch(newValue);
    setSelectedBranchId(newValue?.id);
  };

  const handleServiceChange = (event, newValue) => {
    setSelectedService(newValue);
    setSelectedServiceId(newValue?.service_id);
  };

  const getSearchData = async () => {
    try {
      if (selectedBranchId || selectedServiceId) {
        if (selectedBranchId && selectedServiceId) {
          const searchBranchAndServiceData = await axiosInstance.get(
            `/get-branch-contacts-list?branch_id=${selectedBranchId}&service_id=${selectedServiceId}`
          );
          setBranchData(searchBranchAndServiceData.data.data);
        } else if (selectedBranchId) {
          const searchBranchData = await axiosInstance.get(
            `/get-branch-contacts-list?branch_id=${selectedBranchId}`
          );
          setBranchData(searchBranchData.data.data);
        } else if (selectedServiceId) {
          const searchServiceData = await axiosInstance.get(
            `/get-branch-contacts-list?service_id=${selectedServiceId}`
          );
          setBranchData(searchServiceData.data.data);
        }
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching search data:", error);
      // You can also set an error state or display an error message to the user
    }
  };

  useEffect(() => {
    getSearchData();
  }, [selectedBranchId, selectedServiceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    getSearchData();
  };
  return (
    <div className="flex justify-between items-center  mb-8">
      <form
        className="lg:w-2/3 flex lg:flex-nowrap flex-wrap justify-between items-center md:gap-10 gap-5"
        onSubmit={handleSubmit}
      >
        <Autocomplete
          fullWidth
          size="small"
          options={branches}
          getOptionLabel={(option) => option.name} // Display 'name' property in the input field
          value={selectedBranch}
          onChange={handleBranchChange}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.name.toLowerCase().startsWith(inputValue.toLowerCase())
            )
          }
          renderInput={(params) => <TextField {...params} label="Branch" />}
        />
        <Autocomplete
          fullWidth
          size="small"
          options={services}
          getOptionLabel={(option) => option.details} // Display 'details' property in the input field
          value={selectedService}
          onChange={handleServiceChange}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.details.toLowerCase().startsWith(inputValue.toLowerCase())
            )
          }
          renderInput={(params) => <TextField {...params} label="Service" />}
        />

        <Button
          variant="contained"
          type="submit"
          className="bg-[#0C4A9A] hover:bg-[#3C74BD] text-white font-semibold py-2 px-4 w-1/2 "
        >
          Search
        </Button>
      </form>
      <TextField
        size="small"
        label="Search"
        variant="outlined"
        placeholder="Search Anything"
        value={searchValue}
      />
    </div>
  );
};

export default SearchForm;
