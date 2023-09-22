import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { MdOutlineExpandMore } from "react-icons/md";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../../../features/catalog/catalogApiSlice";
import Loader from "../../../components/common/loader";
import { Category } from "../../../types";

const CategoryComponent: React.FC = () => {
  const { data: categories, isLoading, refetch } = useGetCategoriesQuery({});
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const [isAddCatVisible, setIsAddCatVisible] = useState<boolean>(false);
  const [isAddSubCatVisible, setIsAddSubCatVisible] = useState<boolean>(false);
  const [isAddSubChildCatVisible, setIsAddSubChildCatVisible] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event.preventDefault();
      setExpanded(isExpanded ? panel : false);
    };

  // Declare filteredCategoriesList as a state variable
  const [filteredCategoriesList, setFilteredCategoriesList] = useState<
    Category[]
  >(categories || []);

  // Use useEffect to filter the categories when data changes
  useEffect(() => {
    if (categories) {
      const filteredList = categories.filter((category: Category) =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategoriesList(filteredList);
    }
  }, [categories, searchQuery]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddNewCategory = async (categoryId?: string | null) => {
    if (title.trim() !== "") {
      await createCategory({ title, parentId: categoryId }).unwrap();
      setTitle("");
      setIsAddCatVisible(false);
      setIsAddSubCatVisible(false);
      setIsAddSubChildCatVisible(false);
      refetch();
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category._id);
  };

  return (
    <section className="my-5">
      {isLoading ? (
        <Loader title={"loading"} />
      ) : (
        <div className="flex  justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search for a category"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="max-h-96 overflow-y-scroll">
              {filteredCategoriesList.length > 0 ? (
                filteredCategoriesList.map(category => (
                  <div
                    className={`w-36 text-center p-3 shadow-md border-2 capitalize mb-3 mx-2 cursor-pointer ${
                      selectedCategory === category._id ? "bg-blue-200" : ""
                    }`}
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.title}
                  </div>
                ))
              ) : (
                <p>No categories present, try adding</p>
              )}
            </div>
            <div className="p-4">
              {!isAddCatVisible && (
                <button
                  onClick={() => setIsAddCatVisible(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Add new category
                </button>
              )}

              {isAddCatVisible && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter a value"
                    value={title}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <button
                    onClick={() => handleAddNewCategory()}
                    className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover-bg-green-600 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4  my-5">
            {filteredCategoriesList.length > 0 &&
              (
                filteredCategoriesList.find(
                  item => item._id === selectedCategory
                )?.children || []
              ).map((item, index) => (
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  key={item._id}
                >
                  <AccordionSummary
                    expandIcon={<MdOutlineExpandMore />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography>{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-4">
                      {item?.children ? (
                        <>
                          {item.children.map(category => (
                            <div
                              className="w-36 text-center p-3 shadow-md border-2 capitalize mb-3 mx-2 cursor-pointer "
                              key={category._id}
                            >
                              {category.title}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <p>No categories present, try adding</p>
                        </>
                      )}
                      <div className="p-4">
                        {!isAddSubCatVisible && (
                          <button
                            onClick={() => setIsAddSubCatVisible(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                          >
                            Add new sub-child category
                          </button>
                        )}

                        {isAddSubCatVisible && (
                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder="Enter a value"
                              value={title}
                              onChange={handleInputChange}
                              className="border p-2 rounded"
                            />
                            <button
                              onClick={() => handleAddNewCategory(item._id)}
                              className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600 focus:outline-none"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            {selectedCategory && (
              <div className="py-4">
                {!isAddSubChildCatVisible && (
                  <button
                    onClick={() => setIsAddSubChildCatVisible(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Add new sub-category
                  </button>
                )}

                {isAddSubChildCatVisible && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter a value"
                      value={title}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                    <button
                      onClick={() => handleAddNewCategory(selectedCategory)}
                      className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {isCreating && <Loader title={"creating"} />}
    </section>
  );
};

export default CategoryComponent;
