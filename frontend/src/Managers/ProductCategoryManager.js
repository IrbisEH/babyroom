import React from "react";

class ProductCategoryManager {
	constructor(Params) {
		this.Id = Params && Params.Id ? Params.Id : "ProductCategory"

		this.tableName = "Категории товаров";

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
			},
			{
				id: "units",
				name: "Размеры",
				selector: row => (
					<div>
						{row.units && row.units.length > 0 ? (
							row.units.map((item, i) => (
								<div key={`unit_${i}`}>{item}</div>
							))
						) : (
							<div>-</div>
						)}
					</div>
				)
			},
			{
				id: "edit",
				type:"icon",
				width: "50px",
			},
			{
				id: "trash",
				type: "icon",
				width: "50px",
			}
		];

		this.formConfig = [
			{id:"name", label:"Название", type:"input", required:true},
			{id:"description", label:"Описание", type:"input", required:false},
			{id:"units", label:"Размеры", type:"textarea", required:false},
		]

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : "";
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";
			model.units = Params && Params.units ? Params.units : [];

			if(typeof model.units === "string")
			{
				model.units = model.units.split("\n");
				model.units = model.units.filter(item => item.length > 0);
			}

			return model;
		};

		this.GetFormModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : "";
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";
			model.units = Params && Params.units ? Params.units.join("\n") : "";

			return model;
		}

		this.Get = () => {
			this.apiManager.SendRequest({
				method: "GET",
				endpoint: "/product_category",
			})
			.then(response => {
				if(response.data)
				{
					let data = response.data.map(item => this.GetModel(item));
					this.tableDataSetter(prevData => data.concat(prevData));
				}
				})
			.catch(error => console.log(error));
		};

		this.Save = (Model) => {
			console.log(Model);
			this.apiManager.SendRequest({
				method: "POST",
				endpoint: "/product_category",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					let model = this.GetModel(response.data);
					this.tableDataSetter(prevData => {
						let findIdx = prevData.findIndex(item => item.id === model.id);
						if (findIdx === -1) {
							return [...prevData, model];
						} else {
							return [...prevData.slice(0, findIdx), model, ...prevData.slice(findIdx + 1)];
						}
					});
				}
			})
			.catch(error => {console.log(error)})
		}

		this.Delete = (Model) => {
			this.apiManager.SendRequest({
				method: "DELETE",
				endpoint: "/product_category",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					this.tableDataSetter(prevData => {
						return prevData.filter(item => item.id !== response.data);
					})
				}
			})
			.catch(error => {console.log(error)})
		}
	}
}

export default ProductCategoryManager;