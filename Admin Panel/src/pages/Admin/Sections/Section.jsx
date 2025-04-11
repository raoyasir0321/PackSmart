import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import DynamicFormModal from "@/components/DynamicFormModal";
import { useCategories } from "@/api/hooks/useCategories";
import { useSections } from "@/api/hooks/useSection";
import { useNavigate } from "react-router-dom";
import EditSection from "./EditSectio";
import Spinner from "@/components/Spinner";

const Section = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [selectedSection, setSelectedSection] = useState(null);
  const [deleteTrackRow, setTrackDeleteRow] = useState({});
  const { fetchSectionsWithCategory, addSection, updateSection, deleteSection } = useSections();
  const { isPending:isAdding } = addSection;
  const { data: sections, isLoading: isLoadingSection } = fetchSectionsWithCategory;
  const { isPending:isDeleting } = deleteSection;
  const {isPending:isUpdating} = updateSection
  const { fetchCategories } = useCategories();
  const { data: categories, isLoading } = fetchCategories;

  const columns = [
    { key: "name", label: "name" },
    { key: "description", label: "Description" },
    { key: "actions", label: "Actions" },
  ];
  const navigate = useNavigate(); 
 
  const handleAddSection = async (data) => {
    await addSection.mutateAsync(data); 
    setIsAddModalOpen(false); 
  };

  const handleEditSection = (section) => {
    setSelectedSection(section); 
    setIsModalOpen(true);
  };

  const handleUpdateSection = async (data) => {
    await updateSection.mutateAsync({ id: selectedSection._id, data });
    setIsModalOpen(false);
  };

  const handleDeleteSection = async (id) => {
    setTrackDeleteRow((prev) => ({ ...prev, [id]: true }));
    await deleteSection.mutateAsync(id);
    setTrackDeleteRow((prev) => ({ ...prev, [id]: false }));
  };

  const renderActions = (section) => (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.stopPropagation(); 
          handleEditSection(section);
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline"
        size="icon"
        disabled={deleteTrackRow[section._id]} 
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteSection(section._id);
        }}
      >
        {deleteTrackRow[section._id] ? (
          <Spinner className="h-2 w-2" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  const sectionFields = [
    { key: "name", label: "Section Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: false },
    {
      key: "categoryId",
      label: "Category",
      type: "dropdown", 
      required: true,
      options: categories?.map((category) => ({
        label: category.name,
        value: category._id,
      })),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sections</h1>

      <Button
        onClick={() => setIsAddModalOpen(true)} 
        className="flex items-center gap-2 mb-4"
        disabled={isAdding}
      >
        {isAdding ? <Spinner size="sm" /> : <span className="text-xl font-bold">+</span>} Add Section
      </Button>

      <DynamicFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} 
        title="Add Section"
        fields={sectionFields}
        onSubmit={handleAddSection}
        // isLoading={isUpdating}
      />

      <EditSection
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedSection} 
        onSubmit={handleUpdateSection} 
        categories={categories || []}
      />

      <div className="flex justify-center">
        <div className="text-black w-full">
          <DataTable
            columns={columns}
            data={sections?.map((section) => ({
              ...section,
              actions: renderActions(section),
              onClick: () => navigate(`/sections/${section._id}`, {
                state: { section, category: section.categoryId }
              }),
            }))}
            isLoading={isUpdating || isLoadingSection}
          />
        </div>
      </div>
    </div>
  );
};

export default Section;
