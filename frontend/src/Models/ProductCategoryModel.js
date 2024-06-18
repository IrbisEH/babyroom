import React, {useEffect} from "react";

class ProductCategoryModel {
	constructor(Params) {
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
				),
			},
			// {
			// 	id: "edit",
			// 	cell: row => (
			// 		<div onClick={(event) => handleEditIconClick(event, row)}>
			// 			<FaRegEdit size={16}/>
			// 		</div>
			// 	),
			// 	button: "true",
			// 	width: "50px",
			// },
			// {
			// 	id: "trash",
			// 	cell: row => (
			// 		<div onClick={(event) => handleTrashIconClick(event, row)}>
			// 			<FaRegTrashCan size={16}/>
			// 		</div>
			// 	),
			// 	button: "true",
			// 	width: "50px",
			// }
		];

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : "";
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";

			try
			{
				model.units = JSON.parse(Params.units);
			}
			catch(e)
			{
				model.units = "";
			}

			return model;
		};

		this.GetData = () => {
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
	}
}

export default ProductCategoryModel;