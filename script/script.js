/**

@Author: Sujan Dulal
@UN ID: 16418508
@TITLE : CSY1018 WEB DEVELOPMENT ASSIGNMENT 2

**/


/**
-------------------------------------------------------
*		GlOBAL VARIABLES DECLARATION START             *
-------------------------------------------------------

**/

var getHorse = [];								//Stores 4 different horses in an arrray.
var horseFinPosition = [];						//Stores the horses crossing the finish line in order.

var inRoad;										//Variable to get the inside track.
var outRoad;									//Variable to get the outside track.

var leftInRoadEdge,leftOutRoadEdge;				//Stores offsetleft value for left edge of inside and outside track 
var rightInRoadEdge,rightOutRoadEdge;			//Stores offesetleft value for right edge of both tracks' from the left edge.
var topInRoadEdge,downInRoadEdge;

var startLine;									//Variable to get the startline
var finishLine;									//Stores offsetleft value for the startline from the left edge.

var secondPathArray = [true,true,true,true];	
var goToEndArray = [false,false,false,false];	//Boolean array for the horse movement in right path.



var interval;									//Stores interval to call the startRace function.

var horsePower;									//Stores randomly generated number from 1 to 20 to assign as speed to the horse


var betAmount;									//Stores entered bet amount value
var selectLap;									//Stores given lap value by the user.
var betHorse;									//Stores selected horse to place a bet.
var accFund;									//Stores available fund in the game.
var totalFund;									//Variable to get the fund number from the HTML. 

var lapsCount;									//Stores lap value after Calculation
var laps; 										//Stores lapsCount value.

var lapShow;									//Variable to get the displaylap from the HTML.

/**
-----------------------------------------------------
*		GlOBAL VARIABLES DECLARATION END          	 *
-----------------------------------------------------

**/




/**

--RaceInitialization() functions gets the elements and calculates track size.
--Sets innerHTML of lapShow global variable to 1.
--Stores 4 different horses in global getHorse array.
--Calls another function checkBet()

**/

function RaceInitialization(){

	
	
	secondPathArray = [true,true,true,true];
	goToEndArray = [false,false,false,false];
	

	lapShow = document.getElementById('displaylap');
	inRoad =  document.getElementsByClassName('inner')[0];
	outRoad = document.getElementsByClassName('track')[0];
	startLine = document.getElementById('startline');

	lapShow.innerHTML = 1; //Resets Current lap to 1
	
	var vW = getWidthPercent(80);
	var vH = getHeightPercent (100);
	var vW2 = getWidthPercent(60);

	leftOutRoadEdge = 16 + outRoad.offsetLeft;		//16 = Size of border.

	finishLine = startLine.offsetLeft + leftOutRoadEdge + 35;

	leftInRoadEdge = inRoad.offsetLeft + leftOutRoadEdge;
	
	rightOutRoadEdge = leftOutRoadEdge + vW;

	rightInRoadEdge = leftInRoadEdge + vW2;
	
	topInRoadEdge = outRoad.offsetTop + 16;
	
    downInRoadEdge = topInRoadEdge + vH + getWidthPercent(20);

  
    
	for ( i = 0;i<=3;i++){
		getHorse[i] = document.getElementById('horse'+ (i+1));

	}

	checkBet();
}


/**
--Main function for the movement in the track.
--Generates 3 different random numbers r, m and horse power to have randomness in turning position and horse speed.
--To turn in a point, checks for leftEdge, RightEdge,boolean value and for the classname.
--Pushes unique horse to horseFinPosition global array in oder of crossing the finish line.
--Check laps and display result.

**/

