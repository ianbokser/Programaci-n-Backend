import { Router } from "express"
import Product from "../models/Product.js"

const router = Router()

router.get('/',async (req,res)=>{
    try {
        const { page = 1, limit = 10} = req.query
        const products = await Product.paginate({},{page,limit})
        const result = {
            payload:products.docs,
            nextPage:products.nextPage,
            prevPage:products.prevPage,
            hasNextPage:products.hasNextPage,
            hasPrevPage:products.hasNextPage,
            nextLink: `/api/products/${products.nextPage}`,
            prevLink: `/api/products/${products.prevLink}`
        }
    res.status(200).render('index',{result})
    } catch (error) {
        res.json(error)
    }
})

router.get('/create-product',async (req,res)=>{
        res.render('create-product')
})

export default router