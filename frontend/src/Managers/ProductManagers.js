import {FaRegEdit} from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6";
import React from "react";
import Switch from 'react-switch';
import CellTooltip from "../components/AdminTable/CellTooltip";
import { TbListSearch } from "react-icons/tb";

class ProductManagers {
	constructor(Params) {
		this.Id = Params && Params.Id ? Params.Id : "Products"

		this.tableName = "Товары";

		this.apiManager = Params.apiManager;
		this.data = Params.data;
		this.dataSetter = Params.dataSetter;

		this.unitsData = Params.unitsData;
		this.promoData = Params.promoData;
		this.tagData = Params.tagData;
		this.categoryData = Params.categoryData;

		this.handleEditBtnClick = null;
		this.handleDeleteBtnClick = null;
		this.handleProductCardOpen = null;

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
				width: "100px"
			},
			{
				id: "enable",
				name: "Вкл/Выкл",
				cell: row => (
					<div>
						<Switch
							key={this.Id + row.id}
							id={this.Id + row.id}
							name={"product_enable"}
							checked={Boolean(row.enable) || false}
							onChange={(checked) => this.HandleEnableToggle(checked, row)}
							height={18}
							width={35}
						/>
					</div>
				)
			},
			{
				id: "name",
				name: "Название",
				selector: row => row.name,
			},
			{
				id: "description",
				name: "Описание",
				cell: row => (
					<CellTooltip
						cellEls={
							<div>{row.description}</div>
						}
						tooltipEls={
							<div>{row.description}</div>
						}
					/>
				)
			},
			{
				id: "category_id",
				name: "Категория",
				selector: row => {
					let find = this.categoryData.find(item => item.id === row.category_id);
					return find && find.name ? find.name : null;
				},
			},
			{
				id: "units_id",
				name: "Размеры",
				cell: row => {
					let find = this.unitsData.find(item => item.id === row.units_id);
					return find && find.units && (
						<CellTooltip
							cellEls={find.name}
							tooltipEls={
								find.units.map((item, i) => (
									<div key={this.Id + "CellTooltip" + i}>{item}</div>
								))
							}
						/>
					)
				}
			},
			{
				id: "promotion_id",
				name: "Промо",
				cell: row => {
					let find = this.promoData.find(item => item.id === row.promotion_id);
					return find && find.rule ? find.rule : null;
				}
			},
			{
				id: "price",
				name: "Цена",
				selector: row => row.price,
			},
			{
				id: "tags",
				name: "теги",
				cell: row => {
					let tags_ids = row.tags ? row.tags.split(',') : [];
					let tags_names = [];
					tags_ids.forEach(tag_id => {
						let find = this.tagData.find(item => parseInt(item.id) === parseInt(tag_id));
						if(find && find.name)
							tags_names.push(find.name)
					});
					let els = tags_names.map((name, idx) => <div key={this.Id + "TagCell" + idx}>{name}</div>);
					let cellEls = els;

					if(els.length > 2)
					{
						cellEls = els.slice(0, 2);
						cellEls.push(<div key={this.Id + "TagCell empty"}>...</div>)
					}

					return (
						<CellTooltip
							cellEls={cellEls}
							tooltipEls={els}
						/>
					)
				}
			},
			{
				id: "product_card",
				cell: row => {
					let res = "";

					if(row && row.images.length)
					{
						res = (
							<div onClick={(event) => this.handleProductCardOpen && this.handleProductCardOpen(event, row)}>
								<TbListSearch className="table__btn" size={16}/>
							</div>
						)
					}

					return res;
				}

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
			{id:"enable", label:"Вкл/Выкл", type:"switch", required:false},
			{id:"name", label:"Название", type:"text", required:true},
			{id:"description", label:"Описание", type:"text", required:true},
			{id:"category_id", label:"Категория", type:"select", options:this.categoryData, with_empty:true, required:false},
			{id:"units_id", label:"Размеры", type:"select", options:this.unitsData, with_empty:true, required:false},
			// {id:"promotion_id", label:"Промо", type:"select", options:this.promoData, with_empty:true, required:false},
			{id:"tags", label:"Теги", type:"multiselect", options:this.tagData, required:false},
			{id:"price", label:"Цена", type:"text", required:true},
			{id:"images", label:"загруженные", type:"files"},
			{id:"files_to_add", label:"Изображения", type:"upload_files", required:true},
		]

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? parseInt(Params.id) : null;
			model.enable = Params && Params.enable ? parseInt(Params.enable) : 0;
			model.name = Params && Params.name ? Params.name : null;
			model.description = Params && Params.description ? Params.description : null;
			model.category_id = Params && Params.category_id ? parseInt(Params.category_id) : null;
			model.units_id = Params && Params.units_id ? parseInt(Params.units_id) : null;
			model.promotion_id = Params && Params.promotion_id ? parseInt(Params.promotion_id) : null;
			model.price = Params && Params.price ? parseInt(Params.price) : null;
			model.tags = Params && Params.tags ? Params.tags : null;
			model.images = Params && Params.images ? Params.images : []

			if(typeof model.images === "string")
				model.images = model.images.split(",")

			return model;
		};

		this.GetFormModel = (Params) => {
			return this.GetModel(Params)
		}

		this.GetProductCardModel = (Params) => {
			let model = {};

			model.images = Params && Params.images ? Params.images : []

			return model;
		}

		this.Get = () => {
			this.apiManager.SendRequest({
				method: "GET",
				endpoint: "/product",
			})
			.then(response => {
					if(response.data)
					{
						let data = response.data.map(item => this.GetModel(item));
						this.dataSetter(prevData => data.concat(prevData));
					}
				})
			.catch(error => console.error(error));
		};

		this.Save = (Data) => {
			this.apiManager.SendRequest({
				method: "POST",
				endpoint: "/product",
				data: Data
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

		this.Update = (Model) => {
			this.apiManager.SendRequest({
				method: "PUT",
				endpoint: "/product",
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
				endpoint: "/product",
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

		this.HandleEnableToggle = (state, row) =>
		{
			let model = this.GetModel(row);
			model.enable = state ? 1 : 0;
			this.Update(model);
		}
	}
}

export default ProductManagers;