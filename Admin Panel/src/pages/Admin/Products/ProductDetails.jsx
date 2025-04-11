import { useNavigate, useParams } from "react-router-dom";
// import { Spinner } from "@/components/Spinner";
import { useProducts } from "@/api/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Spinner from "@/components/Spinner";
import currencies from "@/utils/currencies";

const ProductDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate()
  const {singelProduct} = useProducts()
const {data:product,isPending:isLoading,isError:error} = singelProduct(id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <Spinner  size="lg"/>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className=" ">

        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Product Details</h1>
        </div>

        
        <div className="mb-6 border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h2>
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-lg shadow-sm object-contain max-h-64"
              />
            </div>

          
            <div className="flex-col w-full md:w-1/2 space-y-8">
              {/* <p className="text-gray-700 mb-2">
                <span className="font-semibold">Description:</span> {product.description}
              </p> */}
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Price:</span> {product.price} {  currencies[product.currencyCode]?.symbol }
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Stock:</span> {product.quantity}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Created At:</span>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-600">
          {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
