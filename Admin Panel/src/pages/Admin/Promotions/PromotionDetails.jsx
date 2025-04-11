import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductsDataTable from "@/components/ProductsDataTable";
import Spinner from "@/components/Spinner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { usePromotion } from "@/api/hooks/usePromotion";

const PromotionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("promoId", id);

  const { singelPromo } = usePromotion();
  const { data: promotion, isPending: isLoading } = singelPromo(id);
  console.log("single promo", promotion);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (!promotion) {
    return <div className="text-center p-6">Promotion not found.</div>;
  }

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      render: (row) => (
        <img
          src={row.imageUrl}
          alt={row.productName}
          className="w-20 h-20 object-cover rounded"
        />
      ),
    },
    {
      key: "productName",
      label: "Product Name",
    },
    {
      key: "originalPrice",
      label: "Original Price",
      render: (row) => `${row.currencyCode} ${row.originalPrice}`,
    },
    {
      key: "discountedPrice",
      label: "Discounted Price",
      render: (row) => `${row.currencyCode} ${row.discountedPrice}`,
    },
    {
      key: "sizeName",
      label: "Size",
      render: (row) => row.sizeName || "-",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center mb-6">
        <button
          className="p-2 mr-4 hover:bg-gray-200 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Promotion Details</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{promotion.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-1/4">
                <img
                  src={promotion?.imageUrl}
                  alt={promotion.name}
                  className="w-full rounded-lg shadow-sm object-contain max-h-64"
                />
              </div>

              <div className="flex-col w-full md:w-1/2 space-y-8">
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Start Date:</span>{" "}
                  {new Date(promotion.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">End Date:</span>{" "}
                  {new Date(promotion.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Status:</span>{" "}
                  {promotion.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              {promotion.bannerImageUrl && (
                <div className="hidden md:block w-1/4 text-center">
                  <img
                    src={promotion.bannerImageUrl}
                    alt="Banner"
                    className="rounded-lg shadow-sm object-contain h-[600px] w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Banner Size: 534×2048px
                  </p>

                  <a
                    href={promotion.bannerImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-blue-500 mt-1 hover:underline"
                  >
                    View Full Banner
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Products in this Promotion
        </h2>
        <ProductsDataTable
          columns={columns}
          data={promotion.products || []}
          isDeleteEnable={false}
          isEditEnable={false}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default PromotionDetails;
