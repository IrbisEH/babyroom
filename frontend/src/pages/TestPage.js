import React from 'react';
import Form from '../components/Form/Form';

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

    return (
        <div style={{ height: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Form formConfig={formConfig} initialState={initialState} />
        </div>
    )
}

export default TestPage;