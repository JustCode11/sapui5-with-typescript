import { InputBase$ChangeEvent } from "sap/m/InputBase";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";
import Dialog from "sap/m/Dialog";

type WeatherInfo = {
	current_weather: {
		temperature: number,
		windspeed: number,
		winddirection: number
	}
}

/**
 * @namespace com.myorg.myapp.controller
 */
export default class Main extends BaseController {
	_oDialog: Control | Control[];
	// public sayHello(): void {
	// 	MessageBox.show("Hello World!");
	// }
	onInit(): void {
		const model = new JSONModel();
		this.setModel(model);
		void this.loadWeatherData();
	}

	async loadWeatherData(lat = "49.31", lon = "8.64") {
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
		const jsonData = await response.json() as WeatherInfo;
		(this.getModel() as JSONModel).setData(jsonData);
	}

	locationChange(evt: InputBase$ChangeEvent) {
		const location = evt.getParameters().value;
	}

	async onOpenDialog() {
		if (!this._oDialog) {
			this._oDialog = await this.loadFragment({
				name: "com.myorg.myapp.fragment.TestDialog"
			});
		}
		(this._oDialog as Dialog).open();
	}
}
