var builder = require('botbuilder');


// Import QnARecognizer List
//var QnARecognizer = require('../QnAMakerConfig');

// Import Luis Recognizer
var LuisRecognizer = require('../luisConfig');

//Initialize the final Recognizer list
var RecognizerList = [];

//Append QnAReocognizer list to the final RecognizerList
/*QnARecognizer.forEach(function(item){
    RecognizerList.push(item);
})*/;


//Append LuisRecognizer list to the final RecognizerList
RecognizerList.push(LuisRecognizer);


//Intent Dialog Declaration
var intents = new builder.IntentDialog({ 
    recognizers: RecognizerList,
    intentThreshold:0.7});

console.log(intents);

    

//Luis Intent Registerations
intents.matches('VPNInstallation', require('./VPNInstallation'));


//QnA Intent Registeration
intents.matches('qna', [
    function (session, args, next) {
        console.log("Reach QNA Block")
        var answerEntity = builder.EntityRecognizer.findEntity(args.entities, 'answer');
       // logger.info({session});
        session.send(answerEntity.entity);
    }
]);


//Default or None Intent Registerations
intents.onDefault([
    function(session){
        //logger.warn({"Untrained Text": session.message.text}); 
       //var handoverMsg = HandoverCard(session,session.message.text);
        session.send("Right now i am not smart enough to resolve this query");
        session.endDialog("Let me connect you to the live agent");
       // session.endDialog(handoverMsg);
	}
]);

module.exports=intents;