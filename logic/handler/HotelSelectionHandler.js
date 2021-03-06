const path = require('path');
let CURRENT_FILE = path.basename(__filename);
const Logger = require('./../Logger');

const StringConstants = require("./../../config/Constants");


class HotelSelectionHandler {

    constructor() {

    }

    doFulfill(app, db) {

        let hotelName = app.inputs.selectedHotelName;
        if(!hotelName){
            hotelName = app.inputs.hotelName;
        }
        let that = this;

        if (hotelName && hotelName != '') {
	        db.mfindOne({type: /Hotel/, "annotation.name": new RegExp(hotelName, "i")}).then((data) => {
		            if (Array.isArray(data)) {
		            	if(data.length>0){
			                data.forEach((entry) => {
			                    app.db().save("selectedHotel", data, (err) => {
			                        Logger.log(CURRENT_FILE,"Attribute 'selectedHotel' set with content of '" + data.annotation.name + "'");
			                        app.ask(StringConstants.INFO_POSSIBILITIES_HOTEL);
			                    });
			                });
		            	}else{
		            		that.doInformAboutNoMatch(app, hotelName);
		            	}
		            } else {
		            	if(data){
			                app.db().save("selectedHotel", data, (err) => {
			                    Logger.log(CURRENT_FILE,"Attribute 'selectedHotel' set with content of '" + data.annotation.name + "'");
			                    app.ask(StringConstants.INFO_POSSIBILITIES_HOTEL);
			                });
		            	}
		            	else{
		            		that.doInformAboutNoMatch(app, hotelName);	            		
		            	}
		            }
	        });
	    }else{
	    	app.ask(StringConstants.INFO_NOT_UNDERSTAND);
	    }
    }    
        
    doInformAboutNoMatch(app, hotelName){
    	app.ask( StringConstants.INFO_NOT_FOUND_CONTEXT+hotelName+"'");
    }
    
}

module.exports = HotelSelectionHandler;
