import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import React, { useState } from "react";
import DynamicFormModal from "@/components/DynamicFormModal"; 
import DynamicModal from "@/components/DynamicModal"; 
import { useCategories } from "@/api/hooks/useCategories";
import { Eye, Trash2 } from "lucide-react";
import Spinner from "@/components/Spinner";

const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const { fetchCategories, addCategory, deleteCategory, fetchCategorySections } = useCategories();
  const [deleteTrackRow, setTrackDeleteRow] = useState({});
  const { data: categories, isPending: isLoadingCategories } = fetchCategories;
  const { data: sections, isPending: isLoadingSections } = fetchCategorySections(selectedCategory?._id);
  const { isPending: isDeleting } = deleteCategory;
  const { isPending: isAdding } = addCategory;


  console.log(categories)
  const categoryFields = [
    { key: "name", label: "Category Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: false },
    { key: "image", label: "Category Image", type: "file", required: true },
  ];

  const handleAddCategory = async (data) => {
    await addCategory.mutateAsync(data); 
    setIsAddModalOpen(false); 
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    setTrackDeleteRow((prev) => ({ ...prev, [id]: true }));
    await deleteCategory.mutateAsync(id);
    setTrackDeleteRow((prev) => ({ ...prev, [id]: false }));
  };


  const columns = [
    { key: "name", label: "Category Name" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center gap-2 mb-4"
        disabled={isAdding}
      >
        {isAdding ? <Spinner size="sm" /> : <span className="text-xl font-bold">+</span>} Add Category
      </Button>

      <div className="flex justify-center">
        <div className="bg-white rounded text-black w-full">
          {isLoadingCategories ? (
            <div className="flex justify-center py-10">
              <Spinner size="lg" />
            </div>
          ) : (
            <DataTable
              isLoading={isLoadingCategories}
              columns={columns}
              data={categories?.map((category) => ({
                name: category.name,
                description: category.description,
                createdAt: new Date(category.createdAt).toLocaleDateString(),
                actions: (
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenModal(category)} 
                    >
                      <Eye />
                    </Button>
                    <Button 
                      variant="outline"
                      size="icon"
                      disabled={isDeleting}
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      {deleteTrackRow[category._id] ? <Spinner size="sm" /> : <Trash2 />}
                    </Button>
                  </div>
                ),
              }))}
            />
          )}
        </div>
      </div>

      <DynamicFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Category"
        fields={categoryFields}
        onSubmit={handleAddCategory} 
        isLoading={isAdding}
      />

      <DynamicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Sections for ${selectedCategory?.name}`}
        fields={[
          { key: "name", label: "Category Name" },
          { key: "description", label: "Description" },
        ]}
        data={sections || []}
        isLoading={isLoadingSections}
        tableClassName="text-sm table-auto w-full"
      />
    </div>
  );
};

export default Categories;
