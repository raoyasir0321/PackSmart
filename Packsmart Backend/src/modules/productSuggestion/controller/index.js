const expressAsyncHandler = require("express-async-handler");

const getSuggestion = expressAsyncHandler(async (req, res) => {
    const { body, context } = req
    const suggestion = await context.productSuggestionService.getAllproductsForSuggestion(body, context)
    return res.status(200).json({ data: suggestion })
})
module.exports = { getSuggestion }