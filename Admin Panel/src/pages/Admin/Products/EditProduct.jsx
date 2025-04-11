import { Button } from "@/components/ui/button";
import DynamicFormModal from "@/components/DynamicFormModal";
import PropTypes from "prop-types";
import { useProducts } from "@/api/hooks/useProducts";
import { useEffect } from "react";

const EditProduct = ({
  isOpen,
  onClose,
  initialData = [],
  onSubmit,
  sections,
  handleShowPriceAndStock,
}) => {
  console.log(initialData);

  const productFields = [
    { key: "name", label: "Product Name", type: "text", required: true },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
    { key: "price", label: "Price", type: "number", required: true },
    { key: "quantity", label: "Stock", type: "number", required: true },
    {
      key: "currencyCode",
      label: "Currency",
      type: "dropdown",
      required: true,
      options: [
        { label: "GBP", value: "GBP" },
        // { label: "USD", value: "USD" },
      ],
    },
    { key: "imageUrl", label: "Product Image", type: "file", required: false },
  ];

  const { getProductSizes } = useProducts();
  const { data: productSizes, isPending: isGettingSize } = getProductSizes(
    initialData._id
  );
  console.log("productSizes", productSizes);
  return (
    <DynamicFormModal
      isOpen={isOpen}
      isEditing={true}
      onClose={onClose}
      title="Update Product"
      fields={productFields}
      onSubmit={onSubmit}
      productSizes={productSizes}
      previewImage={initialData.imageUrl}
      initialValues={initialData}
      isLoading={false}
    />
  );
};

EditProduct.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default EditProduct;
