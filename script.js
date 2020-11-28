//Elector count elements.

const kennedyField = document.getElementById("Kennedy");
const nixonField = document.getElementById("Nixon");
const unclaimedField = document.getElementById("unclaimed");

//Create html elements from state objects, which are added to corresponding div, based on ownership

for (i of stateObjects) {
    let parent = document.getElementById(i.owner);
    let child = document.createElement("button");
    child.innerHTML = `${i.name} ${i.electors}`;
    child.setAttribute('class', `${i.region}`);
    child.setAttribute("id", `${i.name}`)
    child.setAttribute("draggable", "true");
    child.setAttribute("ondragstart", "drag(event)");
    child.setAttribute('onclick', 'clickChecker(this)');
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
    let match = stateObjects.find(isState, {name: `${child.id}`});
    match.owner = child.parentElement.id;
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

//Wrapper for double and single click events

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