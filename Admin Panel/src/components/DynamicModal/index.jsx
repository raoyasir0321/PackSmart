import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const DynamicModal = ({ 
  isOpen, 
  onClose, 
  title, 
  fields, 
  data, 
  isLoading, 
  renderContent, 
  tableClassName = "" 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>{title || "Details"}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center p-4">Loading...</p>
        ) : data?.length > 0 ? (
          renderContent ? (
            renderContent(data)
          ) : (
            <table className={`w-full border-collapse border rounded ${tableClassName}`}>
              <thead>
                <tr>
                  {fields.map((field) => (
                    <th key={field.key} className="p-3 text-left font-bold border-b">
                      {field.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    {fields.map((field) => (
                      <td key={field.key} className="p-3 text-left">
                        {item[field.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p className="text-center p-4">No Data Found!</p>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

DynamicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  renderContent: PropTypes.func,
  tableClassName: PropTypes.string, 
};

export default DynamicModal;
