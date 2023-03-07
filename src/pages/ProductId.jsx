import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductInfo from '../components/productid/ProductInfo'
import SimilarProducts from '../components/productid/SimilarProducts'
import SliderImages from '../components/productid/SliderImages'
import './styles/productid.css'

const ProductId = () => {
    const [product, setProduct] = useState()
    const [categories, setCategories] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`
        axios.get(URL)
            .then(res => setProduct(res.data.data.product))
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/products/categories`
        axios.get(URL)
            .then(res => setCategories(res.data.data.categories))
            .catch(err => console.log(err))
    }, [])

    const handleHome = () => {
        navigate(`/`)
    }

    return (
        <div className='product__id-container'>
            <ul className='product__nav'>
                <li onClick={handleHome} style={{cursor: 'pointer'}}>Home</li>
                <li><i style={{color: 'var(--color--3)'}} className='bx bxs-chevron-right-circle' ></i></li>
                <li>{product?.title}</li>
            </ul>
            <div className='product__id-info'>
                <SliderImages product={product} />
                <ProductInfo product={product} />
            </div>
            <SimilarProducts product={product} />
        </div>
    )
}

export default ProductId