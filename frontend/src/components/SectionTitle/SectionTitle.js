import React from "react";
import "./SectionTitle.css"

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className="section_title">
            <div className="section_title__text_wrapper">
                <h1>{ title }</h1>
                <p>{ subtitle }</p>
            </div>
        </div>
    )
}

export default SectionTitle;