import axiosInstance from "@/utils/axiosInstance";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SearchForm = () => {
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // fetch all branch name data
    axiosInstance.get("/get-branches").then((res) => {
      setBranches(res.data[1].map((branch) => branch.name));
    });
    // fetch all service name data
    axiosInstance.get("/get-services").then((res) => {
      setServices(res.data[1].map((service) => service?.details));
    });
  }, []);

  return (
    <form className="w-2/3 flex justify-center items-center md:gap-10 gap-5 mb-8">
      <Autocomplete
        fullWidth
        size="small"
        options={branches}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        }
        renderInput={(params) => <TextField {...params} label="Branch" />}
      />
      <Autocomplete
        fullWidth
        size="small"
        options={services}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
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
  );
};

export default SearchForm;
