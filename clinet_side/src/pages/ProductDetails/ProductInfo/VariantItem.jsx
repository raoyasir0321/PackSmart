import React, { useEffect, useRef, useState } from "react";
import { GetColorName } from "hex-color-to-color-name";

const VariantItem = ({
  variant,
  selectedVariant,
  setSelectedVariants,
  variantComboReference,
  allVariants,
  isMobileScreen

}) => {
  const [openSortingOptions, setOpenSortingOptions] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenSortingOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    // console.log("option", option);
    setSelectedVariants((currentVariant) => {
     
      const newVariants = [...currentVariant];
      const index = allVariants.findIndex((v) => v.key === variant.key);
      newVariants[index] = option?.variant_id.toString();

      const compatibleCombo = Object.keys(variantComboReference).find(
        (combo) => {
          const comboVariants = combo.split(",");
          return comboVariants[index] === option.variant_id.toString();
        }
      );

      if (compatibleCombo) {
        return compatibleCombo.split(",");
      }

      return newVariants;
    });
  };

  const getFirstAvailableOption = () => {
    return (
      variant.values.find((option) => isOptionAvailable(option)) ||
      variant.values[0]
    );
  };

  const selected =
    variant.values.find(
      (item) =>
        selectedVariant[allVariants.findIndex((v) => v.key === variant.key)] ===
        item.variant_id.toString()
    ) || getFirstAvailableOption();

  const isOptionAvailable = (option) => {
    return Object.keys(variantComboReference).some((combo) => {
      const comboVariants = combo.split(",");
      return (
        comboVariants[allVariants.findIndex((v) => v.key === variant.key)] ===
        option.variant_id.toString()
      );
    });
  };

  if (variant.display_style_id === 4) {
    return (
      <div className="thumbnail mt-3">
        <p>
          {variant.key} : {selected?.variant_title}
        </p>
        <div
          className=" d-flex align-items-center justify-content-start flex-wrap"
          style={{ gap: isMobileScreen ? '10px' : "20px" }}
        >
          {variant.values.length > 0 &&
            variant.values.map((imageVariant, index) => {
              return (
                <img
                  src={imageVariant.image_path}
                  key={index}
                  className={`image-variant ${
                    imageVariant?.variant_id === selected?.variant_id
                      ? "image-variant-selected"
                      : ""
                  }`}
                  // style={{ maxHeight: "100px" ,}}
                  style={{
                    objectFit: "contain",
                    height: isMobileScreen ? '60px' : "70px",
                    width: isMobileScreen ? '45px' : "60px",
                    opacity: isOptionAvailable(imageVariant) ? 1 : 0.5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleOptionSelect(imageVariant)}
                />
              );
            })}
        </div>
      </div>
    );
  }
  if (variant.display_style_id === 2) {
    return (
      <div className="color pt-2">
        <p>Color : {GetColorName(selected.variant_title)}</p>
        <div className="form-group d-flex">
          {variant.values.length > 0 &&
            variant.values.map((option, index) => (
              <div
                className="userInitials"
                style={{
                  background: `${option.variant_title}`,
                  borderColor: `${option.variant_title}`,
                  cursor: "pointer",
                  opacity: isOptionAvailable(option) ? 1 : 0.5,
                  marginRight: '6px'
                }}
                key={"color-variant" + index}
                onClick={() => handleOptionSelect(option)}
              ></div>
            ))}
        </div>
      </div>
    );
  }
  if (variant.display_style_id === 3) {
    return (
      <div className="color" style={{marginTop: '20px'}}>
        <p>{variant.key}</p>
        <div className="form-group d-flex" style={{ gap: "10px" }}>
          {variant.values.length > 0 &&
            variant.values.map((option, index) => (
              <div
                className={`button-variant ${
                  option?.variant_id === selected?.variant_id
                    ? "button-variant-selected"
                    : ""
                }`}
                key={index}
                style={{
                  opacity: isOptionAvailable(option) ? 1 : 0.5,
                  cursor: "pointer",
                }}
                onClick={() => handleOptionSelect(option)}
              >
                {option?.variant_title}
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="size" style={{marginTop: isMobileScreen ? '10px' : '20px'}}> 
      <p>{variant.key}</p>
      <div
        className={`nice-select ${openSortingOptions ? "open" : ""}`}
        ref={selectRef}
        onClick={() => setOpenSortingOptions(!openSortingOptions)}
      >
        <span className="current">{selected?.variant_title}</span>
        <ul className="list">
          {variant.values.map((option, index) => (
            <li
              key={`${index}${option.variant_id}`}
              className={`option ${
                option.variant_id === selected?.variant_id
                  ? "selected focus"
                  : ""
              }`}
              style={{
                opacity: isOptionAvailable(option) ? 1 : 0.5,
                cursor: "pointer",
              }}
              onClick={() => handleOptionSelect(option)}
            >
              {option.variant_title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VariantItem;
