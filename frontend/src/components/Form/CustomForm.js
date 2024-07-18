import React, { useState, useId, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import Switch from "react-switch";

const UploadImageElement = ({ Id, formState, setFormState }) => {

    const [elementCount, setElementCount] = useState(1);
    const [uploadElements, setUploadElements] = useState({});
    const [imgFiles, setImgFiles] = useState({});

    const getUploadElement = (key) => {
        return (
            <div key={key} style={{display: "flex", flexDirection: "row"}}>
                <input type="file" name="file" onChange={(event) => handleAddImg(key, event.target.files[0])} />
                <IoIosClose size={30} onClick={() => deleteElement(key)} />
            </div>
        )
    }

    const addUploadElement = () => {
        setElementCount(prevCount => prevCount + 1);

        let newKey = "file_" + elementCount;

        setUploadElements({
            ...uploadElements,
            [newKey]: getUploadElement(newKey),
        });
    }

    const deleteElement = (key) => {
        setUploadElements(prevState => {
            const newState = { ...prevState };
            delete newState[key];
            return newState;
        });
        setImgFiles(prevState => {
            const newState = { ...prevState };
            delete newState[key];
            return newState;
        });
    }

    const handleAddImg = (key, file) => {
        setImgFiles(prevState => ({
            ...prevState,
            [key]: file
        }))
    };

    useEffect(() => {
        setFormState(prevState => ({
            ...prevState,
            ["images"]: Object.values(imgFiles)

        }))
    }, [imgFiles])

    return (
        <>
            {Object.values(uploadElements)}
            {
                Object.keys(uploadElements).length <= 3 &&
                (<button type="button" onClick={() => addUploadElement()}>Добавить изображение</button>)
            }
        </>
    )
}

const GetFormElements = (formConfig, formState, handleChange, setFormState, style) => {
    return formConfig.map((item, index) => {
        switch(item.type)
        {
            case "text":
                return (
                    <div key={"form" + index} style={{display:"flex", rowDirection:"row", justifyContent:"space-between"}}>
                        <label htmlFor={item.id} style={ style.label }>{item.label}</label>
                        <input
                            type="text"
                            id={item.id}
                            name={item.id}
                            required={item.required || false}
                            value={formState[item.id] || ""}
                            onChange={(event) => handleChange(item.id, event.target.value)}
                            style = { style.input }
                        />
                    </div>
                );
            case "textarea":
                return (
                    <div key={"form" + index} style={{display:"flex", rowDirection:"row", justifyContent:"space-between"}}>
                        <label htmlFor={item.id} style={style.label}>{item.label}</label>
                        <textarea
                            id={item.id}
                            name={item.id}
                            required={item.required || false}
                            value={formState[item.id] || ""}
                            onChange={(event) => handleChange(item.id, event.target.value)}
                            style={ style.textarea }
                        />
                    </div>
                );
            case "switch":
                return (
                    <div key={"form" + index} style={{display: "flex", rowDirection: "row", justifyContent: "space-between"}}>
                        <label htmlFor={item.id} style={style.label}>{item.label}</label>
                        <div style={{width:style.input.width, flex:'flex', flexDirection:"row-reverse"}}>
                            <Switch
                                id={item.id}
                                name={item.id}
                                checked={Boolean(formState[item.id]) || false}
                                onChange={(checked) => handleChange(item.id, checked)}
                                height={style.switch.height}
                                width={style.switch.width}
                            />
                        </div>
                    </div>
                );
            case "select":
                let selectOptions = item.options.map(option => ({value: option.id, label: option.value}));
                return (
                    <div key={"form" + index} style={{display: "flex", rowDirection: "row", justifyContent: "space-between"}}>
                        <label htmlFor={item.id} style={style.label}>{item.label}</label>
                        <Select
                            id={item.id}
                            name={item.id}
                            options={selectOptions}
                            onChange={(selected) => handleChange(item.id, selected ? selected.value : null)}
                            styles = {{
                                container: (provided, state) => ({
                                    ...provided,
                                    width: style.input.width
                                }),
                            }}
                            isClearable={true}
                        />
                    </div>
                );
            case "multiselect":
                let multiSelectOptions = item.options.map(option => ({value: option.id, label: option.value}))
                return (
                    <div key={"form" + index} style={{display: "flex", rowDirection: "row", justifyContent: "space-between"}}>
                        <label htmlFor={item.id} style={style.label}>{item.label}</label>
                        <Select
                            id={item.id}
                            name={item.id}
                            options={multiSelectOptions}
                            isMulti
                            onChange={(selected) => handleChange(item.id, selected.map(item => item.value))}
                            styles = {{
                                container: (provided, state) => ({
                                    ...provided,
                                    width: style.input.width
                                }),
                            }}
                        />
                    </div>
                );
            case "upload_img":
                return (
                    <div key={"form" + index}>
                        <UploadImageElement Id={item.id} formState={formState} setFormState={setFormState} />
                    </div>
                );
        }
    });
}

const CustomForm = ({ formConfig, initialState, handleForm }) => {
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
            height: "50px",
            resize: 'none',
            overflowY: 'scroll'
        },
        switch: {
            height: 18,
            width: 35
        }
    }

    const [formState, setFormState] = useState(initialState);

    const handleChange = (id, value) => {
        setFormState({
            ...formState,
            [id]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const state = {...formState};
        const formData = new FormData();

        Object.keys(state).forEach(key => {
            if (key !== 'images') {
                formData.append(key, state[key]);
            }
        });

        if(state.images) {
            Array.from(state.images).forEach((file, index) => {
                formData.append('images', file);
            });
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        // handleForm(formData);
    };

    return (
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            {GetFormElements(formConfig, formState, handleChange, setFormState, styles)}
            <button key={Id + "SubmitBtn"} type="submit">Сохранить</button>
        </form>
    )
}

export default CustomForm;