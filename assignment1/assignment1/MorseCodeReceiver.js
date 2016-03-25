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
	var red = 0, blue = 0;
	for (i = 0; i < data.length; i += 4){
		red += data[i];
	}
	for (i = 2; i < data.length; i += 4){
		blue += data[i];
	}
	if (red > blue ){
		return true
	} else {
		return false
	}
}


function decodeCameraImage(data)
{
	
	return redOrBlue(data);
}
