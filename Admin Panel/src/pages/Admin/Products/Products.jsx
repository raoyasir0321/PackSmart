import { useProducts } from "@/api/hooks/useProducts";
import { useSections } from "@/api/hooks/useSection";
import DynamicFormModal from "@/components/DynamicFormModal";
import ProductsDataTable from "@/components/ProductsDataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "./EditProduct";

const Products = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [deleteTrackRow, setTrackDeleteRow] = useState(null);
  const {
    fetchProducts,
    addProducts,
    updateProduct,
    deleteProduct,
    productSizeCreate,
    getProductSizes,
  } = useProducts();
  const [editModal, setEditModal] = useState(false);
  const { fetchSections } = useSections();
  const [showStockAndPrice, setshowStockAndPrice] = useState(false);
  const navigate = useNavigate();

  const {
    data: products,
    isPending: isLoadingProducts,
    isError: errorFetchingProducts,
  } = fetchProducts;
  const { data: sections, isPending: isLoadingSections } = fetchSections;
  const { data: productSizes, isPending: isLoadingSizes } = productSizeCreate;
  const { isPending: isDeleting, isError: isDeletingError } = deleteProduct;

  const { isPending: isUpdatingProducts } = updateProduct;
  const { isPending: isAdding, isPaused: loader } = addProducts;
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      key: "imageUrl",
      label: "",
      render: (row) => (
        <img
          src={row.imageUrl}
          alt={row.name}
          className="w-10 h-10 rounded object-cover"
        />
      ),
    },
    { key: "name", label: "Product Name" },
    // { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Stock" },
    { key: "action", label: "Action" },
  ];

  const productFields = [
    { key: "name", label: "Product Name", type: "text", required: true },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
    {
      key: "sectionId",
      label: "Section",
      type: "dropdown",
      required: false,
      options:
        sections?.map((section) => ({
          label: section.name,
          value: section._id,
        })) || [],
    },
    { key: "price", label: "Price", type: "number", required: true },
    { key: "quantity", label: "Stock", type: "number", required: true },
    {
      key: "currencyCode",
      label: "Currency",
      type: "dropdown",
      required: true,
      options: [{ label: "GBP", value: "GBP" }],
    },
    { key: "image", label: "Product Image", type: "file", required: false },
  ];
  console.log("isAdding", isAdding);
  const handleAddProduct = async (formData, sizesData) => {
    try {
      setLoading(true);

      if (sizesData && sizesData.length > 0) {
        const data = await addProducts.mutateAsync(formData);
        await productSizeCreate.mutateAsync({
          productId: data._id,
          sizes: sizesData,
        });
        setIsAddModalOpen(false);
      } else {
        await addProducts.mutateAsync(formData);
        setIsAddModalOpen(false);
      }

      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log("Deleting Product ID:", id);
    setTrackDeleteRow(id);
    await deleteProduct.mutateAsync(id);
    setTrackDeleteRow(null);
  };

  const renderAction = (product) => (
    <Button
      variant="link"
      className="text-blue-500 pl-2"
      onClick={() => navigate(`/admin/products/${product._id}`)}
    >
      Details
    </Button>
  );

  const handleEditProduct = (data) => {
    const { action, ...cleanedData } = data;
    setIsUpdateModalOpen(true);
    setSelectedProduct(cleanedData);
  };

  const handleUpdateProduct = async (data) => {
    console.log("handleUpdateProduct", data);
    await updateProduct.mutateAsync({ id: selectedProduct._id, data });
  };
  console.log("loading", isAdding);
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-4">
          <Button variant="outline">Filter</Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-bold">+</span> Add Product
          </Button>
        </div>
      </div>

      <DynamicFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Product"
        fields={productFields}
        onSubmit={handleAddProduct}
        isLoading={loading || addProducts.isPending}
        sizes={true}
      />

      <EditProduct
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        sections={sections || []}
        onSubmit={handleUpdateProduct}
        initialData={selectedProduct}
      />

      <div className="bg-white rounded text-black w-full shadow-md p-4">
        <ProductsDataTable
          onEdit={handleEditProduct}
          isError={errorFetchingProducts}
          columns={columns}
          data={products?.map((product) => ({
            ...product,
            action: renderAction(product),
          }))}
          isDeleting={deleteTrackRow}
          onDelete={handleDeleteProduct}
          isLoading={isLoadingProducts}
        />
      </div>
    </div>
  );
};

export default Products;
