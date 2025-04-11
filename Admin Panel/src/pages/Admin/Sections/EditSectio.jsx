import { Button } from "@/components/ui/button";
import DynamicFormModal from "@/components/DynamicFormModal";
import PropTypes from "prop-types";

const EditSection = ({ isOpen, onClose, initialData=[], onSubmit, categories }) => {

  console.log(initialData)
  const sectionFields = [
    { key: "name", label: "Section Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: false },
  ];

  return (
    <DynamicFormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Section"
      fields={sectionFields}
      onSubmit={onSubmit}
      initialValues={initialData}
      isLoading={false}
    />
  );
};

EditSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default EditSection;
