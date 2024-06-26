class ProductManagers {
	constructor(Params) {
		this.Id = Params && Params.Id ? Params.Id : "Products"

		this.tableName = "Товары";

		this.apiManager = Params.apiManager;
		this.tableData = Params.tableData;
		this.tableDataSetter = Params.tableDataSetter;
		this.units = Params.unitsData;
		this.promo = Params.promoData;
		this.tags = Params.tagData;
		this.categories = Params.categoryData;


		this.columnsConfig = [
			{
				id: "id",
				name: "id",
				selector: row => row.id,
				width: "100px"
			},
			{
				id: "enable",
				name: "Вкл/Выкл",
				selector: row => row.enable,
				width: "100px"
			},
			{
				id: "name",
				name: "Название",
				selector: row => row.name,
			},
			{
				id: "description",
				name: "Описание",
				selector: row => row.description,
			},
			{
				id: "category_id",
				name: "Категория",
				selector: row => row.category_id,
			},
			{
				id: "units_id",
				name: "Размеры",
				selector: row => row.units_id,
			},
			{
				id: "promotion_id",
				name: "Промо",
				selector: row => row.promotion_id,
			},
			{
				id: "price",
				name: "Цена",
				selector: row => row.price,
			},
			{
				id: "tags",
				name: "теги",
				selector: row => row.tags,
			},
			{
				id: "img",
				name: "теги",
				selector: row => row.img,
			}
		];

		this.formConfig = [
			{id:"enable", label:"Вкл/Выкл", type:"toggle", required:false},
			{id:"name", label:"Название", type:"text", required:true},
			{id:"description", label:"Описание", type:"text", required:true},
			{id:"category_id", label:"Категория", type:"select", options:this.categories, default:"", with_empty:true, required:false},
			{id:"units_id", label:"Размеры", type:"select", options:this.units, default:"", with_empty:true, required:false},
			{id:"promotion_id", label:"Промо", type:"select", options:this.promo, default:"", with_empty:true, required:false},
			{id:"tags", label:"Теги", type:"select", options:this.tags, default:"", with_empty:true, required:false},
			{id:"price", label:"Цена", type:"text", required:true},
			{id:"img", label:"Изображение", type:"text", required:true},
		]

		this.GetModel = (Params) => {
			let model = {};

			model.id = Params && Params.id ? Params.id : null;
			model.enable = Params && Params.enable ? Params.enable : 0;
			model.name = Params && Params.name ? Params.name : "";
			model.description = Params && Params.description ? Params.description : "";
			model.category_id = Params && Params.category_id ? Params.category_id : "";
			model.units_id = Params && Params.units_id ? Params.units_id : "";
			model.promotion_id = Params && Params.promotion_id ? Params.promotion_id : "";
			model.price = Params && Params.price ? Params.price : "";
			model.tags = Params && Params.tags ? Params.tags : "";
			model.img = Params && Params.img ? Params.img : "";

			return model;
		};

		this.GetFormModel = (Params) => {
			return this.GetModel(Params)
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
			.catch(error => console.log(error));
		};

		this.Save = (Model) => {
			this.apiManager.SendRequest({
				method: "POST",
				endpoint: "/product",
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
				endpoint: "/product",
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
				endpoint: "/product",
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

export default ProductManagers;