{
	"_Name": "demoApplication",
	"Version": "/demoApplication/Globals/AppDefinition_Version.global",
	"MainPage": "/demoApplication/Pages/Main.page",
	"OnLaunch": [
		"/demoApplication/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/demoApplication/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/demoApplication/Actions/Service/InitializeOffline.action",
	"Styles": "/demoApplication/Styles/Styles.less",
	"Localization": "/demoApplication/i18n/i18n.properties"
}