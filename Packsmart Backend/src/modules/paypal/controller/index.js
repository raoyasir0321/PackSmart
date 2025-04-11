const { captureOrder, createOrder } = require("../../../utils/paypal");
const Order = require("../../order/model");
const orders = async (req, res) => {
  try {
    const { orderId } = req.body;
    let order = await Order.findById({ _id: orderId })
    order = order.toObject()
    if (!order) return res.status(500).json({ error: "Failed to create order." });
    const { jsonResponse, httpStatusCode } = await createOrder(
      order.totalPrice
    );
    return res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    return res.status(500).json({ error: "Failed to create order." });
  }
};
const trackOrder = async (req, res) => {
  try {
    const { paypalOrderId, eComOrderId } = req.body;
    let order = await Order.findById({ _id: eComOrderId });
    order = order.toObject()
    if (!order) return res.status(404).json;
    const { jsonResponse, httpStatusCode } = await captureOrder(paypalOrderId);
    if (httpStatusCode !== 201) {
      return res.status(httpStatusCode).json(jsonResponse);
    }
    await req.context.orderService.updateOrderStatus({ _id: order._id }, { status: 'PLACED' })
    return res
      .status(httpStatusCode)
      .json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    return res.status(500).json({ error: "Failed to capture order." });
  }
};
module.exports = { trackOrder, orders };