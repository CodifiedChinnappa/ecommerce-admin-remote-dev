import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { GridSearchIcon } from "@mui/x-data-grid";
import { Button, Divider } from "@mui/material";



const SelectProduct = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    setSearchText(searchText);
  };

  return (
    <div className="flex flex-col gap-[1rem] w-[50%] mx-auto justify-center ">
      <h1 className="text-semibold">To begin adding products</h1>
      <h1 className="text-4xl text-semibold">Find your products in our catalog</h1>
      <TextField
        label="Product Name or SIN"
        variant="outlined"
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return setSearchText(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <GridSearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
       <Button variant="contained" type="button"  >
           Im adding a product not sold on ?
            </Button>
    </div>
  );
};

export default SelectProduct;
