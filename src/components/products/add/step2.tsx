import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type CategoryData = {
  brand: string;
  category: string;
  subcategory: string;
  subchildCategory: string;
};

type CategoryFormProps = {
  data: CategoryData;
  updateFields: (fields: Partial<CategoryData>) => void;
};

interface Category {
  name: string;
  children: Subcategory[];
}

interface Subcategory {
  name: string;
  children?: SubchildCategory[];
}

interface SubchildCategory {
  name: string;
}

const categories: Category[] = [
  {
    name: "cat1",
    children: [
      {
        name: "subcat1",
        children: [{ name: "childsubcat1" }],
      },
      {
        name: "subcat12",
        children: [{ name: "childsubcat12" }],
      },
    ],
  },
  {
    name: "cat2",
    children: [
      {
        name: "subcat2",
        children: [{ name: "childsubcat2" }],
      },
    ],
  },
];

const CategorySelector = ({ data, updateFields }: CategoryFormProps) => {
  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    updateFields({ brand: event.target.value });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    updateFields({
      category: event.target.value,
      subcategory: "",
      subchildCategory: "",
    });
  };

  const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
    updateFields({
      subcategory: event.target.value,
      subchildCategory: "",
    });
  };

  const handleSubchildCategoryChange = (event: SelectChangeEvent<string>) => {
    updateFields({ subchildCategory: event.target.value });
  };

  const selectedCategoryData = categories.find(item => {
    return item.name === data.category;
  });

  const selectedSubcategoryData = selectedCategoryData?.children.find(item => {
    return item.name === data.subcategory;
  });

  return (
    <div className="flex flex-col gap-[4rem] w-[70%] m-auto justify-center ">
      <div className="category-select flex flex-wrap gap-[1rem] ">
        <h2>Select Categories</h2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Category"
            value={data.category}
            onChange={handleCategoryChange}
          >
            {categories.map(item => {
              return (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {data.category && selectedCategoryData && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Sub Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Sub Category"
              value={data.subcategory}
              onChange={handleSubcategoryChange}
            >
              {selectedCategoryData?.children.map(item => {
                return (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

        {data.subcategory && selectedSubcategoryData?.children && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Sub Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Sub-child Category"
              value={data.subchildCategory}
              onChange={handleSubchildCategoryChange}
            >
              {selectedSubcategoryData.children.map(item => {
                return (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </div>
      <div className="brand-select flex  flex-wrap">
        <h2>Select Brand</h2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select brand"
            value={data.brand}
            onChange={handleBrandChange}
          >
            {/* {brands.map(brand => {
              return (
                <MenuItem key={brand.name} value={brand.name}>
                  {brand.name}
                </MenuItem>
              );
            })} */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CategorySelector;
