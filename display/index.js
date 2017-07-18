var edison = require('edison-oled');
 
//create Oled 
var oled = new edison.Oled();
 
//setup input buttons 
var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);
var btnB = new edison.Gpio(46, edison.INPUT);
 
//setup screen 
oled.begin();
oled.clear(0);
oled.display();
oled.setFontType(0);	
 
//draw on screen 
oled.clear();
oled.setCursor(14, 5);
oled.print("Press A");
oled.setCursor(2, 13);
oled.print("for single");
oled.setCursor(14, 30);
oled.print("Press B");
oled.setCursor(6, 38);
oled.print("for multi");
oled.display();	
 
//wait for user to make a choice using Button A or Button B 
while (btnA.pinRead() == edison.HIGH && btnB.pinRead() == edison.HIGH) 
{console.log("here")}
 
