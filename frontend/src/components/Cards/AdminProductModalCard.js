import React, {useEffect, useRef, useState} from "react";
import {IoIosClose} from "react-icons/io";
import Carousel from "../Carousel/Carousel"

const AdminProductModalCard = ({ isProductCardOpen, setIsProductCardOpen, productCardState}) => {
	const formRef = useRef(null);
	const [imagesEls, setImagesEls] = useState([]);

	useEffect(() => {
		const modal = formRef.current;
		modal && isProductCardOpen ? modal.showModal() : modal.close();
	}, [isProductCardOpen]);

	useEffect(() => {
	}, [productCardState]);

	const style = {width: "300px", height: "400px"};

    return (
        <>
			{/*<dialog ref={formRef} style={{width:"500px", height:"800px"}} >*/}
			<dialog ref={formRef} >
				<IoIosClose size={32} onClick={() => setIsProductCardOpen(false)} />
				<div style={style}>
					<Carousel images={productCardState.images} style={style} />
				</div>
			</dialog>
        </>
    )
}

export default AdminProductModalCard;