import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MultiProductWizardModal from "@/components/MultiStepDynamicFormModal";
import ProductsDataTable from "@/components/ProductsDataTable";
import { useProducts } from "@/api/hooks/useProducts";
import { usePromotion } from "@/api/hooks/usePromotion";
import { useNavigate } from "react-router-dom";

import { uploadImage } from "@/api/services/productService";

const Promotions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { fetchProducts } = useProducts();
  const { getPromotions, cratePromotion, deleteProm } = usePromotion();
  const { data: promotions, isLoading: isLoadingPromo } = getPromotions;
  const { isPending: isDeleting } = deleteProm;
  const { data: products } = fetchProducts;
  const { isPending: isCreatingPromo } = cratePromotion;
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("Promotions", promotions);

  const promotionFields = [
    {
      key: "name",
      label: "Promotion Name",
      type: "text",
      placeholder: "Winter Sale",
      required: true,
    },
    {
      key: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      key: "endDate",
      label: "End Date",
      type: "date",
      required: true,
    },
    {
      key: "image",
      label: "Promotion Image",
      type: "file",
      required: true,
    },
    {
      key: "bannerImage",
      label: "Promotion Banner Image",
      type: "file",
      required: true,
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Promotion Name",
    },
    {
      key: "startDate",
      label: "Start Date",
      render: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      key: "endDate",
      label: "End Date",
      render: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (row.isActive ? "Active" : "Inactive"),
    },
    {
      key: "action",
      label: "Details",
    },
  ];

  const handleEdit = (promo) => {
    console.log("Edit promotion", promo);
  };

  const handleDelete = async (promoId) => {
    console.log("Delete promotion", promoId);
    await deleteProm.mutateAsync(promoId);
  };

  const handlePromotionSubmit = async (formData) => {
    let imageUrl = "";
    let bannerImageUrl = "";
    console.log("Form data", formData);

    try {
      setIsSubmitting(true);

      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
        console.log("Uploaded promotion image:", imageUrl);
      } else {
        alert("Promotion image is required");
        setIsSubmitting(false);
        return;
      }

      if (formData.bannerImage) {
        console.log("Banner image", formData.bannerImage);
        bannerImageUrl = await uploadImage(formData.bannerImage);
        console.log("Uploaded banner image:", bannerImageUrl);
      } else {
        alert("Banner image is required");
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      alert("Failed to upload images");
      console.error("Image upload failed:", error);
      setIsSubmitting(false);
      return;
    }

    const dataToSubmit = {
      ...formData,
      isActive: true,
      imageUrl,
      bannerImageUrl,
    };

    console.log("Final form data with images:", dataToSubmit);

    try {
      await cratePromotion.mutateAsync({ data: dataToSubmit });
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handleViewDetails = (promo) => {
    console.log("Open details for promotion:", promo);
    navigate(`/promotionDetails/${promo._id}`);
  };

  const renderAction = (promo) => {
    console.log("Promo", promo);
    return (
      <Button variant="outline" onClick={() => handleViewDetails(promo)}>
        Details
      </Button>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Promotions</h1>

      <Button onClick={() => setIsModalOpen(true)}>
        <span className="text-xl font-bold">+</span> Add Promotion
      </Button>

      <ProductsDataTable
        onEdit={handleEdit}
        columns={columns}
        data={promotions?.map((promo) => ({
          ...promo,
          action: renderAction(promo),
        }))}
        onDelete={handleDelete}
        isEditEnable={false}
        isLoading={isSubmitting || isCreatingPromo}
      />

      <MultiProductWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isSubmitting || isCreatingPromo}
        title="Add Promotion"
        promotionFields={promotionFields}
        onSubmit={handlePromotionSubmit}
        products={products}
      />
    </div>
  );
};

export default Promotions;
