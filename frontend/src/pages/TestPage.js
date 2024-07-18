import React, {useState} from 'react';
import CustomForm from '../components/Form/CustomForm';

const TestPage = () => {

    const selectOptions = [
        {id: 1, value: "Первая опция"},
        {id: 2, value: "Вторая опция"},
        {id: 3, value: "Третья опция"},
        {id: 4, value: "Четвертая опция"},
        {id: 5, value: "Пятая опция"}
    ]

    const formConfig = [
        {id:"enable", label:"Вкл/Выкл", type:"switch", required:false},
        {id:"title", label:"Название", type:"text", required:true},
        {id:"units", label:"Размеры", type:"textarea", required:false},
        {id:"category_id", label:"Категория", type:"select", options:selectOptions, with_empty:true, required:false},
        {id:"tags", label:"Теги", type:"multiselect", options:selectOptions, required:false},
        {id:"img", label:"Изображения", type:"upload_img", required:true},
    ]

    const initialState = {};

    const handleForm = (formState) => {
        console.log(formState)
    }

    return (
        <div style={{ height: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CustomForm formConfig={formConfig} initialState={initialState} handleForm={handleForm} />
        </div>
    )
}

export default TestPage;



// {id:"img", label:"Изображения", type:"upload_file", required:true},
// {id:"upload_img", label:"Изображения", type:"upload_file", required:true},