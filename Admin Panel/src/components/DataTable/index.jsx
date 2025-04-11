import React from "react";
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
import { Trash2 } from "lucide-react";
import Spinner from "@/components/Spinner"; 

const DataTable = ({ columns, data = [], isLoading=false, onDelete }) => {
  console.log(data);

  return (
    <div className="relative w-full">
    
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
          {isLoading ? (
       <TableRow>
                   <TableCell colSpan={columns.length + 1} className="text-center">
                     <Spinner />
                   </TableCell>
                 </TableRow>
      ) :data.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={row.onClick}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>{row[column.key]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  Nothing Available!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
  
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

export default DataTable;
