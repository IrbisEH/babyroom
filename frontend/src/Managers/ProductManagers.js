class ProductManagers {
	constructor(Params) {
		this.tableName = "Товары";

		this.apiManager = Params.apiManager;
		this.tableData = Params.tableData;
		this.tableDataSetter = Params.tableDataSetter;
		this.productCategories = Params.productCategoriesData;

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
				selector: row => {
					if(row.category_id)
					{
						console.log(this.productCategories);
					}
				},
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
			{id:"category_id", label:"Категория", type:"select", options:this.productCategories, default:"", required:true},
			{id:"title", label:"Название", type:"input", required:true},
			// {id:"enable", label:"Доступен", type:"checkbox", required:false}
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

		this.GetFormModel = (Params) => {

			return {}
		}

		this.GetData = () => {
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

export default ProductManagers;