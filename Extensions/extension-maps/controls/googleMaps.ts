import * as app from 'tns-core-modules/application';
import { IView } from './IView';
import { IControl } from './controls/IControl';
import { BaseObservable } from './observables/BaseObservable';
import { EventHandler } from './EventHandler';
import * as platform from "tns-core-modules/platform";
import * as geocoding from "nativescript-geocoding";
import {getJSON, getString, request, HttpResponse } from "tns-core-modules/http";
//var GMSServices: any;
/* NOTES - 
	for android devices -
		1) <meta-data android:name="com.google.android.geo.API_KEY" android:value="AIzaSyCdPVZiHXgaxIF6H1qOHzFHNaO0k5dAZt0" /> // add this line in androidmanifest.xml
		2) dependencies {
      		implementation 'com.google.android.gms:play-services-maps:17.0.0'
    		} // add this line to app.gradle
    		
    	3)  dependencies {
        classpath 'com.google.gms:google-services:4.0.1'
		classpath 'com.android.tools.build:gradle:3.4.2'
        classpath 'com.google.android.gms:play-services-maps:17.0.0'
    } // THIS MAY NOT BE REQUIRED.... - add last row (play-services in build.gradle) under platform /android folder
    
    for IOS
    pod 'GoogleMaps'
	pod 'GooglePlaces' // add this 2 lines for pod file under project/platform/ios/pod file
	run a command pod install from ios folder
*/

export class googleMaps extends IControl implements com.google.android.gms.maps.OnMapReadyCallback{
	private _mapView:any;
	private _gMap: any;
	private _marker:any;
	private _geo:any;
	private _houseNumber: any;
	private _street:any;
	private _city:any;
	private _country: any;
	private _postalCode:any;
	private _customerAddress: String;
	private _geocoder: any;
	private _APIKey = "AIzaSyCdPVZiHXgaxIF6H1qOHzFHNaO0k5dAZt0";
	private _GEOCODE_ADDRESS_URL: any;
	private _address = new Object();
	
	public initialize(props: any): any {
    	super.initialize(props);
    	//this._geocoder = new google.maps.Geocoder();
    	//this.getlatlang(this._customerAddress);
    	
        if(this.definition().data.ExtensionProperties.Prop) {
        	var property = this.definition().data.ExtensionProperties.Prop;
        	this._customerName = property.LastName;
        	this._houseNumber = property.HouseNumber;
        	this._street = property.Street;
        	this._city =  property.City;
        	this._country = property.Country;
        	this._postalCode = property.PostalCode;
        }
        
        if (app.android) {
        	this._mapView = new com.google.android.gms.maps.MapView(this.androidContext());
        	var localeLanguage = java.util.Locale;
        	this._geo = new android.location.Geocoder(this.androidContext(),localeLanguage.ENGLISH);
        	this._mapView.onCreate(null);
        	this._mapView.onResume();
        	
        	app.android.on(app.AndroidApplication.activityPausedEvent, this.onActivityPaused, this);
	        app.android.on(app.AndroidApplication.activityResumedEvent, this.onActivityResumed, this);
	        app.android.on(app.AndroidApplication.saveActivityStateEvent, this.onActivitySaveInstanceState, this);
	        app.android.on(app.AndroidApplication.activityDestroyedEvent, this.onActivityDestroyed, this);
	        var that = this;
	        
	        var mapReadyCallBack = new com.google.android.gms.maps.OnMapReadyCallback({
	        	onMapReady: (gMap) => {
	        		console.log("inside onMapReady function");
	        		that._gMap = gMap;
	        		var data = that._geo.getFromLocationName(this._customerAddress, 1);
	        		//console.log("Latitude ="+ data.get(0).getLatitude());
	        		//console.log("Longitude ="+ data.get(0).getLongitude());
	        		var latLng = new com.google.android.gms.maps.model.LatLng(data.get(0).getLatitude(),data.get(0).getLongitude());
        			that._gMap.addMarker(new com.google.android.gms.maps.model.MarkerOptions().position(latLng).title(this._customerName +"'s " +"address"));
        			that._gMap.moveCamera(new com.google.android.gms.maps.CameraUpdateFactory.newLatLng(latLng));

	        	}
	        });
	        this._mapView.getMapAsync(mapReadyCallBack);
	        
        } else if (app.ios){
        	console.log("inside ios 2");
        	//https://developers.google.com/maps/documentation/ios-sdk/reference/interface_g_m_s_map_view - documentation for google maps for ios.....
        	GMSServices.provideAPIKey("AIzaSyCdPVZiHXgaxIF6H1qOHzFHNaO0k5dAZt0");
        	//this._mapView = GMSMapView.moveCamera(GMSCameraUpdate.setTarget(CLLocationCoordinate2D(latitude: (mapView.myLocation?.coordinate.latitude)!, longitude: (mapView.myLocation?.coordinate.longitude)!), zoom: 16);
        } else {}
	}
	
