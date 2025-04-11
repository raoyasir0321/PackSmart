const expressAsyncHandler = require("express-async-handler");

module.exports = {
  createRecommendation: expressAsyncHandler(async (req, res) => {
    const { context, body } = req;
    const recommendation =
      await context.recommendationService.createRecommendation(body);
    return res.status(201).json({ data: { recommendation } });
  }),
  getAllRecommendation: expressAsyncHandler(async (req, res) => {
    const { context } = req;
    const recommendation =
      await context.recommendationService.getAllRecommendation();
    return res.status(200).json({ data: { recommendation } });
  }),
  deleteRecommendation: expressAsyncHandler(async (req, res) => {
    const {
      context,
      params: { id },
    } = req;
    const recommendation =
      await context.recommendationService.deleteRecommendation(id);
    return res.status(200).json({ data: { recommendation } });
  }),
  updateRecommendation: expressAsyncHandler(async (req, res) => {
    console.log("updateRecommendation");
    const {
      context,
      params: { id },
      body,
    } = req;
    const recommendation =
      await context.recommendationService.updateRecommendation(
        { _id: id },
        body
      );
    return res.status(200).json({ data: { recommendation } });
  }),
};