function startRace(){
	
	var positionLeft;	//Stores offsetLeft of horse.
	var positionTop;	//Stores offsetTop of horse.
	disableButton();	

	for ( i = 0;i<=3;i++){
		var r = Math.floor(Math.random()*5);
		var m = Math.floor(Math.random()*10);
		horsePower = Math.ceil(Math.random()*20) ;

		if (getHorse[i].offsetLeft+48<=rightInRoadEdge + (2 -(i+1) ) * 32 && getHorse[i].className == 'horse standRight' && getHorse[i].offsetTop+60>=topInRoadEdge){
			getHorse[i].className = 'horse runRight';
		}

		if (getHorse[i].className == 'horse runRight' && getHorse[i].offsetLeft+(70-(m*getWidthPercent(2)))<=rightInRoadEdge + (r+1 ) * 10 && goToEndArray[i]==false){
			goRight();
		}

		if (getHorse[i].className == 'horse runRight' && getHorse[i].offsetLeft+(70-(m*getWidthPercent(2)))>=rightInRoadEdge + (r+1) * 10){
			getHorse[i].className ='horse runDown';
		}

		if (getHorse[i].className=='horse runDown' && getHorse[i].offsetTop<=downInRoadEdge/2 -  (r-1)*32){
			goDown();
		}

		if (getHorse[i].className=='horse runDown'  &&  getHorse[i].offsetTop>=downInRoadEdge/2- (r-1)*10 && secondPathArray[i] == true){
			secondPathArray[i] = true;
			getHorse[i].className = 'horse runLeft';
		}

		if (getHorse[i].className == 'horse runLeft' && getHorse[i].offsetLeft+90-(m*2)>=leftInRoadEdge -  (r+1) * 32 && secondPathArray[i] ==true){
			goLeft();
		}

		if (getHorse[i].className=='horse runLeft' && getHorse[i].offsetLeft+90-(m*2)<=leftInRoadEdge -  (r+1) * 32 && goToEndArray[i]==false){
			getHorse[i].className = 'horse rider runDown';
		}

		if (getHorse[i].className == 'horse rider runDown' && getHorse[i].offsetTop-(10*(m+2))<=downInRoadEdge - (100+m) && goToEndArray[i] == false){
			window.scrollBy(0, 5);		//Scrolls browser window up by  5px. //(Mozilla,2017)
			secondPathArray[i] = false;
			goDown();
		}

		if(getHorse[i].className == 'horse rider runDown' && getHorse[i].offsetTop-(5*(m+2))>=downInRoadEdge- (100+m) ){
			getHorse[i].className= 'horse runRight';
		}

		if (getHorse[i].className == 'horse runDown' && getHorse[i].offsetLeft+(70-(m*getWidthPercent(2)))>=rightInRoadEdge + (r+1 ) * 10 && secondPathArray[i]==false){
			getHorse[i].className = 'horse runUp';
		}

		if (getHorse[i].className =='horse runUp'  &&  getHorse[i].offsetTop-10+(r*8)>=downInRoadEdge/2-m){
			window.scrollBy(0, -2);		//scrolls browser window up by 2px
			goToEndArray[i] = true;
			secondPathArray[i] = true;
			goUp();
		}

		if (getHorse[i].className == 'horse runUp' && getHorse[i].offsetTop-10+(r*8)<=downInRoadEdge/2-m){
			getHorse[i].className = 'horse runLeft';
		}

		if(getHorse[i].className=='horse runLeft' && goToEndArray[i]==true && getHorse[i].offsetLeft+ ((r+4) -i ) * 32 <=leftInRoadEdge- (m+5) ){
			getHorse[i].className= 'horse rider runUp';
		}

		if(getHorse[i].className== 'horse rider runUp'  && getHorse[i].offsetTop-(r-i ) *20>=topInRoadEdge+m){
			window.scrollBy(0, -2);		//scrolls browser window up by 2px
			goUp();
		}
		
		if (getHorse[i].className== 'horse rider runUp'  && getHorse[i].offsetTop-(r-i ) * 20 <=topInRoadEdge+m && getHorse[i].offsetTop<=downInRoadEdge/2+200 ){
			
			if ( laps == 0){
				getHorse[i].className = 'horse rider runRight';

			}

			else{

				laps -= 1;
				getHorse[i].className = 'horse runRight';
				goToEndArray[i] = false;
				
					if (lapsCount-4==laps){
						lapShow = document.getElementById('displaylap');
						lapShow.innerHTML  = parseInt(lapShow.innerHTML) + 1; //Displays Current lap
						lapsCount = lapsCount-4;
					}
			}
		}

		if (getHorse[i].className == 'horse rider runRight'){
			if(getHorse[i].offsetLeft<=finishLine){
				goRight();
			}

			//Only pushes unique element to the horseFinPosition array
			//Pushes horse finishing the race in order.
			else{

				getHorse[i].className = 'horse runRight';
				var add = true;
				for(j=0;j<horseFinPosition.length;j++){
					if (horseFinPosition[j] == getHorse[i].id){
						add = false;
					}
				}			
				if (add == true){
					horseFinPosition.push(getHorse[i].id);
				}
				
					
			}

				
		}

		if(horseFinPosition.length == 4){
			
			clearInterval(interval);		//Clear the startRace calling interval.
			enableButton();
			betResult();
			showWinner();
			break;

			
		}


			
	}
}


