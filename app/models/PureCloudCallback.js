/*=================================================================*/
const platformClient = require('purecloud-platform-client-v2');
const purecloudConfig = require('../../config/purecloudConfig');

const PURECLOUD_CLIENT_ID = purecloudConfig.callback.PURECLOUD_CLIENT_ID;
const PURECLOUD_CLIENT_SECRET = purecloudConfig.callback.PURECLOUD_CLIENT_SECRET;

// Set purecloud objects
const client = platformClient.ApiClient.instance;
const conversationsApi = new platformClient.ConversationsApi();

// Set PureCloud settings
client.setEnvironment(purecloudConfig.callback.ENVIROMENT);
client.setPersistSettings(true, purecloudConfig.callback.PERSIST_NAME);

module.exports = {
	createCallback : function(req, res) {
        // Authenticate with PureCloud
        var name = req.body.name;
		var phone = req.body.phone;
		
		client.loginClientCredentialsGrant(PURECLOUD_CLIENT_ID, PURECLOUD_CLIENT_SECRET)
			.then(() => {
				console.log('>>>>>>>>>>>>> INIT PURECLOUD CALLBACK');
				
				// Use your own IDs and data here
				const callbackData = {
					routingData: {
						queueId: purecloudConfig.callback.QUEUE_ID
					},
					scriptId: purecloudConfig.callback.SCRIPT_ID,
					callbackUserName: name,
					callbackNumbers: [
						phone
					],
					data:{
						customDataAttribute: name
					}
				};
		
				// Create callback
				return conversationsApi.postConversationsCallbacks(callbackData);
			})
			.then((result) => {
				console.log('>>>>>>>>>>>>> CALLBACK CREATED: ', result);
				return res.status(201).json(result);
			})
            .catch((err) => {
                console.error(">>>>>>>>>>>>> ERROR: " + err);
                return res.status(400).json(err);
            });
	}
};