import React, { useState } from "react";
import Switch from 'react-switch';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const Form = ({ Id=null, formConfig, formType, formState, handleInputChange, handleChecked, handleApplyFormBtnClick }) => {
    const inputs = formConfig.map((item, elIdx) => {
        let inputEl;
        let options;
        let defaultValue;

        switch (item.type)
        {
            case "text":
                inputEl = (
                    <input
                        key={Id + item.id + elIdx}
                        id={item.id}
                        name={item.id}
                        value={formState[item.id] || ""}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        required={item.required}>
                    </input>
                )
                break
            case "textarea":
                inputEl = (
                    <textarea
                        key={Id + item.id + elIdx}
                        id={item.id}
                        name={item.id}
                        value={formState[item.id] || ""}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        required={item.required}>
                    </textarea>
                )
                break
            case "select":
                options = item.options.map(option => ({value: option.id, label: option.name}));
                if(formState[item.id] !== undefined && formState[item.id] !== null)
                {
                  options.forEach(opt => {
                      if(opt.value === formState[item.id])
                          defaultValue = opt;
                  });
                }
                inputEl = (
                    <Select
                        value={defaultValue}
                        options={options}
                        onChange={(selectedItem) => handleInputChange(item.id, selectedItem.value)}
                    />
                )
                break
            case "multiselect":
                options = item.options.map(option => ({value: option.id, label: option.name}));
                defaultValue = [];
                if(formState[item.id] !== undefined && formState[item.id] !== null)
                {
                    let selected_ids = formState[item.id].split(";").map(item => parseInt(item));
                    options.forEach(opt => {
                        let idx = selected_ids.indexOf(opt.value);
                        if(idx > -1)
                        {
                            defaultValue.push(opt);
                        }
                    });
                }

                inputEl = (
                    <Select
                        value={defaultValue}
                        options={options}
                        onChange={(selectedItem) => handleInputChange(
                            item.id, selectedItem.map(item => item.value).join(";"))}
                        isMulti
                    />
                )
                break;
            case "switch":
                inputEl = (
                    <Switch
                        key={Id + item.id + elIdx}
                        id={item.id}
                        name={item.id}
                        checked={Boolean(formState[item.id]) || false}
                        onChange={(checked) => handleChecked(item.id, checked)}
                        required={item.required}
                        height={18}
                        width={35}
                    />
                );
                break;
            case "upload_file":
                inputEl = (
                    <input
                        id="image"
                        type="file"
                        name="image"
                        accept="image/png, image/jpg"
                        multiple
                        onChange={(e) => handleInputChange(item.id, e.target.files)}
                    />
                )
                break;
            default:
                inputEl = null;
        }
        return (
            <div key={Id + item.id + elIdx} className="form__row">
                <label htmlFor={item.id}>{item.label}</label>
                {inputEl}
            </div>
        )

    });

    return (
        <form onSubmit={handleApplyFormBtnClick}>
            {inputs}
            <div className="form-row">
                <button key={Id + "SubmitBtn"}
                        type="submit">{formType && formType.btnText ? formType.btnText : ""}
                </button>
            </div>
        </form>
    )
}

export default Form;