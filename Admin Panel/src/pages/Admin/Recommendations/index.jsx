import { useProducts } from "@/api/hooks/useProducts";
import { useRecommendation } from "@/api/hooks/useRecommendation";
// import { updateRecommendation } from "@/api/services/recommendationService";
import DynamicFormModal from "@/components/DynamicFormModal";
import ProductsDataTable from "@/components/ProductsDataTable";
// import RecommendationsDataTable from "@/components/RecommendationsDataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    getRecommendations,
    createRecommendation,
    deleteRecommendation,
    updateRecommendation,
  } = useRecommendation();
  const { fetchProducts } = useProducts();
  const {
    data: products,
    isPending: isLoadingProducts,
    isError: errorFetchingProducts,
  } = fetchProducts;
  const { data: recommendations, isLoading: isGetting } = getRecommendations;
  const { isPending: isDeleting } = deleteRecommendation;
  const { isPending: isCreating } = createRecommendation;
  const { isPending: isUpdating } = updateRecommendation;
  const navigate = useNavigate();

  const [selectedRecom, setSelectedRecom] = useState({});
  const [editing, setEditing] = useState(false);
  const columns = [
    {
      key: "imageUrl",
      label: "",
      render: (row) => (
        <img
          src={row.imageUrl}
          alt={row.productName}
          className="w-10 h-10 rounded object-cover"
        />
      ),
    },
    { key: "productName", label: "Product Name" },
    { key: "description", label: "Description" },
    { key: "scale", label: "Rating" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Stock" },
    // {
    //   key: "action",
    //   label: "Action",
    //   render: (row) => (
    //     <Button
    //       variant="link"
    //       className="text-blue-500"
    //       onClick={() => navigate(`/admin/recommendations/${row._id}`)}
    //     >
    //       Details
    //     </Button>
    //   ),
    // },
  ];

  const recommendationFields = [
    {
      key: "productId",
      label: "Product",
      type: "dropdown",
      required: true,
      options:
        products?.map((product) => ({
          label: product.name,
          value: product._id,
        })) || [],
    },
    {
      key: "scale",
      label: "Rating (Scale)",
      type: "number",
      required: true,
    },
  ];

  const handleAddRecommendation = async (formData) => {
    try {
      // console.log(formData)
      const data = {
        ...formData,
        scale: parseInt(formData.scale),
      };
      console.log(data);
      await createRecommendation.mutateAsync(data);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding recommendation:", error);
      alert(error.response?.data?.message || "Failed to add recommendation.");
    }
  };

  const handleDeleteRecommendation = async (id) => {
    try {
      console.log("id", id);
      await deleteRecommendation.mutateAsync(id);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding recommendation:", error);
      alert(
        error.response?.data?.message || "Failed to delete recommendation."
      );
    }
  };

  const handleUpdateRecommendation = async (data) => {
    try {
      console.log("data", data);
      const id = data._id;
      await updateRecommendation.mutateAsync({ id, data });
      setEditing(false);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding recommendation:", error);
      alert(
        error.response?.data?.message || "Failed to update recommendation."
      );
    }
  };

  const handleEditProduct = (data) => {
    setIsAddModalOpen(true);
    setSelectedRecom(data);
    setEditing(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Recommendations</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <span className="text-xl font-bold">+</span> Add Recommendation
        </Button>
      </div>

      <DynamicFormModal
        isOpen={isAddModalOpen}
        initialValues={selectedRecom}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedRecom({});
          setEditing(false);
        }}
        title="Add Recommendation"
        fields={recommendationFields}
        disableDropdown={editing}
        onSubmit={
          editing ? handleUpdateRecommendation : handleAddRecommendation
        }
        isLoading={isCreating}
      />

      <div className="bg-white rounded text-black w-full shadow-md p-4">
        <ProductsDataTable
          columns={columns}
          data={
            recommendations?.data?.recommendation?.map((rec) => ({
              ...rec,
            })) || []
          }
          isLoading={isGetting || isDeleting || isUpdating}
          onDelete={handleDeleteRecommendation}
          onEdit={handleEditProduct}
        />
      </div>
    </div>
  );
};

export default Recommendations;
