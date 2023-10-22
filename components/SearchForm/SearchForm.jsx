/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/pages/api/axios";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SearchForm = ({ setBranchData, setSearchTerm }) => {
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [activeFetch, setActiveFetch] = useState(false);

  useEffect(() => {
    // fetch all branch name data
    axiosInstance.get("/get-branches").then((res) => {
      setBranches(res.data[1].map((branch) => branch));
    });
    // fetch all service data
    axiosInstance.get("/get-services").then((res) => {
      setServices(res.data[1].map((service) => service));
    });
  }, []);

  const handleBranchChange = (event, newValue) => {
    setSelectedBranch(newValue);
    setSelectedBranchId(newValue?.id);
    setActiveFetch(true);
    setSearchTerm("");
  };

  const handleServiceChange = (event, newValue) => {
    setSelectedService(newValue);
    setSelectedServiceId(newValue?.service_id);
    setActiveFetch(true);
    setSearchTerm("");
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
      } else {
        if (activeFetch) {
          const searchAllData = await axiosInstance.get(
            "/get-branch-contacts-list"
          );
          setBranchData(searchAllData.data.data);
        }
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching search data:", error);
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
    <>
      <form
        className=" w-full grid md:grid-cols-3 grid-cols-1  justify-center items-center md:gap-10 gap-5"
        onSubmit={handleSubmit}
      >
        <Autocomplete
          fullWidth
          size="small"
          options={branches}
          getOptionLabel={(option) => option.name}
          value={selectedBranch}
          onChange={handleBranchChange}
          getOptionSelected={(option, value) => option.id === value.id}
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
          getOptionLabel={(option) => option.service_name} // Display 'details' property in the input field
          value={selectedService}
          onChange={handleServiceChange}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.service_name
                .toLowerCase()
                .startsWith(inputValue.toLowerCase())
            )
          }
          renderInput={(params) => <TextField {...params} label="Service" />}
        />

        <div className="w-1/2 md:mx-0 mx-auto">
          <Button
            variant="contained"
            type="submit"
            className="w-full bg-[#0C4A9A] hover:bg-[#3C74BD] text-white font-semibold py-2 px-4 "
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
