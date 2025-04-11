import React, { useEffect, useMemo, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  useGetProductReport,
  useGetSectionReport,
  useGetCategoryReport,
  useGetSalesReport,
  useGetRevenueReport,
  useGetTransactionReport,
} from "@/api/queries/useAnalytics";
import {
  monthOrder,
  netIncomeCalculator,
  totalReturnCalculator,
} from "@/utils/helper";
import currencies from "@/utils/currencies";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { useNavigate } from "react-router-dom";

const TotalViewPerformance = () => {
  const [selectedOption, setSelectedOption] = useState("products");

  const { data: productReportData, isLoading: isLoadingProduct } =
    useGetProductReport();
  const { data: sectionReportData, isLoading: isLoadingSection } =
    useGetSectionReport();
  const { data: categoryReportData, isLoading: isLoadingCategory } =
    useGetCategoryReport();

  let chartData;
  let loading = false;
  if (selectedOption === "products") {
    chartData = productReportData;
    loading = isLoadingProduct;
  } else if (selectedOption === "section") {
    chartData = sectionReportData;
    loading = isLoadingSection;
  } else if (selectedOption === "category") {
    chartData = categoryReportData;
    loading = isLoadingCategory;
  }

  const modifiedChartData = chartData ? { ...chartData } : null;

  const generateColors = (n) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
      const hue = Math.floor((360 / n) * i);
      colors.push(`hsl(${hue}, 70%, 65%)`);
    }
    return colors;
  };

  if (
    modifiedChartData &&
    modifiedChartData.datasets &&
    modifiedChartData.datasets.length > 0 &&
    modifiedChartData.labels &&
    modifiedChartData.labels.length > 0
  ) {
    modifiedChartData.datasets[0].backgroundColor = generateColors(
      modifiedChartData.labels.length
    );
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Total View Performance</h2>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="border rounded p-1"
        >
          <option value="products">Products</option>
          <option value="section">Section</option>
          <option value="category">Category</option>
        </select>
      </div>
      {loading ? (
        <p>Loading chart data...</p>
      ) : modifiedChartData ? (
        <div className="relative h-96">
          <Doughnut
            data={modifiedChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" },
                title: {
                  display: true,
                  text: modifiedChartData.datasets[0]?.label,
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${context.formattedValue}`;
                    },
                  },
                },
              },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">565K</span>
          </div>
        </div>
      ) : (
        <p>No chart data available</p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const generateColors = (n) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
      const hue = Math.floor((360 / n) * i);
      colors.push(`hsl(${hue}, 70%, 65%)`);
    }
    return colors;
  };
  const {
    data: salesReport,
    isLoading: isLoadingSales,
    isError: isErrorSales,
  } = useGetSalesReport();

  const {
    data: revenueReport,
    isLoading: isLoadingRevenue,
    isError: isErrorRevenue,
  } = useGetRevenueReport();

  if (revenueReport && revenueReport.datasets.length > 0) {
    // console.log("revenueData", revenueData);
    revenueReport.datasets[0].backgroundColor = generateColors(
      revenueReport.labels.length
    );
  }
  const sortedRevenueReport = useMemo(() => {
    if (
      revenueReport &&
      revenueReport.labels &&
      revenueReport.datasets.length > 0
    ) {
      const combined = revenueReport?.labels.map((label, index) => ({
        label,
        data: revenueReport.datasets[0].data[index],
        backgroundColor: revenueReport?.datasets[0].backgroundColor[index],
      }));
      combined.sort((a, b) => monthOrder[a.label] - monthOrder[b.label]);
      return {
        labels: combined.map((item) => item.label),
        datasets: [
          {
            label: revenueReport.datasets[0].label,
            data: combined.map((item) => item.data),
            backgroundColor: combined.map((item) => item.backgroundColor),
          },
        ],
      };
    }
    return null;
  }, [revenueReport, monthOrder]);

  const revenueData = sortedRevenueReport || {
    labels: [],
    datasets: [],
  };
  const {
    data: transactionReport,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useGetTransactionReport();

  const fallbackData = {
    labels: [],
    datasets: [],
  };

  const transactions = transactionReport || [];

  if (salesReport && salesReport.datasets.length > 0) {
    // console.log("revenueData", revenueData);
    salesReport.datasets[0].backgroundColor = generateColors(
      salesReport.labels.length
    );
  }
  const [actualRevPerc, setActualRevPerc] = useState({
    netAmount: 0,
    netPercentage: 0,
  });
  const [totalReturn, setTotalReturn] = useState({
    absolute: 0,
    percentage: 0,
  });
  useEffect(() => {
    const result = netIncomeCalculator(revenueData);
    if (result) {
      setActualRevPerc(result);
    } else {
      setActualRevPerc(0);
    }
  }, [revenueData]);

  useEffect(() => {
    const result = totalReturnCalculator(revenueData);
    console.log("totalReturn", result);
    if (result) {
      setTotalReturn(result);
    } else {
      setTotalReturn({ absolute: 0, percentage: 0 });
    }
  }, [revenueData]);

  return (
    <div className="p-6 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Manage Packsmart</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* <input
            type="text"
            placeholder="Search products or data..."
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="January 2024 - May 2024"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          {/* <button className="bg-[rgb(31,41,55)] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Add New Product
          </button> */}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Status Update</h2>
          <p>Sales revenue increased 40% in 1 week</p>
        </div> */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Net Income</h2>
          <p>
            {currencies["GBP"].symbol} {actualRevPerc?.netAmount}{" "}
            <span
              className={
                actualRevPerc?.netPercentage >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              ({actualRevPerc?.netPercentage}%) from last month
            </span>
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Return</h2>
          <p>
            {currencies["GBP"].symbol} {totalReturn?.absolute}{" "}
            <span className="text-green-600">({totalReturn?.percentage}%)</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          {isLoadingTransactions ? (
            <p>Loading transactions...</p>
          ) : isErrorTransactions ? (
            <p>Failed to load transactions</p>
          ) : transactions.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Order Id</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-t cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      navigate(`/admin/order-details`, {
                        state: { orderId: tx._id },
                      })
                    }
                  >
                    <td className="p-2">{tx._id}</td>
                    <td className="p-2">{tx.status}</td>
                    <td className="p-2">{tx.data}</td>
                    <td className="p-2">{tx.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found</p>
          )}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>
          {isLoadingRevenue ? (
            <p>Loading revenue chart...</p>
          ) : isErrorRevenue ? (
            <p>Failed to load revenue chart</p>
          ) : (
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text:
                      revenueData.datasets[0]?.label || "Income vs. Expenses",
                  },
                },
              }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">Sales Report</h2>
          {isLoadingSales ? (
            <p>Loading sales report...</p>
          ) : isErrorSales ? (
            <p>Failed to load sales report</p>
          ) : (
            <Bar
              data={salesReport || fallbackData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text:
                      salesReport?.data?.datasets?.[0]?.label ||
                      "Product Stats",
                  },
                },
              }}
            />
          )}
        </div>

        <TotalViewPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
