import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Printer,
  Trash2,
  Edit,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useOrder } from "@/api/hooks/useOrder";

const THRESHOLD_MS = 3600000;

const Orders = () => {
  // const [selectedTab, setSelectedTab] = useState("all");
  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchParams({ tab: selectedTab });
  }, [selectedTab, setSearchParams]);

  
  const { fetchOrders } = useOrder();
  const { data: orders, isPending: isLoadingOrders, isError: isErrorFetchingOrders } = fetchOrders;

  if (isLoadingOrders) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-lg text-gray-800">Loading orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-lg text-gray-800">No orders found.</p>
      </div>
    );
  }

  const sortedOrders = orders.slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const newOrdersCount = sortedOrders.filter(
    (order) =>
      order.status === "INITIATED" &&
      new Date() - new Date(order.createdAt) < THRESHOLD_MS
  ).length;

  const placedOrdersCount = sortedOrders.filter(
    (order) => order.status === "PLACED"
  ).length;
  const deliveredOrdersCount = sortedOrders.filter(
    (order) => order.status === "DELIVERED"
  ).length;
  const completedOrdersCount = sortedOrders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  const filteredOrders = sortedOrders.filter((order) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "new") {
      return (
        order.status === "INITIATED" &&
        new Date() - new Date(order.createdAt) < THRESHOLD_MS
      );
    }
    return order.status.toLowerCase() === selectedTab;
  }).filter((order) => {
    const searchMatch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.shippingMethod &&
        order.shippingMethod.toLowerCase().includes(searchTerm.toLowerCase()));
    return searchMatch;
  });


  const totalSpent = filteredOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  return (
    <div className="p-6">
  
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
          <TabsList>
            <TabsTrigger value="all">
              All [{orders.length}]
            </TabsTrigger>
            <TabsTrigger value="new">
              New [{newOrdersCount}]
              {newOrdersCount > 0 && (
                <span className="ml-1 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </TabsTrigger>
            <TabsTrigger value="placed">
              Placed [{placedOrdersCount}]
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered [{deliveredOrdersCount}]
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed [{completedOrdersCount}]
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">Filters</Button>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Checkbox id="selectAll" />
          <label htmlFor="selectAll" className="text-gray-700">
            Select All
          </label>
          <Button variant="secondary" className="flex items-center gap-1">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="secondary" className="flex items-center gap-1">
            <Edit className="w-4 h-4" /> Update Order
          </Button>
          <Button variant="destructive" className="flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div> */}
      </div>


      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isNew =
            order.status === "INITIATED" &&
            new Date() - new Date(order.createdAt) < THRESHOLD_MS;
          return (
            <Card key={order._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order._id}</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center">
                    {order.status}
                    {isNew && <span className="ml-1 inline-block w-2 h-2 bg-green-500 rounded-full"></span>}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  {order.shippingNumber && (
                    <p className="text-xs text-gray-500">
                      Shipping #: {order.shippingNumber}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {order.products &&
                    order.products.slice(0, 1).map((product) => (
                      <img
                        key={product.id}
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 rounded"
                      />
                    ))}
                  {order.products && order.products.length > 1 && (
                    <span className="text-xs text-gray-700">
                      +{order.products.length - 1} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-lg font-bold text-gray-900">
                  £{order.totalPrice.toFixed(2)}
                </p>
                <div className="flex space-x-2">
                  {/* <Button variant="outline" size="sm">
                    Print
                  </Button> */}
                  <Button variant="outline" size="sm">
                  <Link
                      to="/admin/order-details"
                      state={{
                        order: order,
                        orderItems: order.orderitems,
                        backtoHome: false,
                        prevTab:selectedTab
                        // from: "/admin/order-history",
                      }}
                      // className="text-blue-600 hover:underline"
                    >
                      Update Status <i className="fa fa-angle-right ms-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link
                      to="/admin/order-details"
                      state={{
                        order: order,
                        orderItems: order.orderitems,
                        backtoHome: false,
                        prevTab:selectedTab
                        // from: "/admin/order-history",
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      View Details <i className="fa fa-angle-right ms-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {filteredOrders.length} orders out of {orders.length}
        </p>
        {/* <div>
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="ml-2">
            Next
          </Button>
        </div> */}
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg text-gray-900 font-semibold">
          Total Spent: £{totalSpent.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Orders;
