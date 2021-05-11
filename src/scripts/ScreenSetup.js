import { startGame } from "./gameState.js";
import { addPlayer, getPlayers } from "./PlayersProvider.js";
import { addTeam, getTeams } from "./TeamsProvider.js";

document.addEventListener("click", (event) => {
    if (event.target.id === "playerSubmitButton") {
        // stores the user input in variables
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const playerTeam = document.getElementById("selectedTeam").value;

        if (UserSetupInputValid(firstName, lastName, playerTeam)) {
            const teams = getTeams();
            const players = getPlayers();

            // finds the team object that matches the user input
            const teamToAddPlayerTo = teams.find((team) => playerTeam === team.name);

            // filters and stores the players that are in the currently selected team into an array
            const playersInCurrentTeam = players.filter(
                (player) => teamToAddPlayerTo.id === player.teamId
            );

            // checks if the selected team is full.
            if (playersInCurrentTeam.length < 3) {
                addPlayer(firstName, lastName, playerTeam);
                // document.dispatchEvent(new CustomEvent("stateChanged"));
            } else {
                window.alert("Selected team already has 3 players");
                return;
            }
        }
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "teamSubmitButton") {
        const teamName = document.getElementById("teamName").value;

        if (teamName) {
            addTeam(teamName);
            // document.dispatchEvent(new CustomEvent("stateChanged"));
        } else {
            window.alert("Please complete all fields");
        }
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "startGameButton") {
        const teamOneId = parseInt(document.getElementById("1").value);
        const teamTwoId = parseInt(document.getElementById("2").value);
        const teamThreeId = parseInt(document.getElementById("3").value);

        const allTeamsId = new Set();
        if (!Number.isNaN(teamOneId)) {
            allTeamsId.add(teamOneId);
        }
        if (!Number.isNaN(teamTwoId)) {
            allTeamsId.add(teamTwoId);
        }
        if (!Number.isNaN(teamThreeId)) {
            allTeamsId.add(teamThreeId);
        }

        if (allTeamsId.size === 3) {
            startGame(teamOneId, teamTwoId, teamThreeId);
        } else {
            window.alert("Please select 3 unique teams");
            return;
        }
    }
});

export const setupHTML = () => {
    return /*html*/ ` 
    <h1 class="logo">Truncheons & Flagons</h1>
    <div class="selectTeamSection">
    <h2>Select Your Teams:</h2>
    <div class="selectTeamSectionDropdown">

    ${SelectTeamsDropdownHtml()}

        <button id="startGameButton" class="startGameButton">Start Game</button>
    </div>
    </div>

    <h2>Add New Team:</h2>
    
    <div>
    <form class="newTeamForm" onsubmit="return false">
        <div>
        <input placeholder="Team Name:" type="text" id="teamName"/>
        </div>
        <div>
        <input id="teamSubmitButton" type="button" value="Add Team" />
        </div>
    </form>
    </div>

    <h2>Add New Player:</h2>

    <div>
    <form class="newPlayerForm">
        <input
        placeholder="First Name:"
        type="text"
        id="firstName"
        name="firstName"
        /><br />
        <input
        placeholder="Last Name:"
        type="text"
        id="lastName"
        name="lastName"
        /><br /><br />
        <div>
        <select id="selectedTeam" name="teams">
            <option>Player's Team</option>

            ${AssignPlayerTeamHtml()}

        </select>
        </div>
        <input id="playerSubmitButton" type="button" value="Add Player" />
    </form>
    </div>
    `;
};

export const UserSetupInputValid = (firstName, lastName, playerTeam) => {
    if (firstName && lastName && playerTeam === "Player's Team") {
        window.alert("Please select a valid team");
        return false;
    } else if (firstName && lastName && playerTeam !== "Player's Team") {
        return true;
    } else {
        window.alert("Please complete all fields");
        return false;
    }
};

export const AssignPlayerTeamHtml = () => {
    const teams = getTeams();
    return teams.map((team) => `<option>${team.name}</option>`).join("");
};

export const SelectTeamsDropdownHtml = () => {
    let teamsHtml = "";
    // counter serves to determine how many teams will be added
    let teamCounter = 1;

    const teams = getTeams();

    // each run of the while loop will add a dropdown to select every team available.
    while (teamCounter < 4) {
        // opening tag for select dropdown
        teamsHtml += `<div><select id="${teamCounter}" class="teamDropdown" name="teams">`;
        // adding number for currently selected team with teamCounter
        teamsHtml += `<option>Select team ${teamCounter}:</option>`;
        // mapping each option for every team to a string
        teamsHtml += teams
            .map((team) => `<option value="${team.id}">${team.name}</option>`)
            .join("");
        // closing tags
        teamsHtml += `</select></div>`;

        teamCounter++;
    }

    return teamsHtml;
};