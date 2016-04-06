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

function translate (timeUnits) {
    if (prevColour === true) {
        if (timeUnits <= 2){
                morseCode += dot;
        } else  {
                morseCode += dash;
        }
    } else {
		if (timeUnits <= 2) {
			morseCode += elementSpace;
		} else if (timeUnits <= 6) {
			morseCode += letterSpace;
			//Run a funtion that takes the variable 'morseCode' and translates it to the corresponding 
			//character by looking it up in the global object.
			morseCode = '';
			console.log(decodedMessage);
		} else {
			morseCode += wordSpace;
			//Update the variable 'decodedMessage' with a ' ' space, and at the end of the
			//decodeCameraImage funtion update the messagebox on the website to that variable.
			decodedMessage += " ";
			document.getElementById("messageField").innerHTML = decodedMessage;
			morseCode = '';
			console.log(decodedMessage);
		}
    }
    timeUnitsTrue = 0;
    timeUnitsFalse = 0;
}

function updateMessage(morse) {
	var character = lookup[morse];
	decodedMessage += character;
	document.getElementById("messageField").innerHTML = decodedMessage;
}

function updateTimeUnits() {
	prevColour = color
    if (prevColour === true) {
            timeUnitsTrue += 1
    } else {
            timeUnitsFalse += 1
    }
}

var characters = "";
var morseCode = "";
var timeUnitsTrue = 0;
var timeUnitsFalse = 0;
var prevColour = false;
var dot = "1";
var dash = "0";
var elementSpace = "";
var letterSpace = "";
var wordSpace = "";
var decodedMessage = "";
var color = false;

var lookup = 
{
	10:'a',
	0111:'b',
	0101:'c',
	011:'d',
	1:'e',
	1101:'f',
	001:'g',
	1111:'h',
	11:'i',
	1000:'j',
	010:'k',
	1011:'l',
	00:'m',
	01:'n',
	000:'o',
	1001:'p',
	0010:'q',
	101:'r',
	111:'s',
	0:'t',
	110:'u',
	1110:'v',
	100:'w',
	0110:'x',
	0100:'y',
	0011:'z',
	0000:'0',
	10000:'1',
	11000:'2',
	11100:'3',
	11110:'4',
	11111:'5',
	01111:'6',
	00111:'7',
	00011:'8',
	00001:'9',
	1010:'/n',
	111010: messageFinished(),
}


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
	color = redOrBlue(data);
    if (color !== prevColour) {
            if (prevColour === true) {
                    translate (timeUnitsTrue);
            } else {
                    translate (timeUnitsFalse);
            } 
    }
    updateTimeUnits();
    return color;
}
