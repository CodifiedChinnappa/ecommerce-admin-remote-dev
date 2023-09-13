import { FormEvent, useState } from "react";
import { Breadcrumbs, Button, Paper } from "@mui/material";
// import { AccountForm } from "./AccountForm"
// import { AddressForm } from "./AddressForm"
// import { UserForm } from "./UserForm"
import useMultistepForm from "../../hooks/useMultistepForm";
import SelectProduct from "../../components/products/add/step1";
import CategorySelector from "../../components/products/add/step2";
import ProductInfo from "../../components/products/add/step3";
import VariationInfo from "../../components/products/add/step4";

type FormData = {
  brand: string;
  category: string;
  subcategory: string;
  subchildCategory: string;
  title: string;
  description: string;
  variations: {
    name: string;
    price: number;
  }[];
};

const INITIAL_DATA: FormData = {
  brand: "",
  category: "",
  subcategory: "",
  subchildCategory: "",
  title: "",
  description: "",
  variations: [{ name: "", price: 0 }],
};

const AddProduct = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setData(prev => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <SelectProduct />,
      <CategorySelector data={data} updateFields={updateFields} />,
      <ProductInfo data={data} updateFields={updateFields} />,
      <VariationInfo data={data} updateFields={updateFields} />,
    ]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    return alert("Successful Account Creation");
  };

  return (
    <Paper elevation={3}>
      <div className="relative  rounded-md my-5 p-5 h-[80vh]">
        <form onSubmit={onSubmit}>
          <div className="absolute top-[.5rem] right-[.5rem]">
            <Breadcrumbs aria-label="breadcrumb">
              <h1>{currentStepIndex + 1}</h1>/<h1>{steps.length}</h1>
            </Breadcrumbs>
          </div>

          {step}
          <div className="absolute bottom-[.5rem] right-[.5rem] mt-[1rem] flex justify-end gap-[.5rem]">
            {!isFirstStep && (
              <Button variant="contained" type="button" onClick={back}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color={isLastStep ? "warning" : "success"}
            >
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};

export default AddProduct;