	private getLatLng(customerAddress: String) {
		// this._GEOCODE_ADDRESS_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + customerAddress + '&key=' + this._APIKey;
		// console.log("inside getLatLng function and address = "+ this._GEOCODE_ADDRESS_URL);
		// request({
		// 	url: encodeURI(this._GEOCODE_ADDRESS_URL),
		// 	method: "GET"
		// }).then((response: HttpResponse) => {
		// 	console.log("RESPONSE = " + response.content.toString());
		// }, (error) => {
		// 		console.log("ERROR = " + error);
		// });
		let geocoder = CLGeocoder();
		geocoding.getLocationFromName(customerAddress).then(loc => {
			this._address.latitude = loc.latitude;
			this._address.longitude = loc.longitude;
    		console.log('latitude ', loc.latitude);
    		console.log('longitude ', loc.longitude);
		}, function (e) {
    		console.log("Error: " + (e.message || e));
		});
		// http.get(this._GEOCODE_ADDRESS_URL, (resp) => {
		// 	console.log("RESPONSE = " + resp);
		// });
	}
	
	/*private getlatlang(customerAddress){
		console.log("inside getlatlang function and customerAddress = "+ customerAddress);
		geocoder.geocode( {address:customerAddress}, function(results, status) 
		{
    		if (status == google.maps.GeocoderStatus.OK) 
    		{
    			console.log("NEW lat long = "+results[0].geometry.location);
    			map.setCenter(results[0].geometry.location);//center the map over the result
    			//place a marker at the location
    			var marker = new google.maps.Marker(
    			{
        			map: map,
        			position: results[0].geometry.location
    			});
    		} else {
    			alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}*/
	
    private _createCameraPosition() {
    	//let camera = GMSCameraPosition.initWithTarget(this._address.latitude,this._address.longitude,6.0)
    	var lat = GMSMarker.new();
    	//var long = CLLocationDegrees.new();
    	//console.log(" lat = "+lat + "and long = "+ long);
        return GMSCameraPosition.cameraWithLatitudeLongitudeZoomBearingViewingAngle(
            lat,long,6,10,10
        );
    }
	private onActivityPaused(args) {
		console.log("AKARSH - Inside onActivityPaused");
        if (!this._mapView || this!= args.activity) return;
        this._mapView.onPause();
    }
    
    private onActivityResumed(args) {
    	console.log("AKARSH - Inside onActivityResumed");
        if (!this._mapView || this!= args.activity) return;
        this._mapView.onResume();
    }

    private onActivitySaveInstanceState(args) {
    	console.log("AKARSH - Inside onActivitySaveInstanceState");
        if (!this._mapView || this!= args.activity) return;
        this._mapView.onSaveInstanceState(args.bundle);
    }

    private onActivityDestroyed(args) {
    	//console.log("AKARSH - Inside onActivityDestroyed");
        if (!this._mapView || this!= args.activity) return;
        this._mapView.onDestroy();
    }
	public view() {
		
		this.valueResolver().resolveValue([this._houseNumber,this._street,this._city,this._country,this._postalCode]).then((address) => {
			this._customerAddress = address[0] + ' ' + address[1] + ' ' + address[2] + ' ' + address[3] + ' ' + address[4];
			console.log("Akarsh inside View function and address = "+ this._customerAddress);
			this.getLatLng(this._customerAddress);
		});
		this.valueResolver().resolveValue(this._customerName).then((name) => {
			this._customerName = name;
		});
		
        if (app.android) {
        	console.log("Akarsh inside View function IF condition");
            return this._mapView;
        }
       if(app.ios) {
       	console.log("inside ios 1");
  //     	var add;
  //     			this.valueResolver().resolveValue([this._houseNumber,this._street,this._city,this._country,this._postalCode]).then((address) => {
		// 	add = address[0] + ' ' + address[1] + ' ' + address[2] + ' ' + address[3] + ' ' + address[4];
		// 	console.log("Akarsh inside View function and address = "+ add);
		// });
		
  //     	this.getLatLng(add);
  //     	console.log("inside IOS functionality and address is = "+ add);
        this._mapView = GMSMapView.mapWithFrameCamera(CGRectZero, this._createCameraPosition());
        //this._mapView = GMSMapView.moveCamera(GMSCameraUpdate.setTarget(CLLocationCoordinate2D(this._address.latitude,this._address.longitude)));
        //this._mapView = GMSMapView.moveCamera(GMSCameraUpdate.setTarget(CLLocationCoordinate2D(latitude: -32, longitude: -28), zoom: 16);
        return this._mapView;
        //let camera = GMSCameraPosition.initWithTarget(this._address.latitude,this._address.longitude,6.0)
    	//this._mapView = GMSMapView.initWithFrame(CGRect.zero,this._createCameraPosition())
        //this._marker = GMSMarker();
        //this._marker.position = CLLocationCoordinate2D(this._address.latitude,this._address.longitude);
        //this._marker.map = this._mapView;
		//this._createCameraPosition();
       	//return this._marker;
       	
       	
       	// apple maps code.... 
       	// set initial location in Honolulu
		//var initialLocation = CLLocationCoordinate2D.init();
		//console.log("initlocation = "+ initialLocation);
       }
    }
    public viewIsNative() {
    	//console.log("Akarsh inside viewIsNative function");
        return true;
    }

    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
    }

    public setContainer(container: IControl) {
        // do nothing
    }

    public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        // do nothing
        return Promise.resolve();
    }
}