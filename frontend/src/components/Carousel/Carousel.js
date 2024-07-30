import React, {useState, useRef, useEffect} from "react";
import "./carousel.css";

const Carousel = ({ images, style }) => {
    const [curIdx, setCurIdx] = React.useState(0);
    const carouselRef = useRef(null);

    const getImgPath = (fileIdentifier) => {
        let postfix = "large"
        return `${process.env.REACT_APP_URL}/img/${fileIdentifier}_${postfix}.jpg`;
    }
    const nextImgIdx = () => {
        setCurIdx((prevState) => prevState + 1 < images.length ? prevState + 1 : 0);
    }

    const prevImgIdx = () => {
        setCurIdx((prevState) => prevState - 1 >= 0 ? prevState - 1 : images.length - 1);
    }

    return (
        <>
            {images && images.length ? (
                    <div className="carousel">
                        <button className="carousel__btn carousel__btn--prev" onClick={prevImgIdx}>
                            &lt;
                        </button>
                        <button className="carousel__btn carousel__btn--next" onClick={nextImgIdx}>
                            &gt;
                        </button>
                        <div className="carousel__img--wrapper">
                            <img
                            src={getImgPath(images[curIdx])}
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