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
				id: "name",
				name: "Название",
				selector: row => row.name,
				width: "200px",
			},
			{
				id: "description",
				name: "Описание",
				selector: row => row.description,
			}
		];

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : "";
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";

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