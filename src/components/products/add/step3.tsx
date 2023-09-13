import React from "react";
import { TextField } from "@mui/material";

type ProductData = {
  title: string;
  description: string;
};

type ProductFormProps = {
  data: ProductData;
  updateFields: (fields: Partial<ProductData>) => void;
};

const ProductInfo = ({ data, updateFields }: ProductFormProps) => {
  return (
    <div className="flex flex-col gap-[4rem] w-[70%] m-auto justify-center">
      ProductInfo
      <TextField
        label="Enter title"
        variant="outlined"
        fullWidth
        value={data.title} // Use the title value from props here
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return updateFields({ title: e.target.value });
        }}
      />
      <TextField
        label="Enter description"
        variant="outlined"
        fullWidth
        value={data.description} // Use the description value from props here
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return updateFields({ description: e.target.value });
        }}
      />
    </div>
  );
};

export default ProductInfo;
