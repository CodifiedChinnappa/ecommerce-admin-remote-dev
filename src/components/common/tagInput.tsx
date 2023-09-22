import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [newTag, setNewTag] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      const trimmedTag = newTag.trim();
      if (!tags.includes(trimmedTag)) {
        onChange([...tags, trimmedTag]);
        setNewTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    onChange(updatedTags);
  };

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 mr-2 mt-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 10l-1.647 1.646a1 1 0 101.414 1.414L8.708 11.42l1.646 1.646a1 1 0 001.414-1.414L10.12 10l1.646-1.646a1 1 0 00-1.414-1.414L8.708 8.58 7.062 6.934a1 1 0 00-1.414 1.414L6.293 10 4.646 11.646a1 1 0 101.414 1.414L5.88 11.42l1.646-1.646a1 1 0 00-1.414-1.414L4.46 10l-1.646-1.646a1 1 0 00.001-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="w-full px-2 py-1 mt-2 border rounded-lg focus:outline-none"
        placeholder="Add a tag..."
        value={newTag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagInput;
