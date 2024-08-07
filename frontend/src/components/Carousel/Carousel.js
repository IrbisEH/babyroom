import React, {useState, useRef, useEffect} from "react";
import "./carousel.css";
import {MdDeleteOutline} from "react-icons/md";

const Carousel = ({ imageUrlsList, handleDeleteBtn }) => {
    const [curIdx, setCurIdx] = React.useState(0);

    const nextImgIdx = (event) => {
        event.preventDefault();
        setCurIdx((prevState) => prevState + 1 < imageUrlsList.length ? prevState + 1 : 0);
    }

    const prevImgIdx = (event) => {
        event.preventDefault();
        setCurIdx((prevState) => prevState - 1 >= 0 ? prevState - 1 : imageUrlsList.length - 1);
    }

    useEffect(() => {
        if(curIdx >= imageUrlsList.length)
        {
            setCurIdx(0);
        }
    }, [imageUrlsList]);

    return (
        <>
            {imageUrlsList && imageUrlsList.length ? (
                    <div className="carousel">
                        <button className="carousel__btn carousel__btn--prev" onClick={(event) => prevImgIdx(event)}>
                            &lt;
                        </button>
                        <button className="carousel__btn carousel__btn--next"  onClick={(event) => nextImgIdx(event)}>
                            &gt;
                        </button>
                        {handleDeleteBtn && (
                            <MdDeleteOutline className="carousel__delete-btn" size={30} onClick={(event) => handleDeleteBtn(event, curIdx)} />
                        )}
                        <div className="carousel__img--wrapper">
                            <img
                            src={imageUrlsList[curIdx]}
                            alt={`img ${curIdx}`}
                            className="carousel__img"
                            />
                        </div>
                    </div>
                ) : (
                    <div>No images to show</div>
            )}
        </>
    );
}

export default Carousel;