/**
--@param {number} value 
--@return {number} result
--getWidthPercent(value)  gives size from windows width.
--getHeightPercent(value) gives size from windows height.

**/

function getWidthPercent(value){

	var result=	window.innerWidth *(value/100);
	return result;
}

function getHeightPercent(value){

	var result = window.innerHeight * (value/100);
	return result;
} 


/**

--Gets table data.
--Sets respective table data classname to value of horseFinPositon respectively.

**/

function showWinner(){
	if (horseFinPosition.length==4){
		var tdElement = document.getElementsByTagName('td');
		tdElement[1].className = horseFinPosition[0];
		tdElement[3].className = horseFinPosition[1];
		tdElement[5].className = horseFinPosition[2];
		tdElement[7].className = horseFinPosition[3];
	}

}


/**
--args {string} start  in playSound()
--Gets user input of lap,amount,funds,horse to bet.
--Checks condition for the bet to be valid.
--if conditions are true calls startRace function in an interval.

**/

function checkBet(){


	var totalLapShow = document.getElementById('maxlap');
	betAmount = document.getElementById('amount').value;
	selectLap = document.getElementById('lapvalue').value;
	betHorse = document.getElementById('bethorse').value;
	totalFund = document.getElementById('funds');
	accFund = parseInt(totalFund.innerHTML);

	var lapSelected = false;
	var horseSlected = false;
	var amountInRange = false;
	var validAmount =false;
	var sufficientFund = false;

	if (selectLap == 'selectlap'){
		alert('Select a Lap from the box!');
	}
	else 
		lapSelected = true;


	if(betHorse == 'selecthorse'){
		alert('Please select a horse to bet. ');
	}
	else
		horseSlected = true;


	if(betAmount<1 ){
		alert('Please place a bet greater than 1.');
	}
	else
		amountInRange = true;


	if(isNaN(betAmount)==true){
		alert('Please enter a valid amount');
	}
	else 
		validAmount = true;


	if (accFund==0){
		createMessage('sad','png','£0 Fund!! Press X to reset the game','error','true'); //passes arguments to createMessage function.
	}

	if (accFund<betAmount){
		alert("You don't have enough fund");
	}
	else
 		sufficientFund = true;



	if(lapSelected==true && horseSlected == true && validAmount == true && sufficientFund == true && amountInRange == true){

		totalFund.innerHTML = parseInt(totalFund.innerHTML)-betAmount;		//Deducts amount from fund after bet is placed.

		accFund = parseInt(totalFund.innerHTML);
		totalLapShow.innerHTML = parseInt(selectLap) +1  ;		//Display total lap

		horseFinPosition.length =0;			//Clears the horseFinPosition array

		laps = selectLap * 4;

		lapsCount  =laps;

		playSound('start');

		interval = setInterval(startRace,100);		//Calls  startRace function in each 100 ms.

	}
}


/**
--Adds offsetLeft with horsepower to move right in goRight()
--Subtracts offsetLeft with horsepower to move left in goLeft()
--Adds offsetTop with horsepower to move down in goDownt()
--Subtracts offsetTop with horsepower to move up in goUp()
**/


function goLeft(){
	positionLeft = getHorse[i].offsetLeft;
	getHorse[i].style.left = positionLeft - horsePower + 'px';
}

