const elevator = document.getElementById("elevator");
const building = document.getElementById("building");
const controlPanel = document.getElementById("control-panel");

const buildingFloors = 10;
let floorsToVisit = [];
let currentFloor = 1;
let floorOffsetHeight = document.querySelector(".building-floor");
let eachFloorToVisitTime = {};

function drawFloors() {
    for (let i = 10; i > 0; i--) {
        const buildingFloor = document.createElement("div");
        buildingFloor.classList.add("building-floor", "d-flex-end");
        buildingFloor.innerHTML = `${i} Floor`;
        building.append(buildingFloor);
    }
}

function drawControlPanelButtons() {
    for (let i = 10; i > 0; i--) {
        const controlPanelButton = document.createElement("button");
        controlPanelButton.textContent = `${i}`;
        controlPanelButton.classList.add("control-panel-button");
        controlPanelButton.addEventListener("click", controlPanelButtonHandler);
        controlPanel.append(controlPanelButton);
    }

    const closeElevatorDoorsButton = document.createElement("button");
    const openElevatorDoorsButton = document.createElement("button");

    closeElevatorDoorsButton.textContent = "c";
    openElevatorDoorsButton.textContent = "o";

    controlPanel.append(closeElevatorDoorsButton, openElevatorDoorsButton);
}

function moveElevator(floor) {
    const top = (((buildingFloors - floor) * 10));
    elevator.style.top = `calc(${top}%)`;
    elevator.style.transform = `translate(-50%, calc(-(${top}%))`;
    // elevator.style.transitionDuration = `${eachFloorToVisitTime[floor] * 1000}ms`;
    console.log(floor);
}

function controlPanelButtonHandler(e) {
    const nextFloor = e.target.textContent;
    if (floorsToVisit.length === 0) {
        setTimeout(() => {
            visitingFloors();
            console.log(eachFloorToVisitTime);
        }, 2000);
    }

    floorsToVisit.push(+nextFloor);
}

function visitingFloors() {
    if (floorsToVisit.length !== 0) {
        let delay = (floorsToVisit[0] - currentFloor) * 1000 > 0 ? (floorsToVisit[0] - currentFloor) * 1000 : (currentFloor - floorsToVisit[0]) * 1000;
        console.log("---", floorsToVisit[0], currentFloor, "---");
        
        setTimeout(() => {
            elevator.style.transitionDuration = `${delay}ms`;
            moveElevator(floorsToVisit[0]);
            currentFloor = floorsToVisit[0];
            floorsToVisit.shift(floorsToVisit[0]);
            return visitingFloors();
        }, delay);
    } else {
        console.log("finish");
        eachFloorToVisitTime = {};
    }
}

drawFloors();
drawControlPanelButtons();
moveElevator(currentFloor);