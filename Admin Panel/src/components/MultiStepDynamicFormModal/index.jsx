import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useForm, FormProvider } from "react-hook-form";
import Spinner from "../Spinner";

const MultiStepDynamicFormModal = ({
  isOpen,
  onClose,
  title = "Add Promotion",
  promotionFields,
  onSubmit,
  isLoading,
  products = [],
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      isActive: true,
      prices: [],
    },
  });

  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isOpen) {
      reset();
      setCurrentStep(0);
    }
  }, [isOpen, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <PromotionBasics promotionFields={promotionFields} errors={errors} />
      );
    } else {
      const productIndex = currentStep - 1;
      return (
        <ProductStep index={productIndex} products={products} errors={errors} />
      );
    }
  };

  const handleNextStep = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    setValue("prices", [...getValues("prices"), emptyProduct()]);
    setCurrentStep(1);
  };

  const addAnotherProduct = () => {
    const currentPrices = getValues("prices");
    setValue("prices", [...currentPrices, emptyProduct()]);
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    handleSubmit(handleFormSubmit)();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <div className="mb-4">{renderStepContent()}</div>

          <DialogFooter>
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={handleBackStep}>
                Back
              </Button>
            )}

            {currentStep === 0 && (
              <Button type="button" onClick={handleNextStep}>
                Next Step
              </Button>
            )}

            {currentStep > 0 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAnotherProduct}
                >
                  Add Another Product
                </Button>
                <Button type="button" onClick={handleFinish}>
                  {isLoading ? <Spinner size="sm" /> : "Finish"}
                </Button>
              </>
            )}
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepDynamicFormModal;

function emptyProduct() {
  return {
    productId: "",
    originalPrice: "",
    discountedPrice: "",
    sizeName: "",
  };
}

MultiStepDynamicFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  promotionFields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  products: PropTypes.array,
};

function PromotionBasics({ promotionFields, errors }) {
  const { register, setValue } = useFormContext();
  const [previewImage, setPreviewImage] = useState(null);
  const [previewBannerImage, setPreviewBannerImage] = useState(null);

  //  onChange of image input
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      const aspectRatio = height / width;

      if (key === "bannerImage") {
        if (aspectRatio < 1.5) {
          alert("Banner should be vertical (recommended: 9:16 aspect ratio).");
          setPreviewBannerImage(null);
          setValue("bannerImage", null);
          return;
        }
        setPreviewBannerImage(URL.createObjectURL(file));
        setValue("bannerImage", file);
      }

      if (key === "image") {
        setPreviewImage(URL.createObjectURL(file));
        setValue("image", file);
      }
    };
  };

  console.log("previewImage", previewImage);
  const handleShowImage = (field) => {
    if (field.key === "image" && previewImage) {
      return (
        <img src={previewImage} className="mt-2 w-full h-32 rounded border" />
      );
    } else if (field.key === "bannerImage" && previewBannerImage) {
      return (
        <img
          src={previewBannerImage}
          className="mt-2 w-full h-32 rounded border"
        />
      );
    }
  };
  console.log("previewBannerImage", previewBannerImage);
  return (
    <div className="space-y-4">
      {promotionFields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.key === "bannerImage" && (
              <span className="text-gray-500 text-xs ml-1">
                (534×2048 pixels)
              </span>
            )}
          </label>

          {field.type === "file" ? (
            <>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, field.key)}
                className="w-full mt-1 p-2 border rounded"
              />
              {
                handleShowImage(field)
                // && (
                //       <img
                //         src={previewImage}
                //         alt="Preview"
                //         className="mt-2 w-full h-full object-cover rounded border"
                //       />
                //     )
              }
            </>
          ) : (
            <input
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              {...register(field.key, {
                required: field.required,
                minLength: field.minLength || 1,
              })}
              className="w-full mt-1 p-2 border rounded"
            />
          )}

          {errors[field.key] && (
            <p className="text-red-500 text-sm mt-1">
              {field.label} is required.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

import { useFormContext, useWatch } from "react-hook-form";

function ProductStep({ index, products, errors }) {
  const { register, setValue, control } = useFormContext();

  const productId = useWatch({ control, name: `prices.${index}.productId` });
  const selectedSize = useWatch({ control, name: `prices.${index}.sizeName` });

  const product = products.find((p) => p._id === productId);

  const productSizes =
    product && product.productsizes && product.productsizes.length > 0
      ? product.productsizes[0].sizes
      : [];
  const hasSizes = productSizes && productSizes.length > 0;

  useEffect(() => {
    if (productId) {
      if (product) {
        if (hasSizes) {
          if (selectedSize) {
            const sizeObj = productSizes.find(
              (s) => s.name.toLowerCase() === selectedSize.toLowerCase()
            );
            if (sizeObj) {
              setValue(
                `prices.${index}.originalPrice`,
                sizeObj.price.toString()
              );
            }
          } else {
            setValue(`prices.${index}.originalPrice`, "");
          }
        } else if (product.price) {
          setValue(`prices.${index}.originalPrice`, product.price.toString());
        }
      }
    } else {
      setValue(`prices.${index}.originalPrice`, "");
    }
  }, [
    productId,
    selectedSize,
    product,
    productSizes,
    hasSizes,
    index,
    setValue,
  ]);

  const productPath = `prices.${index}`;

  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Product Entry {index + 1}</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Product
        </label>
        <select
          {...register(`${productPath}.productId`, { required: true })}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Select a product</option>
          {products?.map((prod) => (
            <option key={prod._id} value={prod._id}>
              {prod.name}
            </option>
          ))}
        </select>
        {errors?.prices?.[index]?.productId && (
          <p className="text-red-500 text-sm mt-1">Product is required.</p>
        )}
      </div>

      {hasSizes && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Size Name
          </label>
          <select
            {...register(`${productPath}.sizeName`)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select a size</option>
            {productSizes.map((sz) => (
              <option key={sz.name} value={sz.name}>
                {sz.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Original Price
        </label>
        <input
          type="number"
          {...register(`${productPath}.originalPrice`, { required: true })}
          className="w-full p-2 border rounded mt-1"
          placeholder="Original Price"
        />
        {errors?.prices?.[index]?.originalPrice && (
          <p className="text-red-500 text-sm mt-1">
            Original Price is required.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Discounted Price
        </label>
        <input
          type="number"
          {...register(`${productPath}.discountedPrice`, { required: true })}
          className="w-full p-2 border rounded mt-1"
          placeholder="Discounted Price"
        />
        {errors?.prices?.[index]?.discountedPrice && (
          <p className="text-red-500 text-sm mt-1">
            Discounted Price is required.
          </p>
        )}
      </div>
    </div>
  );
}
