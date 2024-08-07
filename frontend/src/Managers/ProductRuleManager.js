import {FaRegEdit} from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6";
import React from "react";

class ProductRuleManager {
	constructor(Params) {
		this.Id = Params && Params.Id ? Params.Id : "Promotions"

		this.tableName = "Правила продуктов";

		this.apiManager = Params.apiManager;
		this.data = Params.ruleData;
		this.dataSetter = Params.dataSetter;

		this.handleEditBtnClick = null;
		this.handleDeleteBtnClick = null;

		this.columnsConfig = [
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
				id: "id",
				name: "id",
				selector: row => row.id,
				width: "100px",
			},
			{
				id: "rule",
				name: "Правило",
				selector: row => row.name
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
			{id:"name", label:"правило", type:"text", required:true}
		];

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? parseInt(Params.id) : null;
			model.name = Params && Params.name ? Params.name : null;

			return model;
		};

		this.GetFormModel = (Params) => {
			return this.GetModel(Params)
		}

		this.Get = () => {
			this.apiManager.SendRequest({
				method: "GET",
				endpoint: "/product_rule",
			})
			.then(response => {
					if(response.data)
					{
						console.log(response.data);
						let data = response.data.map(item => this.GetModel(item));
						this.dataSetter(prevData => data.concat(prevData));
					}
				})
			.catch(error => console.error(error));
		};

		this.Save = (Model) => {
			let method = Model.id ? "PUT" : "POST";
			Model.img_identifiers = Model.img_identifiers ? Model.img_identifiers.join(",") : null;
			this.apiManager.SendRequest({
				method: method,
				endpoint: "/product_rule",
				data: Model
			})
			.then(response => {
				if(response.data)
				{
					let model = this.GetModel(response.data);
					let state = [...this.data];
					let findIdx = this.data.findIndex(item => item.id === model.id)

					if(findIdx > -1)
						state.splice(findIdx, 1);

					this.dataSetter(state.concat(model));
				}
			})
			.catch(error => {console.error(error)})
		}

		this.Delete = (Model) => {
			this.apiManager.SendRequest({
				method: "DELETE",
				endpoint: "/product_rule",
				data: Model
			})
			.then(response => {
				if(response.status === 200)
				{
					this.dataSetter(prevData => {
						return prevData.filter(item => item.id !== Model.id);
					});
				}
			})
			.catch(error => {console.error(error)})
		}
	}
}

export default ProductRuleManager;