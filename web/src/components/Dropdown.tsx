import { FC, useState, useRef, useEffect } from "react";
import classNames from "classnames";

interface DropdownProps {
  options: string[];
  selected: Set<string>;
  onChange?: (selected: Set<string>) => void;
  styles?: string;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  selected,
  onChange,
  styles = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyword, setSearchKeyword] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    const updatedSelection = new Set(selected);
    if (updatedSelection.has(option)) updatedSelection.delete(option);
    else updatedSelection.add(option);

    onChange?.(updatedSelection);
  };

  return (
    <div className={classNames("relative w-64", styles)} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center justify-between">
          <span className="block truncate">Select Services</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-10 w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Search input */}
          <input
            type="text"
            className="border-gray-300 border border-solid w-full p-2 outline-none"
            value={keyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />

          {options
            .filter((op) => op.includes(keyword))
            .map((option, index) => (
              <label
                key={index}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  checked={selected.has(option)}
                  onChange={() => handleOptionClick(option)}
                  aria-checked={selected.has(option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
