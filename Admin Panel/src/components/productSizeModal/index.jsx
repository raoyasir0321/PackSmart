// ProductSizingModal.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/api/hooks/useProducts";
import { useUpdateProductSize } from "@/api/mutations/useProductMutation";

const ProductSizingModal = ({ isOpen, onClose, onSubmit, initialSizes,isEditing,productId }) => {

console.log("productId",productId)
  const {updateProductSize} = useProducts()
  const { data:updatedSize,isPending:isUpdatingSize} = updateProductSize
  console.log("updatedSize",updatedSize)
console.log("initialSizes Edit Product", initialSizes )
const processedInitialSizes = Array.isArray(initialSizes)
  ? {
      small: initialSizes.find((s) => s.name === "small") || {},
      medium: initialSizes.find((s) => s.name === "medium") || {},
      large: initialSizes.find((s) => s.name === "large") || {},
      defaultSize: initialSizes.find((s) => s.isDefault)?.name || "small",
    }
  : initialSizes;
  console.log("processedInitialSizes",processedInitialSizes)
  const defaultValues = {
    small_price: processedInitialSizes?.small?.price || "",
    small_quantity: processedInitialSizes?.small?.quantity || "",
    medium_price: processedInitialSizes?.medium?.price || "",
    medium_quantity: processedInitialSizes?.medium?.quantity || "",
    large_price: processedInitialSizes?.large?.price || "",
    large_quantity: processedInitialSizes?.large?.quantity || "",
    defaultSize: processedInitialSizes?.defaultSize || "small",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });


  useEffect(() => {
    reset(defaultValues);
  }, [initialSizes, reset]);


  const handleFormSubmit = async(data) => {
    const sizes = [
      {
        name: "small",
        price: Number(data.small_price),
        quantity: Number(data.small_quantity),
        isDefault: data.defaultSize === "small",
      },
      {
        name: "medium",
        price: Number(data.medium_price),
        quantity: Number(data.medium_quantity),
        isDefault: data.defaultSize === "medium",
      },
      {
        name: "large",
        price: Number(data.large_price),
        quantity: Number(data.large_quantity),
        isDefault: data.defaultSize === "large",
      },
    ];
      if(isEditing){
        const newSizes = sizes.map(({isDefault,...rest})=>rest)        
        const data = {
          productId,
          sizes:newSizes
        }
        console.log("updated data",data)
        await updateProductSize.mutateAsync({ id: productId, data });
      }else{
        onSubmit(sizes);
      }

    
    onClose();
  };

  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Product Sizes</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {["small", "medium", "large"].map((size) => (
            <div key={size} className="border p-4 rounded">
              <div className="flex items-center justify-between">
                <h3 className="font-bold capitalize">{size}</h3>

                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    value={size}
                    {...register("defaultSize", { required: true })}
                  />
                  <span className="text-sm">Default</span>
                </label>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm">Price</label>
                  <Input
                    type="number"
                    {...register(`${size}_price`, { required: false, min: 0 })}
                    className="mt-1 p-2 border rounded"
                  />
                  {errors[`${size}_price`] && (
                    <span className="text-red-500 text-sm">
                      Price is required and must be non-negative.
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm">Quantity</label>
                  <Input
                    type="number"
                    {...register(`${size}_quantity`, { required: false, min: 0 })}
                    className="mt-1 p-2 border rounded"
                  />
                  {errors[`${size}_quantity`] && (
                    <span className="text-red-500 text-sm">
                      Quantity is required and must be non-negative.
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <DialogFooter>
            <Button type="submit">Save Sizes</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

ProductSizingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialSizes: PropTypes.shape({
    small: PropTypes.shape({
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    medium: PropTypes.shape({
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    large: PropTypes.shape({
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    defaultSize: PropTypes.string,
  }),
};

export default ProductSizingModal;
