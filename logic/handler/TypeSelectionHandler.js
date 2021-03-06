const path = require('path');
let CURRENT_FILE = path.basename(__filename);

const HotelFilterHandler = require('./HotelFilterHandler');
const StringConstants = require("./../../config/Constants");

class TypeSelectionHandler{
	
	constructor(){

	}
	
	doFulfill(app,db){

        let ordinal = app.inputs.ordinal;
        let things = app.inputs.things;

        let returnQuery = StringConstants.INTEND_TYPE_SELECTION;
		if(!ordinal && !things){
            app.followUpState("SelectTypeState")
                .ask( returnQuery, StringConstants.INFO_NOT_UNDERSTAND + StringConstants.INTEND_TYPE_SELECTION);
        }else{

            app.db().load('city',(err,city) => {
                let type;
                if(ordinal) {
                    switch (ordinal) {
                        case "1":
                            type = "Hotel";
                            break;
                        case "2":
                            type = "Store";
                            break;
                        case "3":
                            type = "Restaurant";
                            break;
                        case "4":
                            type = 'TouristAttraction';
                            break;
                        case "5":
                            type = 'SkiResort';
                            break;
                        case "6":
                            type = 'BarOrPub';
                            break;
                        case "7" :
                            type='BankOrCreditUnion' ;
                            break;
                        case "8":
                            type = 'Museum';
                            break;
                        case "9":
                            type = 'TrainStation';
                            break;
						default:
							type = "Hotel";
							break;

                    }
                }else{
                	type = things;
                }


                app.db().save("type", type, (err) => {
                    Logger.log(CURRENT_FILE, "Attribute 'type' set with content of '" + type + "'");

                    let numVal = 1;

                    this.hotelFilterHandler = new HotelFilterHandler();

                    this.hotelFilterHandler.searchAndFilter(app, db, numVal, city, "rating", type, (resultString) => {
                        Logger.log(CURRENT_FILE, "Hotel search result: "+ resultString);
                        app
                            .followUpState("SelectThingState")
                            .ask(resultString, StringConstants.INFO_NOT_UNDERSTAND + resultString  );
                    });

                     });


            })


		}

    }
}



module.exports = TypeSelectionHandler;
