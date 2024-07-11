import React, { useState, useId } from "react";
import UploadInput from "./UploadInput";

const PrintFormData = (FormData) => {
    const formDataObject = {};
    for (let pair of FormData.entries()) {
        formDataObject[pair[0]] = pair[1];
    }
    console.log(formDataObject);
}

const CustomForm = () => {

    const [formState, setFormState] = useState({})
    const [inputEls, setInputEls] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState)
    };

    const handleDeleteUpload = (id) => {
        setInputEls(prevState => [
            console.log(prevState),
        ]);
    }

    const addFileInput = () => {
        setInputEls(prevState => [
            ...prevState,
            <UploadInput key={prevState.length}  setFormState={setFormState} handleDeleteUpload={handleDeleteUpload}/>
        ]);
    };

    return (
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            {inputEls}
            <button type="button" onClick={addFileInput}>Добавить файл</button>
            <button type="submit">Применить</button>
        </form>
    )
}

export default CustomForm;