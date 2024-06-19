import React, {useEffect} from "react";

class ProductModel {
	constructor(Params) {
		this.tableName = "Товары";

		this.apiManager = Params.apiManager;
		this.tableData = Params.tableData;
		this.tableDataSetter = Params.tableDataSetter;

		this.columnsConfig = [
			{
				id: "id",
				name: "id",
				selector: row => row.id,
				width: "100px",
			},
			{
				id: "category_id",
				name: "Категория",
				selector: row => row.category_id,
				width: "200px",
			},
			{
				id: "enable",
				name: "Состояние",
				selector: row => row.enable,
			},
			{
				id: "title",
				name: "Название",
				selector: row => row.title,
			},
			{
				id: "subtitle",
				name: "Подзаголовок",
				selector: row => row.subtitle,
			},
			{
				id: "description",
				name: "Описание",
				selector: row => row.description,
			}
		];

		this.formConfig = [
			{id:"title", label:"Название", type:"input", required:true}
		]

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : "";
			model.category_id = Params && Params.category_id ? Params.category_id : "";
			model.enable = Params && Params.enable ? Params.enable : "";
			model.title = Params && Params.title ? Params.title : "";
			model.subtitle = Params && Params.subtitle ? Params.subtitle : "";
			model.description = Params && Params.description ? Params.description : "";
			model.img_path = Params && Params.img_path ? Params.img_path : "";
			model.price = Params && Params.price ? Params.price : "";

			return model;
		};

		this.GetData = () => {
			console.log("get Products")
			// this.apiManager.SendRequest({
			// 	method: "GET",
			// 	endpoint: "/product_category",
			// })
			// .then(response => {
			// 	if(response.data)
			// 	{
			// 		let data = response.data.map(item => this.GetModel(item));
			// 		this.tableDataSetter(prevData => data.concat(prevData));
			// 	}
			// 	})
			// .catch(error => console.log(error));
		};
	}
}

export default ProductModel;