import React from "react"
import "./ActualProducts.css"
import SectionTitle from "../SectionTitle/SectionTitle";

const ActualProducts = ({ titleData }) => {
    return (
        <>
            <SectionTitle {...titleData} />
            <div className="products_wrapper">
            </div>
        </>
    )
}

export default ActualProducts;