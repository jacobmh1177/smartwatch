var edison = require('edison-oled');
var display = new edison.Oled();
//setup buttons
var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);

//setup menu options
var menuOptions = ["messages", "weather", "battery"]
var boxY = 0;
var selected = 0;
function displayMenu(boxY) {
        display.begin();
        display.clear(0);
        display.setCursor(0,0);
        display.print("Messages");
        display.setCursor(0,10);
        display.print("Weather");
        display.setCursor(0,20);
        display.print("Battery");
        display.rect(0, boxY, 64, 10);
        display.display();
        display.setFontType(0);
}

function Menu() {
        displayMenu(boxY);
        while (1) {
                if (btnDown.pinRead() == edison.LOW) {
                        if (boxY < 20) {
                                boxY += 10;
                                selected += 1;
                        }
                        displayMenu(boxY);
                }
                if (btnUp.pinRead() == edison.LOW) {
                	if (boxY > 0) {
                                boxY -= 10;
                                selected -= 1;
                        }
                        displayMenu(boxY);
                }
                if (btnRight.pinRead() == edison.LOW) {
                        break;

                }
        }
        return menuOptions[selected];
}

var exports = module.exports;
exports.Menu = Menu;


