import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PricesField = ({ products }) => {

  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Promotion Prices</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Price Entry {index + 1}</span>
            {fields.length > 1 && (
              <Button variant="destructive" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              {...register(`prices.${index}.productId`, { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a product</option>
              {products &&
                products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original Price
            </label>
            <Input
              type="number"
              placeholder="Original Price"
              {...register(`prices.${index}.originalPrice`, { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discounted Price
            </label>
            <Input
              type="number"
              placeholder="Discounted Price"
              {...register(`prices.${index}.discountedPrice`, { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size Name (optional)
            </label>
            <Input
              type="text"
              placeholder="Size (if applicable)"
              {...register(`prices.${index}.sizeName`)}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            productId: "",
            originalPrice: "",
            discountedPrice: "",
            sizeName: "",
          })
        }
      >
        Add Price Entry
      </Button>
    </div>
  );
};

export default PricesField;
