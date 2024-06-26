import React from "react";
import Switch from 'react-switch';


const Form = ({ Id=null, formConfig, formType, formState, handleInputChange, handleChecked, handleApplyFormBtnClick }) => {
    const inputs = formConfig.map((item, elIdx) => {
        let inputEl;

        switch (item.type)
        {
            case "text":
                inputEl = (
                    <input
                        key={Id + item.id + elIdx}
                        id={item.id}
                        name={item.id}
                        value={formState[item.id]}
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
                        value={formState[item.id]}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        required={item.required}>
                    </textarea>
                )
                break
            case "select":
                inputEl = (
                    <select
                        key={Id + item.id + elIdx}
                        id={item.id}
                        name={item.id}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        required={item.required}
                    >
                        {item.with_empty && (
                          <option key={Id + "OptionEmpty"} value=""></option>
                        )}
                        {item.options.map((option, idx) => (
                          <option key={Id + "Option" + idx + option.id} value={option.id}>{option.name}</option>
                        ))}
                    </select>
                )
                break
            // case "checkbox":
            //     inputEl = (
            //         <input
            //             key={Id + item.id + elIdx}
            //             type="checkbox"
            //             id={item.id}
            //             name={item.id}
            //             checked={formState[item.id]}
            //             onChange={handleInputChange}
            //             required={item.required}
            //         />
            //     );
            //     break;
            case "toggle":
                inputEl = (
                    <Switch
                        key={Id + item.id + elIdx}
                        id={item.id}
                        name={item.id}
                        checked={formState[item.id] || false}
                        onChange={(checked) => handleChecked(item.id, checked)}
                        required={item.required}
                        height={18}
                        width={35}
                    />
                );
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