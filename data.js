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

//A list of state objects of the usState class.

let stateObjects = [
    alabama = new usState('Alabama', 'S', 11, 'Kennedy'),
    alaska = new usState('Alaska', 'W', 3, 'unclaimed'),
    arizona = new usState('Arizona', 'W', 4, 'Nixon'),
    arkansas = new usState('Arkansas', 'S', 8, 'Kennedy'),
    california = new usState('California', 'W', 32, 'unclaimed'),
    colorado = new usState('Colorado', 'W', 6, 'Nixon'),
    connecticut = new usState('Connecticut', 'E', 8, 'unclaimed'),
    delaware = new usState('Delaware', 'E', 3, 'unclaimed'),
    florida = new usState('Florida', 'S', 10, 'unclaimed'),
    georgia = new usState('Georgia', 'S', 12, 'Kennedy'),
    hawaii = new usState('Hawaii', 'W', 3, 'unclaimed'),
    idaho = new usState('Idaho', 'W', 4, 'unclaimed'),
    illinois = new usState('Illinois', 'MW', 27, 'unclaimed'),
    indiana = new usState('Indiana', 'MW', 13, 'Nixon'),
    iowa = new usState('Iowa', 'W', 10, 'Nixon'),
    kansas = new usState('Kansas', 'W', 8, 'Nixon'),
    kentucky = new usState('Kentucky', 'MW', 10, 'unclaimed'),
    louisiana = new usState('Louisiana', 'S', 10, 'Kennedy'),
    maine = new usState('Maine', 'E', 5, 'Nixon'),
    maryland = new usState('Maryland', 'E', 9, 'unclaimed'),
    messachusetts = new usState('Messachusetts', 'E', 5, 'Kennedy'),
    michigan = new usState('Michigan', 'MW', 20, 'unclaimed'),
    minnesota = new usState('Minnesota', 'MW', 11, 'unclaimed'),
    mississippi = new usState('Mississippi', 'S', 8, 'Kennedy'),
    missouri = new usState('Missouri', 'MW', 13, 'Kennedy'),
    montana = new usState('Montana', 'W', 4, 'unclaimed'),
    nebraska = new usState('Nebraska', 'W', 6, 'Nixon'),
    nevada = new usState('Nevada', 'W', 3, 'unclaimed'),
    newHampshire = new usState('New Hampshire', 'E', 4, 'unclaimed'),
    newJersey = new usState('New Jersey', 'E', 16, 'unclaimed'),
    newMexico = new usState('New Mexico', 'W', 4, 'unclaimed'),
    newYork = new usState('New York', 'E', 45, 'unclaimed'),
    northCarolina = new usState('North Carolina', 'S', 14, 'Kennedy'),
    northDakota = new usState('North Dakota', 'W', 4, 'Nixon'),
    ohio = new usState('Ohio', 'MW', 25, 'Nixon'),
    oklahoma = new usState('Oklahoma', 'W', 8, 'Nixon'),
    oregon = new usState('Oregon', 'W', 6, 'unclaimed'),
    pennsylvania = new usState('Pennsylvania', 'E', 32, 'unclaimed'),
    rhodeIsland = new usState('Rhode Island', 'E', 4, 'Kennedy'),
    southCarolina = new usState('South Carolina', 'S', 8, 'Kennedy'),
    southDakota = new usState('South Dakota', 'W', 4, 'Nixon'),
    tennesee = new usState('Tennesee', 'S', 11, 'unclaimed'),
    texas = new usState('Texas', 'S', 24, 'unclaimed'),
    utah = new usState('Utah', 'W', 4, 'Nixon'),
    vermont = new usState('Vermont', 'E', 3, 'Nixon'),
    virginia = new usState('Virginia', 'S', 12, 'unclaimed'),
    washington = new usState('Washington', 'W', 9, 'unclaimed'),
    westVirginia = new usState('West Virginia', 'E', 8, 'unclaimed'),
    wisconsin = new usState('Wisconsin', 'MW', 12, 'unclaimed'),
    wyoming = new usState('Wyoming', 'W', 3, 'Nixon'),
];
