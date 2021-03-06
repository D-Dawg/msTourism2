'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;
const config = require('config');

const handlers = require("./logic/MainLogic").getHandlers();
const Logger = require('./logic/Logger');

const path = require('path');
let FILE = path.basename(__filename);

let myIntentsToSkipUnhandled = [
    'FUNsoundIntent',
    'HelperStatusIntent',
    'FUNcreditsIntent',
    'ChangeCityIntent',
    'Default Welcome Intent',
    'CancelIntent'
];

app.setIntentsToSkipUnhandled(myIntentsToSkipUnhandled);

app.setConfig({
    intentsToSkipUnhandled: myIntentsToSkipUnhandled,
    // Other configurations
});

// Listen for post requests
webhook.listen(config.get("port"), function() {
	Logger.log(FILE, 'Local development server listening on port.'+  config.get("port"));    	
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});



webhook.get('/hans', function(req, res) {
    res.json({hans:"hansoihkj00c"});
});



