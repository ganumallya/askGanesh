var builder = require('botbuilder');


module.exports = [
    function (session,results) {
        //console.log("====results=====");
		session.endDialog("You have reached VPN installation dialog");
	}
];