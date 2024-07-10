import {FaRegEdit} from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6";
import React from "react";

class CategoryManager {
	constructor(Params) {
		this.Id = Params && Params.Id ? Params.Id : "Categories"

		this.tableName = "Категории товаров";

		this.apiManager = Params.apiManager;
		this.data = Params.data;
		this.dataSetter = Params.dataSetter;

		this.handleEditBtnClick = null;
		this.handleDeleteBtnClick = null;

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
				grow: 1
			},
			{
				id: "edit",
				width: "50px",
				cell: row => (
					<div onClick={(event) => this.handleEditBtnClick && this.handleEditBtnClick(event, row)}>
						<FaRegEdit className="table__btn" size={16}/>
					</div>
				)
			},
			{
				id: "trash",
				width: "50px",
				cell: row => (
					<div onClick={(event) => this.handleDeleteBtnClick && this.handleDeleteBtnClick(event, row)}>
						<FaRegTrashCan className="table__btn"  size={16}/>
					</div>
				)
			}
		];

		this.formConfig = [
			{id:"name", label:"Название", type:"text", required:true},
			{id:"description", label:"Описание", type:"text", required:false},
		];

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : null;
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
				endpoint: "/category",
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
				endpoint: "/category",
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
				endpoint: "/category",
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
				endpoint: "/category",
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

export default CategoryManager;