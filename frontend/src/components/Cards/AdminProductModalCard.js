import React, {useEffect, useRef, useState} from "react";
import {IoIosClose} from "react-icons/io";
import Carousel from "../Carousel/Carousel"
import {MdDeleteOutline} from "react-icons/md";

const AdminProductModalCard = ({ isProductCardOpen, setIsProductCardOpen, productCardModel }) => {
	const formRef = useRef(null);
	const [imageUrlsList, setImageUrlsList] = useState([]);

	useEffect(() => {
		const modal = formRef.current;
		modal && isProductCardOpen ? modal.showModal() : modal.close();
	}, [isProductCardOpen]);

	useEffect(() => {
		if(productCardModel && productCardModel.images)
		{
			let list = [];
			productCardModel.images.forEach(identifier => {
				list.push(`${process.env.REACT_APP_URL}/img/${identifier}_large.jpg`)
			})
			setImageUrlsList(list);
		}
	}, [productCardModel]);

	const handleKeyDown = (event) => {
		if(event.key === "Escape") {
			setIsProductCardOpen(false);
        }
	}

	const handleDeleteBtn = (ImgIdx) => {
		setImageUrlsList(prevState => {
			const newState = [...prevState];
			newState.splice(ImgIdx, 1);
			return newState;
		});
	};

    return (
        <>
			<dialog ref={formRef} onKeyDown={handleKeyDown} >
				<IoIosClose size={32} onClick={() => setIsProductCardOpen(false)} />
				<div style={{width: "300px", height: "400px"}}>
					<Carousel imageUrlsList={imageUrlsList} />
				</div>
			</dialog>
        </>
    )
}

export default AdminProductModalCard;