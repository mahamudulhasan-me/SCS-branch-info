/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/pages/api/axios";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SearchForm = ({ setBranchData }) => {
  const [branches, setBranches] = useState([]);
  // const [services, setServices] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  // const [selectedService, setSelectedService] = useState(null);
  // const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [activeFetch, setActiveFetch] = useState(false);

  useEffect(() => {
    // fetch all branch name data
    axiosInstance.get("/get-branches").then((res) => {
      setBranches(res.data[1].map((branch) => branch));
    });
    // fetch all service data
    // axiosInstance.get("/get-services").then((res) => {
    //   setServices(res.data[1].map((service) => service));
    // });
  }, []);

  const handleBranchChange = (event, newValue) => {
    setSelectedBranch(newValue);
    setSelectedBranchId(newValue?.id);
    setActiveFetch(true);
  };

  const getSearchData = async () => {
    try {
      if (selectedBranchId) {
        const searchBranchData = await axiosInstance.get(
          `/get-branch-contacts-list?branch_id=${selectedBranchId}`
        );
        setBranchData(searchBranchData.data.data);
      } else {
        const searchAllData = await axiosInstance.get(
          "/get-branch-contacts-list"
        );
        setBranchData(searchAllData.data.data);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching search data:", error);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [selectedBranchId]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   getSearchData();
  // };
  return (
    <>
      <Autocomplete
        fullWidth
        size="small"
        options={branches}
        getOptionLabel={(option) =>
          option.name || option.code
            ? `${option.name} ${option.code && "-"} ${option.code}`
            : ""
        }
        value={selectedBranch}
        onChange={handleBranchChange}
        getOptionSelected={(option, value) => option.id === value.id}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (option) =>
              (option.name &&
                option.name
                  .toLowerCase()
                  .startsWith(inputValue.toLowerCase())) ||
              (option.code &&
                option.code.toLowerCase().startsWith(inputValue.toLowerCase()))
          )
        }
        renderInput={(params) => <TextField {...params} label="Branch" />}
      />

      {/* <Autocomplete
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
        /> */}
    </>
  );
};

export default SearchForm;
