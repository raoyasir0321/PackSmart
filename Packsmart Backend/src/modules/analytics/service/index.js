const Order = require("../../order/model")

class AnalyticService {
    async getSalesReport() {
        let aggregate = [
            {
                $group: { _id: "$status", orderNumber: { $count: {} } }
            }
        ]
        let orders = await Order.aggregate(aggregate)
        const salesReportData = {
            labels: orders.map(item => item._id),
            datasets: [
                {
                    label: "Products",
                    data: orders.map(item => item.orderNumber),
                },
            ],
        };
        return salesReportData
    }

    async getRevenueReport() {
        let aggregate = [
            {
                $addFields: {
                    "dateAndTime": { $toDate: "$createdAt" }
                }
            },
            {
                $project: {
                    totalPrice: 1,
                    dateAndTime: { $dateToString: { format: "%B", date: "$dateAndTime" } }
                }
            },
            {
                $group: {
                    _id: "$dateAndTime",
                    revenue: { $sum: "$totalPrice" }
                }
            }
        ]
        let orders = await Order.aggregate(aggregate)
        const revenueReportData = {
            labels: orders.map(item => item._id),
            datasets: [
                {
                    label: "Income",
                    data: orders.map(item => item.revenue),
                },
            ],
        };
        return revenueReportData
    }

    async getNetReport() {
        let aggregate = [
            {
                $match: {
                    $or: [{ paid: true }, { paid: false }]
                }
            },
            {
                $group: {
                    _id: "$paid",
                    revenue: { $sum: "$totalPrice" }
                }
            }]
        let orders = await Order.aggregate(aggregate)
        const netReportData = {
            labels: orders.map(item => item._id),
            datasets: [
                {
                    label: "Net Income",
                    data: orders.map(item => item.revenue),
                },
            ],
        };
        return netReportData
    }

    async getBestProductReport() {
        let aggregate = [
            {
                $lookup: {
                    from: "orderitems",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderitems"
                }
            },
            {
                $unwind: "$orderitems"
            },
            {
                $lookup: {
                    from: "products",
                    let: { productId: "$orderitems.productId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$productId"] }
                            }
                        },
                        {
                            $project: { name: 1 }
                        }
                    ],
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $group: {
                    _id: "$orderitems.productId",
                    count: { $sum: 1 },
                    name: { $first: "$product.name" }
                }
            },
            {
                $sort: { count: -1 }
            }
        ];
        const orders = await Order.aggregate(aggregate)
        const netReportData = {
            labels: orders.map(item => item.name),
            datasets: [
                {
                    label: "Most Selling products",
                    data: orders.map(item => item.count),
                },
            ],
        };
        return netReportData
    }

    async getLatestTransactionReport() {
        let aggregate = [
            {
                $match: {
                    $and: [{ status: "PLACED" }, { paid: true }]
                }
            },
            {
                $sort: { updatedAt: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "orderitems",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderitems"
                }
            },
            {
                $unwind: "$orderitems"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "orderitems.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $project: {
                    _id: "$_id",
                    status: "$status",
                    data: "$updatedAt",
                    price: "$totalPrice"
                }
            }
        ]
        let orders = await Order.aggregate(aggregate)
        // const netReportData = {
        //     labels: orders.map(item => item),
        //     datasets: [
        //         {
        //             label: "Latest Transaction",
        //             data: orders.map(item => item),
        //         },
        //     ],
        // };
        return orders
    }

    async getBestSectionReport() {
        let aggregate = [
            {
              $lookup: {
                from: "orderitems",
                localField: "_id",
                foreignField: "orderId",
                as: "orderitems"
              }
            },
            {
              $unwind: "$orderitems"
            },
            {
              $lookup: {
                from: "products",
                let: { productId: "$orderitems.productId" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$productId"] }
                    }
                  },
                  {
                    $project: { sectionId: 1 } // Only keep sectionId
                  }
                ],
                as: "product"
              }
            },
            {
              $unwind: "$product"
            },
            {
              $lookup: {
                from: "sections",
                let: { sectionId: "$product.sectionId" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$sectionId"] }
                    }
                  },
                  {
                    $project: { name: 1 } // Only keep section name
                  }
                ],
                as: "section"
              }
            },
            {
              $unwind: "$section"
            },
            {
              $group: {
                _id: "$section._id",
                count: { $sum: 1 },
                name: { $first: "$section.name" }
              }
            }
          ];
          
        let orders = await Order.aggregate(aggregate)
        const netReportData = {
            labels: orders.map(item => item.name),
            datasets: [
                {
                    label: "Most Selling Sections",
                    data: orders.map(item => item.count),
                },
            ],
        };
        return netReportData
    }

    async getBestCategoryReport() {
        let aggregate = [
            {
                $lookup: {
                    from: "orderitems",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderitems"
                }
            },
            {
                $unwind: "$orderitems"
            },
            {
                $lookup: {
                    from: "products",
                    let: { productId: "$orderitems.productId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$productId"] }
                            }
                        },
                        {
                            $project: { sectionId: 1 }
                        }
                    ],
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $lookup: {
                    from: "sections",
                    let: { sectionId: "$product.sectionId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$sectionId"] }
                            }
                        },
                        {
                            $project: { categoryId: 1 }
                        }
                    ],
                    as: "section"
                }
            },
            {
                $unwind: "$section"
            },
            {
                $lookup: {
                    from: "categories",
                    let: { categoryId: "$section.categoryId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$categoryId"] }
                            }
                        },
                        {
                            $project: { name: 1 }
                        }
                    ],
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $group: {
                    _id: "$category._id",
                    count: { $sum: 1 },
                    name: { $first: "$category.name" }
                }
            }
        ];

        let orders = await Order.aggregate(aggregate)
        const netReportData = {
            labels: orders.map(item => item.name),
            datasets: [
                {
                    label: "Most Selling Category",
                    data: orders.map(item => item.count),
                },
            ],
        };
        return netReportData
    }
}

module.exports = new AnalyticService()