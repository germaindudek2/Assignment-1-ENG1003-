/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the 
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 * 
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should 
 *     cause your app to reset its state and begin recieving
 *     a new message.
 *
 */


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE

function redOrBlue(data){
	function objectToHtml(data) {
		var readableString = '';
			for (var property in data) {
				readableString += "<p>Object property '" + property + "' has property value '" + data[property] + "'.</p>";
			}
		return readableString;
	}
    document.getElementById("messageField").innerHTML = objectToHtml(data);
    messageFinished();
}


function decodeCameraImage(data)
{
    // ADD YOUR CODE HERE
    redOrBlue(data);
    return false;
}
