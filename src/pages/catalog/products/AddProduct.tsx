import React, { useState } from "react";
import TagInput from "../../../components/common/tagInput";
import DropdownSelect from "../../../components/common/dropDown";
import {
  useCreateProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from "../../../features/catalog/catalogApiSlice";
import Loader from "../../../components/common/loader";
import { Product } from "../../../types";

type Option = {
  title: string;
  id: string;
  parentCategoryId?: string | null;
  children?: Option[];
};
const initialCatData = {
  title: "",
  id: "",
  children: [],
};

const AddProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [hsn, setHsn] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<Option>({
    title: "",
    id: "",
  });
  const [selectedCat, setSelectedCat] = useState<Option>(initialCatData);
  const [selectedSubCat, setSelectedSubCat] = useState<Option>(initialCatData);
  const [selectedSubChildCat, setSelectedSubChildCat] =
    useState<Option>(initialCatData);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<
    { id: number; src: string; file: File }[]
  >([]);

  let imageIdCounter = 0;

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery({});
  const { data: brands, isLoading: brandsLoading } = useGetBrandsQuery({});
  const [createProduct, { isLoading: creatingProduct }] =
    useCreateProductMutation();

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleBrandChange = (option: Option) => {
    setSelectedBrand(option);
  };
  const handleCatChange = (option: Option) => {
    setSelectedCat(option);
  };

  const handleSubCatChange = (option: Option) => {
    setSelectedSubCat(option);
  };
  const handleSubChildCatChange = (option: Option) => {
    setSelectedSubChildCat(option);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImages = Array.from(files).map(file => ({
        id: imageIdCounter++, // Assign a unique identifier
        src: URL.createObjectURL(file), // Generate a data URL for displaying the image
        file: file,
      }));

      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (imageId: number) => {
    const updatedImages = selectedImages.filter(image => image.id !== imageId);
    setSelectedImages(updatedImages);
  };

  if (categoriesLoading || brandsLoading) return <Loader title="loading" />;
  if (creatingProduct) return <Loader title="creating" />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: Product = {
      title,
      hsn,
      description,
      brand: selectedBrand?.id,
      categories: [
        selectedCat?.id,
        selectedSubCat?.id,
        selectedSubChildCat?.id,
      ],
    };
    await createProduct({ ...body });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <div className="relative float-label-input">
            <input
              type="text"
              id="name"
              placeholder=" "
              autoComplete="off"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
            />
            <label
              htmlFor="name"
              className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out  px-2 text-grey-darker"
            >
              Name
            </label>
          </div>
          <div className="relative float-label-input">
            <input
              type="text"
              id="hsn"
              placeholder=" "
              autoComplete="off"
              value={hsn}
              onChange={e => setHsn(e.target.value)}
              className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
            />
            <label
              htmlFor="hsn"
              className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out  px-2 text-grey-darker"
            >
              HSN
            </label>
          </div>
        </div>
        <div className="relative float-label-input">
          <textarea
            id="description"
            placeholder=" "
            autoComplete="off"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
          />
          <label
            htmlFor="description"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out  px-2 text-grey-darker"
          >
            Description
          </label>
        </div>
        <div className="flex flex-col gap-5">
          <DropdownSelect
            options={brands}
            onChange={handleBrandChange}
            selectedOption={selectedBrand}
          />
          {/* Select category */}
          <div className="flex gap-5">
            <DropdownSelect
              options={categories}
              onChange={handleCatChange}
              selectedOption={selectedCat}
            />
            {selectedCat?.children && (
              <DropdownSelect
                options={selectedCat?.children}
                onChange={handleSubCatChange}
                selectedOption={selectedSubCat}
              />
            )}
            {selectedSubCat?.children && (
              <DropdownSelect
                options={selectedSubCat?.children}
                onChange={handleSubChildCatChange}
                selectedOption={selectedSubChildCat}
              />
            )}
          </div>
          <TagInput tags={tags} onChange={handleTagsChange} />
        </div>
        <div className="max-w-md p-4 bg-white rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">
            Upload Images
          </label>
          <div className="relative border border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
              multiple
              placeholder="Choose images..."
            />
            <div className="grid grid-cols-2 gap-4">
              {selectedImages.length > 0 ? (
                selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.src}
                      alt={`Selected ${index}`}
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.293a1 1 0 111.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-gray-400">No image selected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          create
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
