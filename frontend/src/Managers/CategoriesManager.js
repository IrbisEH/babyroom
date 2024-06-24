import React from "react";

class CategoriesManager {
	constructor(Params) {
		this.Id = Params && Params.Id ? Params.Id : "Categories"

		this.tableName = "Категории товаров";

		this.apiManager = Params.apiManager;
		this.data = Params.data;
		this.dataSetter = Params.dataSetter;

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
			{id:"name", label:"Название", type:"text", required:true},
			{id:"description", label:"Описание", type:"text", required:false},
		];

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : "";
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";

			return model;
		};

		this.GetFormModel = (Params) => {
			return this.GetModel(Params)
		}

		this.Get = () => {
			this.apiManager.SendRequest({
				method: "GET",
				endpoint: "/categories",
			})
			.then(response => {
				if(response.data)
				{
					let data = response.data.map(item => this.GetModel(item));
					this.dataSetter(prevData => data.concat(prevData));
				}
				})
			.catch(error => console.log(error));
		};

		this.Save = (Model) => {
			this.apiManager.SendRequest({
				method: "POST",
				endpoint: "/categories",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					let model = this.GetModel(response.data);
					this.dataSetter(prevData => {
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
				endpoint: "/categories",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					this.dataSetter(prevData => {
						return prevData.filter(item => item.id !== response.data);
					})
				}
			})
			.catch(error => {console.log(error)})
		}
	}
}

export default CategoriesManager;