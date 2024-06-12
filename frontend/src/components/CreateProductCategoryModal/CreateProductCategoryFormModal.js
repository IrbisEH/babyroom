import React, { useState, useEffect } from 'react';
import './CreateProductCategoryFormModal.css';
import Modal from '../Modal/Modal';

const initialFromData = {
    name: "",
    description: "",
    units: ""
}

const CreateProductCategoryFormModal = ({ Session, isOpen, onClose }) => {
    const [formState, setFormState] = useState(initialFromData);

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

        Session.SendRequest({
            method: "post",
            target: "create_product_category",
            data: formState
        }).then(result => {
            console.log(result)
        }).catch(error => {
            console.error(error)
        });

        setFormState(initialFromData);
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
                <div className="form-row">
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
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateProductCategoryFormModal;
