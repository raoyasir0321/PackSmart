import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import { uploadImage } from "@/api/services/productService";
import Spinner from "../Spinner";
import ProductSizingModal from "../productSizeModal";

const DynamicFormModal = ({
  isOpen,
  onClose,
  title,
  disableDropdown,
  fields,
  onSubmit,
  productSizes,
  isEditing = false,
  initialValues,
  isLoading = false,
  sizes,
  children,
}) => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = methods;

  const [previewImage, setPreviewImage] = useState(null);
  const [hasSizes, setHasSizes] = useState(false);
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [sizesData, setSizesData] = useState(null);
  const [disabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (initialValues?.imageUrl) {
      setPreviewImage(initialValues.imageUrl);
    } else {
      setPreviewImage(null);
    }
    console.log("initialValues", initialValues);
    reset(initialValues);
  }, [initialValues, reset]);

  const handleSizingSubmit = (sizes) => {
    setSizesData(sizes);
    setIsSizingModalOpen(false);
    const defaultSize = sizes.find((size) => size.isDefault);
    if (defaultSize) {
      setValue("price", defaultSize.price);
      setValue("quantity", defaultSize.quantity);
    }
  };

  const handleFormSubmit = async (data) => {
    // Disable all fields when save is clicked.
    setIsDisabled(true);

    if (
      sizes &&
      hasSizes &&
      (!sizesData || !sizesData.find((s) => s.isDefault))
    ) {
      alert("Please enter at least one size and mark one as default.");
      setIsDisabled(false);
      return;
    }

    const formData = { ...data };

    for (const field of fields) {
      if (field.type === "file" && data[field.key] instanceof FileList) {
        const file = data[field.key][0];
        formData.imageUrl = await uploadImage(file);
      }
    }

    if (formData.quantity) {
      formData.quantity = parseInt(formData.quantity, 10);
    }

    if (hasSizes && sizesData) {
      onSubmit(formData, sizesData);
      onClose();
      setIsDisabled(false);
    } else {
      onSubmit(formData);
      onClose();
      setIsDisabled(false);
    }
    setSizesData(null);

    setIsDisabled(false);
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue(key, e.target.files);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>{title || "Form"}</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {fields.map((field) => {
              // Skip rendering price/quantity fields in editing mode if productSizes are present.
              if (
                isEditing &&
                productSizes?.length > 0 &&
                (field.key === "price" || field.key === "quantity")
              ) {
                return null;
              }

              // When sizes are enabled, disable price/quantity fields.
              if (
                sizes &&
                (field.key === "price" || field.key === "quantity")
              ) {
                return (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label} {hasSizes && "(set by default size)"}
                    </label>
                    <Input
                      type={field.type || "text"}
                      {...register(field.key, { required: field.required })}
                      placeholder={field.placeholder || ""}
                      className={`w-full mt-1 p-2 border rounded ${
                        hasSizes ? "bg-gray-100" : ""
                      }`}
                      disabled={disabled || hasSizes}
                    />
                  </div>
                );
              }

              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      {...register(field.key, { required: field.required })}
                      placeholder={field.placeholder || ""}
                      className="w-full mt-1 p-2 border rounded"
                      disabled={disabled}
                    />
                  ) : field.type === "dropdown" ? (
                    <select
                      {...register(field.key, { required: field.required })}
                      className="w-full mt-1 p-2 border rounded"
                      disabled={disableDropdown}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <>
                      <Input
                        type="file"
                        onChange={(e) => handleImageChange(e, field.key)}
                        className="w-full mt-1 p-2 border rounded"
                        disabled={disabled}
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="mt-2 w-40 h-40 object-cover rounded border"
                        />
                      )}
                    </>
                  ) : (
                    <Input
                      type={field.type || "text"}
                      {...register(field.key, { required: field.required })}
                      placeholder={field.placeholder || ""}
                      className="w-full mt-1 p-2 border rounded"
                      disabled={disabled}
                    />
                  )}
                  {errors[field.key] && (
                    <p className="text-red-500 text-sm mt-1">
                      {field.label} is required.
                    </p>
                  )}
                </div>
              );
            })}

            {!isEditing && sizes && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasSizes"
                  checked={hasSizes}
                  onChange={(e) => setHasSizes(e.target.checked)}
                  className="mr-2"
                  disabled={disabled}
                />
                <label htmlFor="hasSizes" className="text-sm">
                  Is Product Support Sizes?
                </label>
                {hasSizes && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSizingModalOpen(true)}
                    className="mt-2"
                    disabled={disabled}
                  >
                    {sizesData ? "Edit Sizes" : "Add Sizes"}
                  </Button>
                )}
              </div>
            )}

            {isEditing && productSizes?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSizingModalOpen(true)}
                  className="mt-2 bg-blue-600 hover:bg-blue-600 text-white font-bold border-2 border-blue-700 shadow-lg"
                  disabled={disabled}
                >
                  {sizesData ? "Edit Sizes" : "Show Product Sizes"}
                </Button>
              </div>
            )}

            {children}

            <DialogFooter>
              <Button type="submit" disabled={disabled || isLoading}>
                {isLoading ? <Spinner size="sm" /> : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={disabled}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
      {(productSizes?.length > 0 || hasSizes) && (
        <ProductSizingModal
          isOpen={isSizingModalOpen}
          onClose={() => setIsSizingModalOpen(false)}
          onSubmit={handleSizingSubmit}
          isEditing={isEditing}
          productId={
            productSizes?.length > 0 && [productSizes][0][0]?.productId
          }
          initialSizes={
            isEditing || productSizes?.length > 0
              ? [productSizes][0][0].sizes
              : sizesData
          }
        />
      )}
    </Dialog>
  );
};

DynamicFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isLoading: PropTypes.bool,
  sizes: PropTypes.bool,
  children: PropTypes.node,
};

export default DynamicFormModal;
