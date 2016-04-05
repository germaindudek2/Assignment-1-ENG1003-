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

var characters = ""
var morseCode = ""
var timeUnitsTrue = 0
var timeUnitsFalse = 0
var prevColour = true
var dot = "1"
var dash = "0"
var elementSpace = ""
var letterSpace = ", "
var wordSpace = "-"


/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for 
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *         an 'on' (red) signal.
 */
function decodeCameraImage(data)
{
    redOrBlue (data)
    if (redOrBlue(data) !== prevColour)
        {
            if (prevColour === true)
                {
                    translate (timeUnitsTrue)
                }
            else
                {
                    translate (timeUnitsFalse)
                } 
        }
    else 
        {
            null
        }
    
    
    prevColour = redOrBlue(data)
    if (prevColour === true)
        {
            timeUnitsTrue += 1
        }
    else
        {
            timeUnitsFalse += 1
            
        }
    
    
}

function translate (a)
{
    if (prevColour === true)
        {
            if (a >= 1 || a <= 2)
                {
                    morseCode += dot
                    
                    timeUnitsTrue = 0
                    timeUnitsFalse = 0
                }
            else 
                {
                    morseCode += dash
                    
                    timeUnitsTrue = 0
                    timeUnitsFalse = 0
                }
        }
    else
        {
            if (a >= 1 || a <= 2)
                {
                    morseCode += elementSpace
                    
                    timeUnitsTrue = 0
                    timeUnitsFalse = 0
                }
            else if (a >= 3 || a <= 6) 
                {
                    morseCode += letterSpace
                    
                    timeUnitsTrue = 0
                    timeUnitsFalse = 0
                }
            else 
                {
                    morseCode += wordSpace
                    
                    timeUnitsTrue = 0
                    timeUnitsFalse = 0
                }
        }
}


