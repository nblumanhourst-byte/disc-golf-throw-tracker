let selectedThrow = "";
let selectedDirection = "";
let throws = [];

function selectThrow(throwType) {
	selectedThrow = throwType;
	
	//find all buttons inside throw type selector
	let buttons = document.querySelectorAll('.throw-type button');
	
	//remove the selected class from every button
	buttons.forEach(function(button) {
			button.classList.remove("selected");
	});
	
	//find the button that was clicked
	let clickedButton = document.querySelector(
		`.throw-type button[onclick="selectThrow('${throwType}')"]`
	);
	
	//add the selected class to that button
	clickedButton.classList.add("selected");
}

function selectDirection(throwDirection) {
	selectedDirection = throwDirection;
	
	//find all buttons inside throw type direction
	let buttons = document.querySelectorAll('.throw-direction button');
	
	//remove the selected class from every button
	buttons.forEach(function(button) {
			button.classList.remove("selected");
	});
	
	//find the button that was clicked
	let clickedButton = document.querySelector(
		`.throw-direction button[onclick="selectDirection('${throwDirection}')"]`
	);
	
	//add the selected class to that button
	clickedButton.classList.add("selected");
}

function recordThrow(success) {
	
	if (selectedThrow === "" || selectedDirection === "") {
		console.log("Missing Selection");
		return;
	}
	
	let throwRecord = {
		type: selectedThrow,
		direction: selectedDirection,
		success: success
	};
	
	throws.push(throwRecord);
	
	document.getElementById("throwCount").textContent = throws.length;
	
	calculateStats();
}

function calculateStats() {
	
	let drives = throws.filter(function(throwRecord) {
		return throwRecord.type === "Drive";		
	});
	
	let approach = throws.filter(function(throwRecord) {
		return throwRecord.type === "Approach";
	});
	
	let putt = throws.filter(function(throwRecord) {
		return throwRecord.type === "Putt";
	});
	
	let successfulDrives = drives.filter(function(throwRecord) {
		return throwRecord.success === true;
	});
	
	let successfulApproaches = approach.filter(function(throwRecord) {
		return throwRecord.success === true;
	});
	
	let successfulPutts = putt.filter(function(throwRecord) {
		return throwRecord.success === true;
	});
	
	let backhands = throws.filter(function(throwRecord) {
		return throwRecord.direction === "Backhand";
	});

	let forehands = throws.filter(function(throwRecord) {
		return throwRecord.direction === "Forehand";
	});
	
	let successfulBackhands = backhands.filter(function(throwRecord) {
		return throwRecord.success === true;
	});

	let successfulForehands = forehands.filter(function(throwRecord) {
		return throwRecord.success === true;
	});
	
	let driveRate = (successfulDrives.length / drives.length) * 100;
	let approachRate = (successfulApproaches.length / approach.length) * 100;
	let puttRate = (successfulPutts.length / putt.length) * 100;
	let backhandRate = (successfulBackhands.length / backhands.length) * 100;
	let forehandRate = (successfulForehands.length / forehands.length) * 100;
	
	document.getElementById("driveSuccessRate").textContent = driveRate.toFixed(1) + "%";
	document.getElementById("approachSuccessRate").textContent = approachRate.toFixed(1) + "%";
	document.getElementById("puttSuccessRate").textContent = puttRate.toFixed(1) + "%";
	document.getElementById("backhandSuccessRate").textContent = backhandRate.toFixed(1) + "%";
	document.getElementById("forehandSuccessRate").textContent = forehandRate.toFixed(1) + "%";
	
}