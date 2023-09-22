import React, { useState } from "react";
import {
  useCreateBrandMutation,
  useGetBrandsQuery,
} from "../../../features/catalog/catalogApiSlice";
import Loader from "../../../components/common/loader";

// Define types for your brand objects
type Brand = {
  id: string;
  title: string;
};

const BrandComponent: React.FC = () => {
  const { data: brands, isLoading, refetch } = useGetBrandsQuery({});
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();

  const [inputVisible, setInputVisible] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Ensure that 'brands' is an array of 'Brand' objects
  const brandList: Brand[] = brands || [];
  // Filter the brand list based on the search query
  const filteredBrandList = brandList.filter(brand =>
    brand.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddClick = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddNewBrand = async () => {
    if (title.trim() !== "") {
      await createBrand({ title }).unwrap();
      setTitle("");
      setInputVisible(false);
      // After creating a new brand, refetch the brands list to get the updated data
      refetch();
    }
  };

  return (
    <section className="my-5 flex flex-col items-center">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search for a brand"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col items-center max-h-96 overflow-y-scroll">
        {filteredBrandList.map(brand => (
          <div
            className="w-36 text-center p-3 shadow-md border-2 capitalize mb-3 mx-2"
            key={brand.id}
          >
            {brand.title}
          </div>
        ))}
      </div>
      <div className="p-4">
        {!inputVisible && (
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Add new brand
          </button>
        )}

        {inputVisible && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter a value"
              value={title}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <button
              onClick={handleAddNewBrand}
              className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600 focus:outline-none"
            >
              Add
            </button>
          </div>
        )}
      </div>
      {isLoading && <Loader title="loading" />}
      {isCreating && <Loader title="creating" />}
    </section>
  );
};

export default BrandComponent;
