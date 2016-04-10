 /*
 * Morse Code receiver app information:
 *
 * Purpose: This file is designed to take information from the camera sensor in an android phone pointed at a morse transmitter,
 * and then decode the information to then display it in the mobile application.	
 * Authors: Alasdair Price, Isobel Memeo, Simon Kogan, Germain d'Udekem d'Acoz
 * Last Modified: 8 April 2016
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
var morseCode = "";
var timeUnitsTrue = 0;
var timeUnitsFalse = 0;
var prevColour = false;
var colour = false;
var DOT = "1";
var DASH = "0";
var decodedMessage = "";

var lookupTable = 
{
	'': '',
	"10": "a",
	"0111": "b",
	"0101": "c",
	"011": "d",
	"1": "e",
	"1101": "f",
	"001": "g",
	"1111": "h",
	"11": "i",
	"1000": "j",
	"010": "k",
	"1011": "l",
	"00": "m",
	"01": "n",
	"000": "o",
	"1001": "p",
	"0010": "q",
	"101": "r",
	"111": "s",
	"0": "t",
	"110": "u",
	"1110": "v",
	"100": "w",
	"0110": "x",
	"0100": "y",
	"0011": "z",
	"00000": "0",
	"10000": "1",
	"11000": "2",
	"11100": "3",
	"11110": "4",
	"11111": "5",
	"01111": "6",
	"00111": "7",
	"00011": "8",
	"00001": "9",
	"01001" : "(",
	"010010": ")",
	"101101": '"',
	"01110": "=",
	"100001": "'",
	"01101": "/",
	"10101": "+",
	"000111": ":",
	"101010": ".",
	"001100": ",",
	"110011": "?",
	"011110": "-",
	"100101": "@",
	"1110110":"$",
	"110010": "_",
	"010100": "!",
	"1010" : "\n"
};

/*
redOrBlue()

This function takes an image and determines whether it is mostly red or mostly blue.

arguments: 
	data: This represents the image in an array format, where the each pixel is represented by four elements
          representing the intesity of red, blue, green and alpha (transparency) in the image.
                
returns:
	true if the image is mostly red
	false if the image is mostly blue
*/

function redOrBlue(data)
{
	var red = 0, blue = 0;
	//These 'for' loops iterate through the array, adding the values of red in each pixel to the variable 'red' and 
	//the values of blue in each pixel to the variable 'blue'. By then comparing the two variables we can determine
	//whether the image is mostly red or mostly blue.
	for (i = 0; i < data.length; i += 4)
	{
		red += data[i];
	}
	for (i = 2; i < data.length; i += 4)
	{
		blue += data[i];
	}
	if (red > blue )
	{
		return true
	} 
	else 
	{
		return false
	}
}

document.getElementById("restartButton").onclick = onclick;

/*
onclick()

This function is called when the button with the id 'restartButton' is clicked. It makes the app ready to record a new
message by clearing the message field and resetting all the global vairables to their original values.

arguments:
	This funtion has no arguments.
	
returns:
	This function does not return anything.
*/

function onclick() 
{
	morseCode = "";
	timeUnitsTrue = 0;
	timeUnitsFalse = 0;
	prevColour = false;
	DOT = "1";
	DASH = "0";
	decodedMessage = "";
	colour = false;
	document.getElementById("messageField").innerHTML = decodedMessage;
}

/*
updateTimeUnits()

This function is called at the end of every iteration of the decodeCameraImage() function. It is used to keep a tally on
the number of time units that a colour has been displaying for. It does this by updating by 1 the global variable 
'timeUnitsTrue' if the color is red and 'timeUnitsFalse' if the color is blue. This is then useful to figure out what 
the morse sequence is.

arguments:
	This functin has no arguments.
	
returns:
	This function does not return anything.
*/

function updateTimeUnits() 
{
    if (prevColour === true) 
    {
    	timeUnitsTrue += 1
    } 
    else 
    {
    	timeUnitsFalse += 1
    }
}

/*
updateMessage()

This function translates a morse sequence into an alphanumerical character by looking it up in the 'lookupTable' object,
and then updates the decoded message with that character. It then refreshes the message field with the full decoded 
message.

arguments:
	morse: represents a morse sequence where a '1' represents a dot and a '0' represents a dash.
	
returns:
	This function does not return anything.
*/

function updateMessage(morse) 
{
	var END_OF_TRANSMISSION = '111010';
	if (morse !== END_OF_TRANSMISSION)
	{
		var character = lookupTable[morse];
		//We set up the following 'if' statement so that if the morse sequence is not in the lookup table (which can
		//happen if the user moves the camera accidentally), 'undefined' is not printed to the message field. Instead, an
		//error is printed to the console, also indicating after which segment of text the error occured.
		if (character !== undefined) 
		{
			//The decodedMessage variable denotes what has currently been transmitted of the message. At this point in
			//the code, it gets updated with the new character.
			decodedMessage += character;
			document.getElementById("messageField").innerHTML = decodedMessage;
		} 
		else 
		{
			console.log('Error: Unrecognised character after "' + decodedMessage + '" segment.')
		}
	} 
	else 
	{
		messageFinished();
	}
}

/*
translateToMorse()

This function is called whenever the colour changes. It looks at what the previous colour was and how many time units
it was displayed for, and it determines what that colour represented. If it was red, it will determine if it was a dot 
or a dash and update the morse sequence accordingly. If it was blue, it will figure out if it was a space between two
elements or two words. If it was, it will call the updateMessage() function.

arguments:
	timeUnits: an integer representing how long the previous colour was shown for in time units.
	
returns:
	This function does not return anything.
*/

function translateToMorse(timeUnits) 
{
    if (prevColour === true) 
    {
        if (timeUnits <= 2)
        {
        	morseCode += DOT;
        } 
        else  
        {
        	morseCode += DASH;
        }
    } 
    else 
    {
		if (timeUnits <= 6 && timeUnits > 2) 
		{
			updateMessage(morseCode);
			morseCode = '';
		} 
		else if (timeUnits > 6)
		{
			updateMessage(morseCode);
			//If the colour blue stays on for seven or more time units, then it denotes a space in between two words. This
			//is why a space is added to the variable 'decodedMessage' in the line below.
			decodedMessage += " ";
			document.getElementById("messageField").innerHTML = decodedMessage;
			morseCode = '';
		}
    }
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
	colour = redOrBlue(data);
	if (colour !== prevColour) 
    {
    	if (prevColour === true) 
    	{
    		translateToMorse(timeUnitsTrue);
    	} 
        else 
        {
        	translateToMorse(timeUnitsFalse);
        }
        //Since the colour has just changed, we re-initialise the following two variables to 0 so that the counting of time
        //units can begin again.
	    timeUnitsTrue = 0;
	    timeUnitsFalse = 0;
    }
    
    prevColour = colour;
    updateTimeUnits();
    return colour;
}
