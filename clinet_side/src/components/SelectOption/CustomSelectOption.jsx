import React, { useEffect, useRef, useState } from "react";

const CustomSelectOption = ({
  options = [],
  selectedOption,
  setSelectedOption,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // <div className="custom-select">
    //   <form>

    //     <select
    //       style={{ display: "none" }}
    //       value={selectedOption}
    //       onChange={(e) => setSelectedOption(e.target.value)}
    //     >
    //       {options.map((option, index) => (
    //         <option value={option} key={index}>
    //           {option}
    //         </option>
    //       ))}
    //     </select>

    //     <div
    //       className={`nice-select ${isOpen ? "open" : ""}`}
    //       ref={selectRef}
    //       onClick={(e) => {
    //         e.preventDefault();
    //         setIsOpen(!isOpen);
    //       }}
    //     >
    //       <span className="current">{selectedOption || placeholder}</span>
    //       <ul className="list">
    //         {options.map((option, index) => (
    //           <li
    //             className={`option ${
    //               selectedOption === option ? "selected focus" : ""
    //             }`}
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               setSelectedOption(option);
    //               setIsOpen(false);
    //             }}
    //             key={index}
    //           >
    //             {option}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </form>
    // </div>
    <></>
  );
};

export default CustomSelectOption;
