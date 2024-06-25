import React from "react";

class UnitsManager {
	constructor(Params) {

		let _this = this;

		this.Id = Params && Params.Id ? Params.Id : "Units"

		this.tableName = "Размеры";

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
				id: "units",
				name: "Размеры",
				// selector: row => row.units.split(";").join("\n")
				cell: row => (
					<div>
						{row.units.split(";").map((item, index) => (
							<div key={this.Id + index}>{item}</div>
						))}
					</div>
				)
				// selector: row => {
				// 	return row.units.split(";").join("\n");
				// }

			}
		];

		this.formConfig = [
			{id:"name", label:"Название", type:"text", required:true},
			{id:"description", label:"Описание", type:"text", required:false},
			{id:"units", label:"размеры", type:"textarea", required:false},
		];

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : null;
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";
            model.units = Params && Params.units ? Params.units : "";

			model.units = model.units.split("\n").join(";");

			return model;
		};

		this.GetFormModel = (Params) => {
			let model = this.GetModel(Params);

			model.units = model.units.split(";").join("\n");
			return model;

		}

		this.Get = () => {
			this.apiManager.SendRequest({
				method: "GET",
				endpoint: "/units",
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
				endpoint: "/units",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					let model = this.GetModel(response.data);
					this.dataSetter(prevData => [...prevData, model]);
				}
			})
			.catch(error => {console.log(error)})
		}

		this.Update = (Model) => {
			this.apiManager.SendRequest({
				method: "PUT",
				endpoint: "/units",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					let model = this.GetModel(response.data);
					this.dataSetter(prevData => {
						return prevData.map(item => {
							if (item.id === model.id) {
								return model;
							}
							return item;
						});
					});
				}
			})
			.catch(error => {console.log(error)})
		}

		this.Delete = (Model) => {
			this.apiManager.SendRequest({
				method: "DELETE",
				endpoint: "/units",
				data: Model
			})
			.then(response => {
				if(response.status === 200)
				{
					console.log(response.data)
					this.dataSetter(prevData => {
						return prevData.filter(item => item.id !== Model.id);
					});
				}
			})
			.catch(error => {console.log(error)})
		}
	}
}

export default UnitsManager;