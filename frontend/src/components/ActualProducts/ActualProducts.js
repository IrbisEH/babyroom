import React from "react"
import "./ActualProducts.css"
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "../ProductCard/ProductCard";


const ActualProducts = ({ titleData }) => {
    return (
        <>
            <SectionTitle {...titleData} />
            <div className="products_wrapper">
                <ProductCard />
                <img src="../../static/media/product_1/product_1_1.jpg" alt="123"/>
            </div>
        </>
    )
}

export default ActualProducts;