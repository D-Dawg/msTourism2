
const HotelFilterHandler = require('./HotelFilterHandler');

class TypeSelectionHandler{
	
	constructor(){

	}
	
	doFulfill(app,db){

        let ordinal = app.inputs.ordinal;
        let things = app.inputs.things;

        let returnQuery = "I didnt understand your input. Please select one of the following locations, Hotels Restaurants and Pups. You can select them by Index. First, Second and third or the Location type.";
		if(!ordinal && !things){
            app.ask( returnQuery);
        }else{

            app.db().load('city',(err,city) => {
                let type;
                if(ordinal) {
                    switch (ordinal) {
                        case 1:
                            type = "Hotel";
                            break;
                        case 2:
                            type = "Restaurant";
                            break;
                        case 3:
                            type = "BarOrPub";
                            break;
						default:
							type = "Hotel";
							break;
                    }
                }else{
                	type = things;
                }

                app.db().save("type", type, (err) => {
                    console.log("Attribute 'type' set with content of '" + type + "'");

                    let numVal = 1;

                    this.hotelFilterHandler = new HotelFilterHandler();

                    this.hotelFilterHandler.searchAndFilter(app, db, numVal, city, "rating", type, (resultString) => {
                        console.log("Hotel search result: "+ resultString);
                        app.ask(resultString );
                    });

                     });


            })


		}

    }
}



module.exports = TypeSelectionHandler;