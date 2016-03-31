var output = " "
var dot = 1
var dash = 0
var shortTime = 200
var longTime = 400
var netTime = " "
var elementSpace = ""
var vLongTime = 1200
var letterSpace = ", "
var wordSpace = "-"



  collectData ( data )

    function collectData (a)
    {
        if ( data = true )
        {

            var start = new Date().getTime();  //gets time in miliseconds since jan 1 1970
            while (data = true)
                {
                    redOrBlue(data)
                }                        
            var end = new Date().getTime();    //get time in milliseconds when input changes
            var netTimeTrue = end - start        //calculate time that input = on for
            translateTrue (netTimeTrue)    
            redOrBlue(data)

            collectData (data)
        }

        else                  // if data = false
            {

                var start = new Date().getTime();  //gets time in miliseconds since jan 1 1970
                while ( data = false)
                    {
                        redOrBlue (data)
                    }                     
                var end = new Date().getTime(); 
                var netTimeOff = end - start    
                translateFalse (netTimeOff)
                x = event.button
                collectData (x)

            }

    }


       function translateTrue (a)
        {
            if (a <= longTime || a >= shortTime)      //if 200 < netTimeOn < 400 ms then output a dot
                {
                    output += dot
                }
            else if (a > longTime)
                {
                    output += dash
                }
        }

        function translateFalse (a)
        {
            if (a <= longTime || a >= shortTime)
                {
                    output += elementSpace
                }
            else if (a > longTime || a <= vLongTime)
                {
                    output += letterSpace
                }
            else if (a > vLongTime)
                {
                    output += wordSpace              // these functions should leave output as a long string of 1's 0's ,'s and -'s which can then be read and transformed into letters and words
                    
                }
        }