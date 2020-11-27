//A list of list, with state name, elector number and (optionally) owner in childlists.

let rawStates = [
    ['Alabama', 'S', 11, 'Kennedy'],
    ['Alaska', 'W', 3],
    ['Arizona', 'W', 4, 'Nixon'],
    ['Arkansas', 'S', 8, 'Kennedy'],
    ['California', 'W', 32],
    ['Colorado', 'W', 6, 'Nixon'],
    ['Connecticut', 'E', 8],
    ['Delaware', 'E', 3],
    ['Florida', 'S', 10],
    ['Georgia', 'S', 12, 'Kennedy'],
    ['Hawaii', 'W', 3],
    ['Idaho', 'MW', 4],
    ['Illinois', 'MW', 27],
    ['Indiana', 'MW', 13, 'Nixon'],
    ['Iowa', 'W', 10, 'Nixon'],
    ['Kansas', 'W', 8, 'Nixon'],
    ['Kentucky', 'MW', 10],
    ['Louisiana', 'S', 10, 'Kennedy'],
    ['Maine', 'E', 5, 'Nixon'],
    ['Maryland', 'E', 9],
    ['Messachusetts', 'E', 5, 'Kennedy'],
    ['Michigan', 'MW', 20],
    ['Minnesota', 'MW', 11],
    ['Mississippi', 'S', 8, 'Kennedy'],
    ['Missouri', 'MW', 13, 'Kennedy'],
    ['Montana', 'W', 4],
    ['Nebraska', 'W', 6, 'Nixon'],
    ['Nevada', 'W', 3],
    ['New Hampshire', 'E', 4],
    ['New Jersey', 'E', 16],
    ['New Mexico', 'W', 4],
    ['New York', 'E', 45],
    ['North Carolina', 'S', 14, 'Kennedy'],
    ['North Dakota', 'W', 4, 'Nixon'],
    ['Ohio', 'MW', 25, 'Nixon'],
    ['Oklahoma', 'W', 8, 'Nixon'],
    ['Oregon', 'W', 6],
    ['Pennsylvania', 'E', 32],
    ['Rhode Island', 'E', 4, 'Kennedy'],
    ['South Carolina', 'S', 8, 'Kennedy'],
    ['South Dakota', 'W', 4, 'Nixon'],
    ['Tennesee', 'S', 11],
    ['Texas', 'S', 24],
    ['Utah', 'W', 4, 'Nixon'],
    ['Vermont', 'E', 3, 'Nixon'],
    ['Virginia', 'S', 12],
    ['Washington', 'W', 9],
    ['West Virginia', 'E', 8],
    ['Wisconsin', 'MW', 12],
    ['Wyoming', 'W', 3, 'Nixon'],
];

//usState class created from the list of states in 1960: Making of a President boardgame
//Each state has a name of string type, electors of integer type and an owner of string type, with default value of unclaimed

class usState {
    constructor(name, region, electors, owner = 'unclaimed') {
        this.name = name;
        this.region = region;
        this.electors = electors;
        this.owner = owner;
    };
};

//Initialize list of stateObjects created from list of raw states.

let stateObjects = [];

for (s of rawStates) {
    let state = new usState(s[0], s[1], s[2], s[3]);
    stateObjects.push(state);
};

//Elector count elements.

const kennedyField = document.getElementById("Kennedy");
const nixonField = document.getElementById("Nixon");
const unclaimedField = document.getElementById("unclaimed");

//Create html elements from state objects, which are added to corresponding div, based on ownership

for (i of stateObjects) {
    let parent = document.getElementById(i.owner);
    let child = document.createElement("button");
    child.innerHTML = `<< ${i.name} ${i.electors} >`;
    child.setAttribute("id", `${i.name}`)
    child.setAttribute("ondragstart", "drag(event)");
    child.setAttribute("draggable", "true");
    child.setAttribute('onclick', 'clickChecker(this)');
    child.setAttribute('class', `${i.region}`);
    parent.appendChild(child);
};

//Functions for drag and drop functionality

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, parent) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let child = document.getElementById(data);
    parent.appendChild(child);
    tally(kennedyField);
    tally(nixonField);
    tally(unclaimedField);
}

//Double click functionality for mobile support until I learn touch events

function onSClick(self) {
    let parent = self.parentElement;
    let grandparent = parent.parentElement;
    let uncles = Array.from(grandparent.children);
    let index = uncles.indexOf(parent);
    parent.removeChild(self);
    if (index == 2) {
        uncles[0].appendChild(self);
    } else {
        uncles[index + 1].appendChild(self);
    };
    for (let i of uncles) {
        sortNodes(i);
        tally(i);
    };
};

function onDClick(self) {
    let parent = self.parentElement;
    let grandparent = parent.parentElement;
    let uncles = Array.from(grandparent.children);
    let index = uncles.indexOf(parent);
    parent.removeChild(self);
    if (index == 0) {
        uncles[2].appendChild(self);
    } else {
        uncles[index - 1].appendChild(self);
    };
    for (let i of uncles) {
        sortNodes(i);
        tally(i);
    };
};

function clickChecker(self) {
    let clickCount = 0;
    clickCount++;
    if (clickCount == 1) {
        let singleClickTimer = setTimeout(function () {
            clickCount = 0;
            onSClick(self);
        }, 300);
    }
    else if (clickCount == 2) {
        clearTimeout(singleClickTimer);
        clickCount = 0;
        onDClick(self);
    };
};

//A function that sorts state html objects within their divs after drop.

function sortNodes(parent) {
    let children = Array.from(parent.children);
    criteria = function (a, b) {
        let nameA = a.innerHTML;
        let nameB = b.innerHTML;
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        };
    };
    children.sort(criteria);
    let first = parent.firstElementChild;
    while (parent.firstElementChild) {
        parent.removeChild(parent.firstElementChild)
    };
    for (i of children) {
        parent.appendChild(i)
    };
};

//Search condition for find function, looks for object based on name attribute

function isState(state) {
    return state.name == this.name
};

//Makes an array of elements under parent object. Searches for objects with name similar to parent id. Tallies up found object elector count.

function tally(parent) {
    let total = 0;
    let children = Array.from(parent.children);
    for (i of children) {
        let match = stateObjects.find(isState, { name: `${i.id}` });
        let electors = match.electors
        total = total + electors
    };
    document.getElementById(`${parent.id}Elector`).innerHTML = total;
};

tally(kennedyField);
tally(nixonField);
tally(unclaimedField);