function goRight(){
	positionLeft = getHorse[i].offsetLeft;
	getHorse[i].style.left = positionLeft + horsePower + 'px';
}

function goUp(){
	positionTop = getHorse[i].offsetTop;
	getHorse[i].style.top = positionTop - horsePower + 'px';
}

function goDown(){
	positionTop = getHorse[i].offsetTop;
	getHorse[i].style.top = positionTop + horsePower + 'px';
}


//Sets display of start element to none.
function disableButton(){
	var getButton = document.getElementById('start');
	getButton.style.display = 'none';
}

//Sets display of start elemet to block.
function enableButton(){
	var getButton = document.getElementById('start');
	getButton.style.display = 'block';
}


/**
--@args {string} fireworks,sad
--@args {string} gif,png
--@args {string} Congratulations! You won the bet., Sorry! You lose the bet
--@args {string} win, lose
--@args {boolean} false, false

--Checks for winning horse and doubles bet amount and adds to the fund if bet is won
--Calls another function  createMessage()  with some arguments if bet is made on winning horse
**/

function betResult(){

	if(horseFinPosition[0]==betHorse){

		accFund =	accFund + (betAmount*2);
		totalFund.innerHTML = accFund;
		createMessage('fireworks','gif','Congratulations! You won the bet.','win','fasle');
		
	}

	else
		createMessage('sad','png','Sorry! You lose the bet.','lose','false');
}


/**

--@param {string} imgname name of image file.
--@param {string} extension extension of image file.
--@param {string} message message to display.
--@param {string} sound name of sound file.
--@param {boolean} reload boolean for page reload.
--Dynimically creates two divs, one span and one paragraph element.
--Assigns classname to the newly created elements
--Defines onclickFunction on some divs.

**/


function createMessage(imgname,extention,message,sound,reload){
	var body = document.getElementsByTagName('body')[0];
	var msgBox = document.createElement('div');
	var msgContent  = document.createElement('div');
	var exitIco = document.createElement('span');
	var imgIco = document.createElement('img');;
	var paragraph = document.createElement('p');
	var textNode = document.createTextNode('X');
	var infoTextNode = document.createTextNode(message);

	msgBox.className = 'borderbox';
	body.appendChild(msgBox);

	msgContent.className = 'contentbox'
	msgBox.appendChild(msgContent);

	exitIco.className ='exit'
	msgContent.appendChild(exitIco);

	exitIco.appendChild(textNode);

	imgIco.className = 'image';
	imgIco.style.backgroundImage = "url('images/" +imgname+ '.'+ extention+"')";
	exitIco.insertAdjacentElement("afterend", imgIco);

	paragraph.className = 'displaymsg';
	imgIco.insertAdjacentElement("afterend", paragraph);
	paragraph.appendChild(infoTextNode);

	if(reload=='true'){
		//Closure function to hide the division and reload.
		exitIco.onclick = function(){msgBox.style.display="none";location.reload(false);}//(Mozilla,2017)
		window.onclick = function(event) { if (event.target == msgBox) { msgBox.style.display = "none";}}	
    }	
	else{
		//Closure function to hide the division.
		exitIco.onclick = function(){msgBox.style.display="none";}		
		window.onclick = function(event) { if (event.target == msgBox) {  msgBox.style.display = "none";}}	

    }

	playSound(sound);
	
 }


/**
--@param {string} name of soundfile.
--Plays audio from the path.

**/

function playSound(file){
	var audio = new Audio('sounds/'+file+'.wav');	//(Mozilla,2017)
	audio.play();
}

/**
--Gets elemet start.
--Adds cick EventListener to the element
--Calls RaceInitialization function when the element is clicked.

**/

function onClickFunction(){

	var getButton = document.getElementById('start');
	getButton.addEventListener('click',RaceInitialization);
}

//Calls onClickFunction when whole content of the page is loaded.
document.addEventListener('DOMContentLoaded',onClickFunction);
/**
********************************************************************

!!!!!!!!!!!!!!!!!!!!!!END OF SCRIPT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

********************************************************************

**/