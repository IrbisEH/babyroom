import React, { useState, useEffect } from 'react';
import './ProductCategoryFormModal.css';
import Modal from '../Modal/Modal';

export const FormProductCategoryModel = (Params) =>
{
	let model = {};

    model.id = Params && Params.id ? Params.id : "";
	model.name = Params && Params.name ? Params.name : "";
	model.description = Params && Params.description ? Params.description : "";
	model.units = Params && Params.units ? Params.units.join("\n") : "";

	return model;
}


export const ProductCategoryFormModal = ({ apiManager, isOpen, onClose, formState, setFormState, setTableData, submitBtnName }) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.shiftKey) {
        setFormState((prevFormData) => ({
          ...prevFormData,
          units: prevFormData.units + '\n'
        }));
      } else {
        if (formState.name && formState.description) {
          handleSubmit(event);
        }
      }
    }
  };

    const handleSubmit = (event) => {
        event.preventDefault();

        apiManager.SendRequest({
            method: "POST",
            endpoint: "/product_category",
            data: formState
        })
        .then(result => {
            if(result.data)
            {
                result.data.units = result.data.units ? JSON.parse(result.data.units) : "";
                setTableData(prevData => {
                    const updatedIndex = prevData.findIndex(item => item.id === result.data.id);
                    if (updatedIndex !== -1) {
                        return [
                            ...prevData.slice(0, updatedIndex),
                            result.data,
                            ...prevData.slice(updatedIndex + 1)
                        ];
                    } else {
                        return [result.data, ...prevData];
                    }
                });
                setFormState(FormProductCategoryModel());
            }
        })
        .catch(error => {console.log(error)})

        onClose();
    };

    return (
        <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="description">Описание</label>
                    <input
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                    >
                    </input>
                </div>
                <div className="form-row-textarea">
                    <label htmlFor="units">Размеры</label>
                    <textarea
                        id="units"
                        name="units"
                        value={formState.units}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    >
                    </textarea>
                </div>
                <div className="form-row">
                    <button type="submit">{submitBtnName}</button>
                </div>
            </form>
        </Modal>
    );
}