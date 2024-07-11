import React, {useId} from "react";
import { IoIosClose } from "react-icons/io";


const UploadInput = ({ setFormState, handleDeleteUpload }) => {
    const id = useId()
    const name = `file${id}`;

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFormState((prevState) => ({
                ...prevState,
                [name]: event.target.files[0]
            }));
        } else {
            setFormState((prevState) => {
                const newState = { ...prevState };
                delete newState[name];
                return newState;
            });
        }
    };

    return (
        <div id={id}>
            <label htmlFor={id}>
                <input type="file" name={name} onChange={handleFileChange}/>
            </label>
            <IoIosClose onClick={() => handleDeleteUpload(id)} />
        </div>
    )
}

export default UploadInput;

