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

function displayMenu2(menuOptions, boxY) {
	display.begin();
	display.clear(0);
	var menuY = 0;
	for (var i = 0; i < menuOptions.length; i ++) {
		display.setCursor(0, menuY);
		display.print(menuOptions[i]);
		menuY += 10
	}
	display.rect(0, boxY, 64, 10);
	display.display();
	display.setFontType(0);
}

function Menu(menuOptions, selected, leftBreakout) {
	var maxDisplayable = 5;
	var maxOption = menuOptions.length - 1;
	var displayableMenu = menuOptions;
	if (menuOptions.length > maxDisplayable) {
		displayableMenu = menuOptions.slice(0, maxDisplayable);
	}
	var boxY = (selected) * 10;
	var yMax = (displayableMenu.length - 1) * 10;
        displayMenu2(displayableMenu, boxY);
	var topSelected = 0;
	while (true) {

                if (btnDown.pinRead() == edison.LOW) {
                        if (boxY <= yMax) {
                                if (boxY < yMax) boxY += 10;
                                if (selected < maxOption) selected += 1;
			}
			if (selected > displayableMenu.length - 1) {
				displayableMenu = menuOptions.slice(selected - maxDisplayable + 1, selected + 2);
				topSelected = selected - maxDisplayable + 1;
				console.log("scroll down");
			}	
                        displayMenu2(displayableMenu, boxY);
			console.log("selected = ", menuOptions[selected]);
                }
                if (btnUp.pinRead() == edison.LOW) {
                	if (boxY >= 0) {
                                if (boxY > 0) boxY -= 10;
                                if (selected > 0) selected -= 1;
                        }
			if (selected === topSelected - 1 && topSelected !== 0) {
				displayableMenu = menuOptions.slice(selected, topSelected + maxDisplayable);
			}	
                        displayMenu2(displayableMenu, boxY);
			console.log("selected = ", menuOptions[selected]);
                }
                if (btnRight.pinRead() == edison.LOW) {
                        break;
                }
		if (btnLeft.pinRead() === edison.LOW && leftBreakout) {
			return ["Menu", selected];
		}
		if (btnA.pinRead() === edison.LOW) {
			return ["Off", selected];
		}
        }
        return [menuOptions[selected], selected];
}

var exports = module.exports;
exports.Menu = Menu;


