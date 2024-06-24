import React from "react";

const Form = ({ parentId=null, formConfig, formType, formState, handleInputChange, handleApplyFormBtnClick }) => {
    const Id = parentId ? parentId + "Form" : "Form"

    const inputs = formConfig.map(item => {
        let inputEl;

        switch (item.type)
        {
            case "text":
                inputEl = (
                    <input
                        id={item.id}
                        name={item.id}
                        value={formState[item.id]}
                        onChange={handleInputChange}
                        required={item.required}>
                    </input>
                )
                break
            case "textarea":
                inputEl = (
                    <textarea
                        id={item.id}
                        name={item.id}
                        value={formState[item.id]}
                        onChange={handleInputChange}
                        required={item.required}>
                    </textarea>
                )
                break
            case "select":
                inputEl = (
                    <select
                        id={item.id}
                        name={item.id}
                        onChange={handleInputChange}
                        required={item.required}
                    >
                        {item.with_empty && (
                          <option value=""></option>
                        )}
                        {item.options.map((option) => (
                          <option key={Id + "Option" + option.id} value={option.id}>{option.name}</option>
                        ))}
                    </select>
                )
                break
            case "checkbox":
                inputEl = (
                    <input
                        type="checkbox"
                        id={item.id}
                        name={item.id}
                        checked={formState[item.id]}
                        onChange={handleInputChange}
                        required={item.required}
                    />
                );
                break;
            case "toggle":
                inputEl = (
                    <input
                        type="checkbox"
                        id={item.id}
                        name={item.id}
                        checked={formState[item.id]}
                        onChange={handleInputChange}
                        className="toggle-switch"
                        required={item.required}
                    />
                );
                break;
            default:
                inputEl = null;
        }
        return (
            <div key={Id + item.id} className="form__row">
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