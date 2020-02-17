import * as app from 'tns-core-modules/application';
import { BaseControl } from './controls/BaseControl';
import { Label } from "tns-core-modules/ui/label";
import {Slider} from "tns-core-modules/ui/slider";
import {Button} from "tns-core-modules/ui/button";
import { Color } from "tns-core-modules/color";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import {TextView} from "tns-core-modules/ui/text-view";

export class nativescriptLableExtension extends BaseControl {
	public initialize(props) {
    	super.initialize(props);
    // 	const myLabel = new Label();
    // 	myLabel.text = "The quick";
    // 	 let colorHex = new Color("#FF00CC");
    // 	 //myLabel.
    // 	myLabel._context = app.android ? this.androidContext() : myLabel._context;
    // 	    myLabel.textAlignment = "center";
    // myLabel.fontSize = 24;
    // 	this.setView(myLabel.createNativeView());
    	
    	//   let firstTextview = new TextView();
    	// firstTextview.hint = "Enter text";
    	// firstTextview._context = app.android ? this.androidContext() : firstTextview._context;
    		//this.setView(firstTextview);
    	//const sliderComponent = new Slider();
    //sliderComponent._context = app.android ? this.androidContext() : sliderComponent._context; /* Need to do this for Android as a workaround to assign context*/
    //this.setView(sliderComponent.createNativeView());
    
    const myButton = new Button();
	myButton.text = "Tap me!";
	myButton.backgroundColor = new Color("#FF00CC");
	//myButton.className = "btn btn-primary btn-active";
	if(app.android) {
			myButton._context = app.android ? this.androidContext() : myButton._context; /* Need to do this for Android as a workaround to assign context*/	
	}
	 myButton.on(Button.tapEvent, (data: GestureEventData) => {
	    // data is of type GestureEventData
	    alert("Button Tapped!");
	});
    this.setView(myButton.createNativeView());
	}
	
	public viewIsNative() {
    	return true;
	}
}