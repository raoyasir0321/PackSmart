const Product = require("../../product/model");


class filterService {
    async filterByWords(keyword) {
        const products = await Product.find(
            { $text: { $search: keyword } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
        let prod = products.map(obj => ({
            _id: obj._id,
            name: obj.name,
            description: obj.description,
            imageUrl: obj.imageUrl,
            price: obj.price
        }))
        return prod
    }
}


module.exports = new filterService()