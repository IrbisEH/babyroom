import React, { useState, useId, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import Switch from "react-switch";
import Carousel from "../Carousel/Carousel";

// const ExistsImages = ({ formState, setFormState }) => {
//     const [existImageElement, setExistImageElement] = useState({});
//
//     const deleteElement = (key, filename) => {
//         setExistImageElement(prevState => {
//             const newState = { ...prevState };
//             delete newState[key];
//             return newState;
//         });
//         setFormState(prevState => {
//             const newState = { ...prevState };
//             newState.images = newState.images.filter(item => item !== filename);
//             return newState;
//         })
//     };
//
//     useEffect(() => {
//         const initialImages = formState.images.reduce((acc, filename, index) => {
//             acc[`file_${index}`] = filename;
//             return acc;
//         }, {});
//         setExistImageElement(initialImages);
//     }, [formState]);
//
//     return (
//         <>
//             {Object.entries(existImageElement).map(([key, filename]) => (
//                 <div key={key} style={{ display: "flex", flexDirection: "row" }}>
//                     <span>{`...${filename.slice(-30)}`}</span>
//                     <IoIosClose size={30} onClick={() => deleteElement(key, filename)} />
//                 </div>
//             ))}
//         </>
//     )
// }

const ExistsImages = ({ formState, setFormState }) => {
	const [imageUrlsList, setImageUrlsList] = useState([]);

    useEffect(() => {
		if(formState && formState.images)
		{
			let list = [];
			formState.images.forEach(identifier => {
				list.push(`${process.env.REACT_APP_URL}/img/${identifier}_large.jpg`)
			})
			setImageUrlsList(list);
		}
	}, [formState]);

    const handleDeleteBtn = (event, ImgIdx) => {
        event.preventDefault();

        setFormState(prevState => {
            const newState = { ...prevState };
            newState.images = newState.images.filter((_, index) => index !== ImgIdx);
            return newState;
        });
    };

    return (
        <Carousel imageUrlsList={imageUrlsList} handleDeleteBtn={handleDeleteBtn} />
    )
}

const UploadImages = ({ formState, addFilesState, setAddFilesState }) => {

    const [elementCount, setElementCount] = useState(1);
    const [uploadElements, setUploadElements] = useState({});

    const getElement = (key) => {
        return (
            <div key={key} style={{display: "flex", flexDirection: "row"}}>
                <input type="file" name="file" onChange={(event) => handleAddFile(key, event.target.files[0])} />
                <IoIosClose size={30} onClick={() => deleteElement(key)} />
            </div>
        )
    }

    const addElement = () => {
        setElementCount(prevCount => prevCount + 1);

        let newKey = "file_" + elementCount;

        setUploadElements({
            ...uploadElements,
            [newKey]: getElement(newKey),
        });
    }

    const deleteElement = (key) => {
        setUploadElements(prevState => {
            const state = {...prevState};
            delete state[key];
            return state;
        });
        setAddFilesState(prevState => {
            const state = {...prevState};
            delete state[key];
            return state;
        })
    }

    const handleAddFile = (key, file) => {
        setAddFilesState(prevState => ({
            ...prevState,
            [key]: file
        }));
    };

    useEffect(() => {
        if(!Object.keys(addFilesState).length > 0){
            setUploadElements({})
        }
    }, [addFilesState]);

    return (
        <>
            {Object.values(uploadElements)}
            {
                (Object.values(uploadElements).length + formState.images.length) < 3 &&
                (<button type="button" onClick={() => addElement()}>Добавить изображение</button>)
            }
        </>
    )
}

const GetFormElements = ( Style, formConfig, formState, setFormState, handleChange, addFilesState, setAddFilesState) => {
    return formConfig.map((item, index) => {
        switch(item.type)
        {
            case "text":
                return (
                    <div key={"form" + index} style={{display:"flex", rowDirection:"row", justifyContent:"space-between"}}>
                        <label htmlFor={item.id} style={ Style.label }>{item.label}</label>
                        <input
                            type="text"
                            id={item.id}
                            name={item.id}
                            required={item.required || false}
                            value={formState[item.id] || ""}
                            onChange={(event) => handleChange(item.id, event.target.value)}
                            style = { Style.input }
                        />
                    </div>
                );
            case "textarea":
                let value = "";
                if(formState[item.id] && formState[item.id].length)
                {
                    value = formState[item.id].join("\n");
                }
                return (
                    <div key={"form" + index} style={{display:"flex", rowDirection:"row", justifyContent:"space-between"}}>
                        <label htmlFor={item.id} style={Style.label}>{item.label}</label>
                        <textarea
                            id={item.id}
                            name={item.id}
                            required={item.required || false}
                            value={value}
                            onChange={(event) => handleChange(
                                item.id, event.target.value
                                    .split("\n")
                            )}
                            style={ Style.textarea }
                        />
                    </div>
                );
            case "switch":
                return (
                    <div key={"form" + index} style={{display: "flex", rowDirection: "row", justifyContent: "space-between"}}>
                        <label htmlFor={item.id} style={Style.label}>{item.label}</label>
                        <div style={{width:Style.input.width, flex:'flex', flexDirection:"row-reverse"}}>
                            <Switch
                                id={item.id}
                                name={item.id}
                                checked={Boolean(formState[item.id]) || false}
                                onChange={(checked) => handleChange(item.id, checked ? 1 : 0)}
                                height={Style.switch.height}
                                width={Style.switch.width}
                            />
                        </div>
                    </div>
                );
            case "select":
                let selectOptions = item.options.map(option => ({value: option.id, label: option.name}));
                return (
                    <div key={"form" + index} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <label htmlFor={item.id} style={Style.label}>{item.label}</label>
                        <Select
                            id={item.id}
                            name={item.id}
                            options={selectOptions}
                            value={selectOptions.find(option => option.value === formState[item.id]) || null}
                            onChange={(selected) => handleChange(item.id, selected ? selected.value : "")}
                            styles = {{
                                container: (provided, state) => ({
                                    ...provided,
                                    width: Style.input.width
                                }),
                            }}
                            isClearable={true}
                        />
                    </div>
                );
            case "multiselect":
                let multiSelectOptions = item.options.map(option => ({value: option.id, label: option.name}));
                let selectedArr = formState[item.id] ? formState[item.id].split(",").map(item => parseInt(item)) : "";
                let initial = multiSelectOptions.filter(option => selectedArr.includes(option.value));
                return (
                    <div key={"form" + index} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <label htmlFor={item.id} style={Style.label}>{item.label}</label>
                        <Select
                            id={item.id}
                            name={item.id}
                            options={multiSelectOptions}
                            value={initial.length ? initial : null}
                            isMulti
                            onChange={(selected) => handleChange(item.id, selected.map(item => item.value).join(","))}
                            styles = {{
                                container: (provided, state) => ({
                                    ...provided,
                                    width: Style.input.width
                                }),
                            }}
                        />
                    </div>
                );
            case "files":
                return (
                    <div key={"form" + index} style={Style.images}>
                        <ExistsImages
                            formState={formState}
                            setFormState={setFormState}
                        />
                    </div>
                )
            case "upload_files":
                return (
                    <div key={"form" + index} style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        <UploadImages
                            formState={formState}
                            addFilesState={addFilesState}
                            setAddFilesState={setAddFilesState}
                        />
                    </div>
                );
            default:
                return null;
        }
    });
}

const Form = ({ formConfig, formState, setFormState, addFilesState, setAddFilesState, handleSubmit }) => {
    const Id = useId();

    const styles = {
        label: {
            width: "100px",
        },
        input: {
            width: "200px",
            height: "30px"
        },
        textarea: {
            width: "200px",
            height: "150px",
            resize: 'none',
            overflowY: 'scroll'
        },
        images: {
            width: "300px"
        },
        switch: {
            height: 18,
            width: 35
        }
    }

    const handleChange = (id, value) => {
        setFormState({
            ...formState,
            [id]: value
        });
    };

    return (
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            {GetFormElements(
                styles,
                formConfig,
                formState,
                setFormState,
                handleChange,
                addFilesState,
                setAddFilesState
            )}
            <button key={Id + "SubmitBtn"} type="submit">Сохранить</button>
        </form>
    )
}

export default Form;