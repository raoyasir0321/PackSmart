import { useParams, useNavigate } from "react-router-dom";
// import { useGetSectionById, useGetSectionProducts, useGetSectionCategories } from "@/api/queries/useSection";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import { ArrowLeft } from "lucide-react";
import { useSections } from "@/api/hooks/useSection";
import { useLocation } from "react-router-dom";


const SectionDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate()
  const location = useLocation(); 
  const { section, category } = location.state || {};  
  console.log(location.state)

  const {fetchSectionCategories,fetchSectionProducts } = useSections() 
  // const { data: section, isLoading: isLoadingSection } = fetchSectionCategories(id);
  const { data: products, isLoading: isLoadingProducts } =fetchSectionProducts(id);
  // const { data: categories, isLoading: isLoadingCategories } = useGetSectionCategories(id); //
console.log(products)
  
  const productColumns = [
    { key: "name", label: "Product Name" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "description", label: "Description" }

  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Section Details</h1>
        </div>


        <div className="mb-6 border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{section?.name}</h2>
          <p className="text-gray-600 mb-1">{section?.description}</p>
          <p className="text-gray-500">Created At: {new Date(section?.createdAt).toLocaleDateString()}</p>
        </div>


        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
        <div className=" mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          
            <div
              key={category?._id}
              className="px-4 py-2 bg-black text-sm font-medium rounded-full shadow-sm text-center text-white hover:bg-gray-800 transition"
            >
              {category?.name}
            </div>
          
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Products</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm text-black w-full">
          <DataTable columns={productColumns} isLoading={isLoadingProducts} data={ products || []} />
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
