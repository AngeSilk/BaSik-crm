import Product from "../models/Product.js";

const getProducts = async (req=Request, res=Response) => {

    const products = await Product.find({status: true})

    res.status(200).json({
        products
    })
}

const getProduct = async(req=Request, res=Response) => {

    const {id} = req.params

    const product = await Product.findById(id)

    res.status(200).json({
        product
    })
}

const createProduct = async (req=Request, res=Response) => {

    const product = req.body

    try {

        const newProduct = new Product(product);

        await newProduct.save()

        res.status(201).json({
            msg: "Producto creado correctamente",
            product:newProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updateProduct = async(req=Request, res=Response) => {

    const {id} = req.params

    const {_id, status, ...product} = req.body

    /* Validación realizada en el middleware */

    try {

        const newProduct = await Product.findByIdAndUpdate(
            id, product, {new:true}
        )

        res.status(201).json({
            product:newProduct,
            msg: "Producto actualizado correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

const deleteProduct = async(req=Request, res=Response) => {

    const {id} = req.params

    /* Validación realizada en el middleware */

    try {

        const delProduct = await Product.findByIdAndUpdate(
            id, {status:false}, {new:true}
        )

        res.status(200).json({
            msg: "Producto eliminado correctamente",
            product:newProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

export {
    getProduct, getProducts, createProduct, updateProduct, deleteProduct
}