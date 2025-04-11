import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductsDataTable from "@/components/ProductsDataTable";
import { ArrowLeft } from "lucide-react";
import { useOrder } from "@/api/hooks/useOrder";

const OrderDetails = () => {
  const { state } = useLocation();

  const { order: orderFromState, orderItems, prevTab, orderId } = state || {};

  const { updateOrderStatus, singleOrder } = useOrder();

  const { data: fetchedOrderData, isLoading: isGetting } = singleOrder(orderId);
  const order =
    fetchedOrderData && Array.isArray(fetchedOrderData)
      ? fetchedOrderData[0]
      : orderFromState;

  const { data: updatedOrder, isPending: isUpdatingOrder } = updateOrderStatus;
  console.log("updatedOrder", updatedOrder);

  useEffect(() => {
    if (updatedOrder) {
      setCurrentStatus(updatedOrder.status);
    }
  }, [updatedOrder]);

  const items = orderItems || order?.orderItems || order?.orderitems || [];
  const options = ["PLACED", "DELIVERED", "COMPLETED"];
  const [availableOptions, setAvailableOptions] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(order?.status || "");
  const [newStatus, setNewStatus] = useState("");
  console.log("status", order?.status);

  useEffect(() => {
    let availableOpt;
    if (currentStatus === "INITIATED") {
      availableOpt = options.filter((opt) => opt === "PLACED");
    } else if (currentStatus === "PLACED") {
      availableOpt = options.filter((opt) => opt === "DELIVERED");
    } else {
      availableOpt = options.filter((opt) => opt === "COMPLETED");
    }
    setAvailableOptions(availableOpt);
  }, [currentStatus]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-xl text-gray-800">No order details available.</p>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getBadgeColor = (status) => {
    let color = "bg-orange-100 text-orange-800";
    if (status === "PLACED") color = "bg-purple-100 text-purple-800";
    else if (status === "DELIVERED") color = "bg-blue-100 text-blue-800";
    else if (status === "COMPLETED") color = "bg-green-100 text-green-800";
    return color;
  };
  const statusBadgeColor = getBadgeColor(currentStatus);

  const paymentInfo = order.paid ? order.paymentMethod || "Paypal" : "Unpaid";
  const shippingMethod = order.shippingMethod;

  const columns = [
    {
      key: "name",
      label: "Product",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <img
            src={row.product.imageUrl}
            alt={row.product.name}
            className="w-10 h-10 rounded"
          />
          <span>{row.product.name}</span>
        </div>
      ),
    },
    {
      key: "unitPrice",
      label: "Unit Price",
      render: (row) => `£${row.price?.toFixed(2)}`,
    },
    {
      key: "quantity",
      label: "Quantity",
    },
  ];

  const tableData = items;

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === currentStatus) return;
    try {
      await updateOrderStatus.mutateAsync({ orderId: order._id, newStatus });
      setCurrentStatus(newStatus);
      setNewStatus("");
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/admin">Home</Link> &gt;{" "}
        <Link to="/admin/orders">Orders</Link> &gt; Order Details
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Link to={`/admin/orders?tab=${prevTab}`}>
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Order ID: <span className="font-semibold">#{order._id}</span>
          </p>
          <p className="text-sm text-gray-600">
            Date: <span className="font-semibold">{formattedDate}</span>
          </p>
          <Badge className={statusBadgeColor}>{currentStatus}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Customer Information
          </h2>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Name:</span>{" "}
            {order.user?.name || "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Email:</span> {order.user?.email}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Phone:</span>{" "}
            {order.user?.phone || "N/A"}
          </p>
          <hr className="my-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Info</h2>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Method:</span> {paymentInfo}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Information
          </h2>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Shipping Method:</span>{" "}
            {shippingMethod}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Payment Method:</span> {paymentInfo}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            <span className="font-medium">Current Status:</span>{" "}
            <Badge className={statusBadgeColor}>{currentStatus}</Badge>
          </p>

          <div className="flex items-center space-x-2">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm"
            >
              <option value="">Select new status</option>
              {availableOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStatusUpdate}
              disabled={!newStatus || isUpdatingOrder}
            >
              {isUpdatingOrder ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
        <ProductsDataTable
          columns={columns}
          data={tableData}
          isLoading={false}
          isEditEnable={false}
          isDeleteEnable={false}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
