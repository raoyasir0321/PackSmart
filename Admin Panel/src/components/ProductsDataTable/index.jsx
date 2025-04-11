import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Spinner from "../Spinner";

const ProductsDataTable = ({
  isError,
  columns,
  data,
  onDelete,
  isLoading,
  onEdit,
  isDeleting,
  isEditEnable = true,
  isDeleteEnable = true,
}) => {
  console.log("isLoadingProducts", isLoading);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isError ? (
          <TableRow>
            <TableCell colSpan={columns.length + 1} className="text-center">
              Server is Down
            </TableCell>
          </TableRow>
        ) : isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length + 1} className="text-center">
              <Spinner />
            </TableCell>
          </TableRow>
        ) : (
          data?.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
              <TableCell className="flex justify-end gap-2">
                {isEditEnable && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(row)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}

                {isDeleteEnable && (
                  <Button
                    disabled={isDeleting}
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(row._id)}
                  >
                    {isDeleting === row._id ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

ProductsDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ProductsDataTable;
