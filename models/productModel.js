const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "kosong nama"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }, image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;