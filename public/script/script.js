/* 
SCRIPT 

Author: Washington Valencia
Instructor: Washington Valencia

ENTER STUDENT INFORMATION HERE 
==========================================
CCTB project DevOps course
STUDENT NAME: 
STUDENT ID:
SQAC114
==========================================

*/

//define constants
const DAILYRATE = 50;
//Group 1
const MINSIZEGRP1 = 5;
const MAXSIZEGRP1 = 10;
const DISCGRP1 = 0.10;
//Group 2
const MAXSIZEGRP2 = 24;
const DISCGRP2 = 0.20;
//Group 3
const DISCGRP3 = 0.25;


let wCurrentPos = document.getElementById("bee").style.left;
let hCurrentPos = document.getElementById("bee").style.top;

// define initial position
let wPos = 0;
let hPos = 0;

//Size Screen
let wSize = window.innerWidth;
let hSize = window.innerHeight;

//Gloabl variabe
let intID;

//define the variables for input

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let groupSize = document.getElementById("GroupSize");
let discRate = document.getElementById("discRate");
let membersLst = document.getElementById("members");

//define the variables for buttons
let addMemberBtn = document.getElementById("addMemberBtn");
let deleteMemberBtn = document.getElementById("deleteMemberBtn");
let sortMemberListBtn = document.getElementById("sortMemberListBtn");

//reference to Bee
let bee = document.getElementById("bee");

//reference to advice
let advice = document.getElementById("advice");


let ratePerson;

/*
* Function to check that a user has entered a group member’s first and last name.
* 
*/
function CheckForGroupMemberInput() {

	if (firstname.value != "") {
		if (lastname.value != "") {
			CheckForGroupSizeInput();
		} else {
			throw "Please first enter a group member's name";
			lastname.focus();
		}
	} else {
		throw "Please first enter a group member's name";
		firstname.focus();
	}

}

/*
* Function to check that a user has entered a value for how many people are in the group and that the entry is numeric.
* 
*/
function CheckForGroupSizeInput() {
	if (groupSize.value != "") {
		if (isNaN(groupSize.value)) {
			throw groupSize.value + " It's not a number";
			groupSize.focus();
		} else {
			if (groupSize.value > 0) {
				CalcGroupDiscount(groupSize.value);
			} else {
				throw "Size must be greater than 0";
				groupSize.focus();
			}

		}
	} else {
		throw "Please enter the size of your group travelers";
		groupSize.focus();
	}
}

/*
* Function to calculate the applicable discount per group member based on group size. 
* 
*/
function CalcGroupDiscount(groupSize) {
	if (groupSize < MINSIZEGRP1) {
		ratePerson = DAILYRATE;
	}
	else if (groupSize >= MINSIZEGRP1 && groupSize <= MAXSIZEGRP1) {
		ratePerson = DAILYRATE - (DAILYRATE * DISCGRP1);
	} else if (groupSize > MAXSIZEGRP1 && groupSize <= MAXSIZEGRP2) {
		ratePerson = DAILYRATE - (DAILYRATE * DISCGRP2);
	} else if (groupSize > MAXSIZEGRP2) {
		ratePerson = DAILYRATE - (DAILYRATE * DISCGRP3);
	}

	discRate.value = ratePerson.toFixed(2);
	AddGroupMember(lastname.value, firstname.value);
}


/*
* Function to add a group member to the selection list.
* 
*/
function AddGroupMember(lastName, firstName) {

	let option = document.createElement("option");
	option.text = lastName + ", " + firstName;
	membersLst.add(option);

	lastname.value = "";
	firstname.value = "";

	lastname.focus();


}

/*
* Function to remove (delete) a selected group member from the selection list.
* 
*/
function RemoveGroupMember() {

	throw "ERROR! You must work in this function before to send to Staging Environment!";

}

/*
* Function to sort the list of group members in ascending order by last name.
* 
*/
function SortGroupMembers() {

	if (membersLst.options.length > 0) {
		var tmpArray = new Array();

		for (let i = 0; i < membersLst.options.length; i++) {
			tmpArray[i] = new Array();
			tmpArray[i][0] = membersLst.options[i].text;
			tmpArray[i][1] = membersLst.options[i].value;
		}
		tmpArray.sort();


		for (var i = 0; i < tmpArray.length; i++) {
			var op = new Option(tmpArray[i][0], tmpArray[i][1]);
			membersLst.options[i] = op;
		}
	}
	else {
		throw "There are no group members to sort!";
	}

}

function FlyingBee() {

	wPos += parseInt(50);
	hPos += parseInt(10);


	if (wPos <= wSize * 0.65 || hPos <= hSize * 0.20) {
		bee.style.left = wPos + "px";
		bee.style.top = hPos + "px";

	} else {
		clearInterval(intID);
		advice.style.display = "block";
	}

}

addMemberBtn.addEventListener("click",
	function () {
		try {
			CheckForGroupMemberInput();
		} //end of try BlockList

		//catch block - catch and report the errors
		catch (e) {
			alert(e);
		}
	}
)

deleteMemberBtn.addEventListener("click",
	function () {
		try {
			RemoveGroupMember();
		}
		//catch block - catch and report the errors
		catch (e) {
			alert(e);
		}
	});

bee.addEventListener("load", function () {

	bee.style.visibility = "visible";
	intID = setInterval(FlyingBee, 300);
})

sortMemberListBtn.addEventListener("click",
	function () {
		try {
			SortGroupMembers();
		}
		catch (e) {
			alert(e);
		}
	}
)


//