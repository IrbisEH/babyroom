import React, {useEffect, useRef, useState} from "react";
import {IoIosClose} from "react-icons/io";
import Carousel from "../Carousel/Carousel"

const AdminProductModalCard = ({ isProductCardOpen, setIsProductCardOpen, productCardState}) => {
	const formRef = useRef(null);
	const [imagesEls, setImagesEls] = useState([]);

	useEffect(() => {
		const modal = formRef.current;
		console.log(modal)
		modal && isProductCardOpen ? modal.showModal() : modal.close();
	}, [isProductCardOpen]);

	useEffect(() => {
		console.log(productCardState)
	}, [productCardState]);

    return (
        <>
			<dialog ref={formRef} style={{width:"500px", height:"500px"}} >
				<IoIosClose size={32} onClick={() => setIsProductCardOpen(false)} />
				<Carousel images={productCardState.images} />
			</dialog>
        </>
    )
}

export default AdminProductModalCard;