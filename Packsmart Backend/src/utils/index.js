const mongoose = require("mongoose");
const CustomErrorApi = require("../error");
const jwt = require('jsonwebtoken');
const Product = require("../modules/product/model");
const ProductSize = require("../modules/productSizes/model")
module.exports = {
    requiredFieldsPresent: (requiredfields, userdata) => {
        const missingFields = []
        requiredfields.forEach(field => {
            if (userdata[field] === null || userdata[field] === undefined) {
                missingFields.push(field)
            }
        });
        if (missingFields.length > 0) {
            return {
                isValid: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            };
        }

        return { isValid: true };
    },
    createToken: async (user) => {
        let { _id: id, email } = user;
        id = id.toString()
        let access_token = await jwt.sign({ id, email }, process.env.ACCESS_KEY, {
            expiresIn: "15d",
        });

        return {
            access_token,
        };
    },
    createDocument: async (data, model) => {
        try {
            const document = new model(data);
            const savedDocument = await document.save();
            return savedDocument.toObject();
        } catch (error) {
            console.error(`Error creating document for model ${model}:`, error);
            throw new CustomErrorApi(error.message, 500);
        }
    },
    getById: async (id, model) => {
        const document = await model.findById(id);
        if (!document) {
            throw new CustomErrorApi("Document not found.", 404);
        }
        return document.toObject();
    },
    getByField: async (queryData, model) => {
        const doc = await model.findOne(queryData);
        if (!doc) throw new CustomErrorApi("Error retrieving document", 500);
        return doc.toObject()
    },
    getAllByField: async (queryData, model) => {
        const doc = await model.find(queryData);
        if (!doc) throw new CustomErrorApi("Error retrieving document", 500);
        return doc.map(doc => doc.toObject())
    },
    extractFields: (obj, fields) => {
        const extractFromObject = (singleObj) => {
            const result = {};
            fields.forEach(field => {
                if (Object.prototype.hasOwnProperty.call(singleObj, field)) {
                    result[field] = singleObj[field];
                }
            });
            return result;
        };
        if (Array.isArray(obj)) {
            return obj.map(obj => extractFromObject(obj));
        } else {
            return extractFromObject(obj);
        }
    },
    updateSingleDocument: async (filterParam, data, model) => {
        const updatedDocument = await model.findOneAndUpdate(
            filterParam,
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!updatedDocument) {
            throw new Error("No document found with the given search parameters.");
        }
        return updatedDocument.toObject();
    },
    getAll: async (model) => {
        const dataArray = await model.find({})
        return dataArray.map(doc => doc.toObject());
    },
    deleteOne: async (id, model) => {
        const deleted = await model.findByIdAndDelete(id)
        if (!deleted) throw new CustomErrorApi("Failed to delete Entity", 500)
        return true
    },
    validateFieldsForUpdate: (updates, requiredFields) => {
        const errors = [];
        requiredFields.forEach(field => {
            if (field in updates) {
                const value = updates[field];
                if (value === null || value === undefined || value === '') {
                    errors.push(`${field} is required and cannot be null.`);
                }
                if (typeof value === 'number' && value < 0) {
                    errors.push(`${field} must be a non-negative number.`);
                }
            }
        });
        if (errors.length > 0) {
            throw new CustomErrorApi(errors.join(" "), 500);
        }
    },
    applyJoin: async (fromTable, toTableName, singleDocumentId = null) => {
        const Model = mongoose.models[toTableName];
        if (!Model) {
            throw new CustomErrorApi(`Model "${modelName}" not found.`, 404);
        }
        const foreignKey = `${fromTable.modelName.toLowerCase()}Id`;
        let aggregationPipeline = [
            {
                $lookup: {
                    from: Model.collection.name,
                    localField: '_id',
                    foreignField: foreignKey,
                    as: `${Model.collection.name}`
                }
            }
        ];
        if (singleDocumentId) {
            aggregationPipeline.unshift({
                $match: { _id: singleDocumentId }
            });
        }
        const joinedData = await fromTable.aggregate(aggregationPipeline);
        return joinedData;
    },
    populate: async (model, fieldName, condition) => {
        try {

            const query = model.find(condition);
            query.populate(fieldName);
            const data = await query.exec();
            return data;
        } catch (error) {
            throw new CustomErrorApi(error.message, 500)
        }
    },
    oldValidateOrder: async (orderDetails) => {
        const { orderItem, totalPrice, totalQuantity } = orderDetails;
        let calculatedTotalPrice = 0;
        let calculatedTotalQuantity = 0;

        try {
            const validationPromises = orderItem.map(async (item) => {
                const { productId, quantity: productQuantity, price: productPrice, size } = item;

                if (!productId || productQuantity === null || productPrice === null) {
                    throw new CustomErrorApi('Product details must be complete and valid.', 400);
                }

                const product = await Product.findById(productId);

                if (!product) {
                    throw new CustomErrorApi(`No product found with ID ${productId}.`, 400);
                }

                if (product.quantity < productQuantity) {
                    throw new CustomErrorApi(`Insufficient stock for product ID ${productId}.`, 400);
                }

                if (product.price !== productPrice) {
                    throw new CustomErrorApi(`Product price mismatch for product ID ${productId}.`, 400);
                }

                calculatedTotalPrice += productPrice * productQuantity;
                calculatedTotalQuantity += productQuantity;
            });

            await Promise.all(validationPromises);

            if (calculatedTotalPrice !== totalPrice) {
                return { valid: false, orderMessage: 'Total price does not match the sum of individual product totals.' };
            }

            if (calculatedTotalQuantity !== totalQuantity) {
                return { valid: false, orderMessage: 'Total quantity does not match the sum of individual product quantities.' };
            }

            return { valid: true, orderMessage: 'Order is valid.' };
        } catch (error) {
            return { valid: false, orderMessage: error.message };
        }
    },
    validateOrder: async (orderDetails) => {
        const { orderItem } = orderDetails;
        const validatePromises = orderItem.map(async (item) => {
            if (item.size) {
                const productSizePromies = item.size.map(async elem => {
                    return await ProductSize.findOne({
                        productId: new mongoose.Types.ObjectId(item.productId),
                        sizes: {
                            $elemMatch: {
                                name: elem.name,
                                quantity: { $gte: elem.quantity }
                            }
                        }
                    }).lean();
                })
                return await Promise.all(productSizePromies)
            } else {
                return await Product.findOne({ _id: item.productId, quantity: { $gte: item.quantity } }).lean()
            }
        })
        let allItem = await Promise.all(validatePromises)
        let valHolder = []
        function checkIsNull(arr) {
            arr.forEach(elem => {
                if (Array.isArray(elem)) {
                    checkIsNull(elem)
                } else {
                    valHolder.push(elem === null)
                }
            })
            return valHolder.some(elem => elem === true)
        }
        let val = checkIsNull(allItem)
        if (val) {
            return { valid: false, orderMessage: 'Order is Not Valid' };
        }
        allItem = allItem.flat()
        let totalPrice = 0;
        let totalQuantity = 0;

        orderItem.forEach((orderItem) => {
            const product = allItem.find((p) => p.productId ? p.productId.toString() === orderItem.productId : p._id.toString() === orderItem.productId);

            if (orderItem.size) {
                orderItem.size.forEach((size) => {
                    const productSize = product.sizes.find((s) => s.name === size.name);
                    totalPrice += productSize.price * size.quantity;
                    totalQuantity += size.quantity;
                });
            } else {
                totalPrice += product.price * orderItem.quantity;
                totalQuantity += orderItem.quantity;
            }
        });
        return { valid: true, orderMessage: 'Order is valid.', totalPrice, totalQuantity };

    },
    bulkCreate: async (payload, model) => {
        try {
            const data = await model.insertMany(payload)
            return data.map(item => item.toObject())
        } catch (error) {
            throw new CustomErrorApi('Error while creating the orderItems', 400)
        }
    }
}