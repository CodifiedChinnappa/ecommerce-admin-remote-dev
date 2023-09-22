import React, { useState } from "react";

interface Options {
  title: string;
  id: string;
  parentCategoryId?: string | null;
  children?: Options[];
}

interface DropdownSelectProps {
  options: Options[];
  onChange: (option: any) => void;
  selectedOption: Options | any;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  onChange,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Options) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          {selectedOption?.title}
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform ${
              isOpen ? "-rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options &&
              options.map(option => (
                <button
                  key={option.title}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:bg-blue-100 focus:text-blue-800"
                  role="menuitem"
                >
                  {option.title}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
