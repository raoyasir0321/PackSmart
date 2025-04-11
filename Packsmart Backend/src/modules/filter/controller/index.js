const expressAsyncHandler = require("express-async-handler");

module.exports = {
    filterByWords: expressAsyncHandler(async (req, res) => {
        const { context, query: { keyword } } = req
        let text = await context.filterService.filterByWords(keyword)
        return res.status(200).json({ data: text })
    })
}