import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const Form = ({ fields, onSubmit, buttonText,isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data); 
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            {...register(field.name, field.validation)}
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name].message}</p>
          )}
        </div>
      ))}
      <Button type="submit" className="w-full">
      {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner  size="sm" color="white"/> Processing...
          </div>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
};


Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      validation: PropTypes.object,
    })
  ).isRequired,
  isLoading:PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Form;
