import React, { useState, useId, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import Switch from "react-switch";
import Carousel from "../Carousel/Carousel";

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

const SectionUploadImg = ({ id, onRemove, onFileChange }) => {
    const handleFileChange = (e) => {
        onFileChange(id, e.target.files[0]);
    };

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <input type="file" onChange={handleFileChange} />
            <IoIosClose size={30} onClick={() => onRemove(id)} />
        </div>
    );
};

const UploadImages = ({ formState, fileList, setFileList }) => {
    const [sections, setSections] = useState([]);

    const addSection = () => {
        const newSectionId = Date.now();
        setSections([...sections, { id: newSectionId }]);
        setFileList({ ...fileList, [newSectionId]: null });
    };

    const removeSection = (id) => {
        setSections(sections.filter((section) => section.id !== id));
        const newFiles = { ...fileList };
        delete newFiles[id];
        setFileList(newFiles);
    };

    const handleFileChange = (id, file) => {
        setFileList({ ...fileList, [id]: file });
    };

    useEffect(() => {
        if(fileList.length === 0)
            setSections([]);
    }, [fileList])

    return (
        <>
            {
                sections.map((section) => (
                    <SectionUploadImg
                        key={section.id}
                        id={section.id}
                        onRemove={removeSection}
                        onFileChange={handleFileChange}
                    />
                ))
            }
            {
                formState && formState.images && (sections.length + formState.images.length) < 3 && (
                    <button type="button" onClick={addSection}>
                        Добавить изображение
                    </button>
                )
            }
        </>
    );
}

const GetFormElements = (Style, formConfig, formState, setFormState, fileList, setFileList, handleChange) => {
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
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                    </div>
                );
            default:
                return null;
        }
    });
}

const Form = ({ formConfig, formInitialState, onSubmit }) => {
    const [formState, setFormState] = useState(formInitialState);
    const [fileList, setFileList] = useState([]);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

    	Object.keys(formState).forEach(key => {
			formData.append(key, formState[key]);
        });

        Object.values(fileList).forEach((file, idx) => {
			if(file)
				formData.append(`file-${idx}`, file);
		});

        onSubmit(formData);

        setFormState({});
        setFileList([])
    };

    useEffect(() => {
        setFormState(formInitialState);
    }, [formInitialState]);

    return (
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            {GetFormElements(
                styles,
                formConfig,
                formState,
                setFormState,
                fileList,
                setFileList,
                handleChange
            )}
            <button type="submit">Сохранить</button>
        </form>
    )
}

export default Form;