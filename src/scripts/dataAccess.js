import { dispatchStateChanged } from "./helpers.js";

const appState = {
    teams: [],
    players: [],
    scores: [],
};

const apiURL = "https://truncheons-api-tcdro.ondigitalocean.app";

const makePostJSON = (json) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
    };
};

export const postScores = (firstScoreObj, secondScoreObj, thirdScoreObj) => {
    fetch(apiURL + "/scores", makePostJSON(firstScoreObj)).then(() =>
        fetch(apiURL + "/scores", makePostJSON(secondScoreObj)).then(
            fetch(apiURL + "/scores", makePostJSON(thirdScoreObj))
            .then
            // dispatchStateChanged()
            ()
        )
    );
};

export const postPlayer = (playerObject) => {
    fetch(apiURL + "/players", makePostJSON(playerObject)).then(() =>
        dispatchStateChanged()
    );
};

export const postTeam = (teamObject) => {
    fetch(apiURL + "/teams", makePostJSON(teamObject)).then(() =>
        dispatchStateChanged()
    );
};

export const teamsRaw = () => appState.teams.map((t) => ({...t }));
export const playersRaw = () => appState.players.map((p) => ({...p }));
export const scoresRaw = () => appState.scores.map((s) => ({...s }));

export const fetchAll = () => {
    return fetch(apiURL + "/db")
        .then((res) => res.json())
        .then((wholeDB) => {
            appState.teams = wholeDB.teams;
            appState.players = wholeDB.players;
            appState.scores = wholeDB.scores;
        });
};

export const fetchTeams = () => {
    return fetch(apiURL + "/teams")
        .then((res) => res.json())
        .then((teamsJSON) => (appState.teams = teamsJSON));
};

export const fetchPlayers = () => {
    return fetch(apiURL + "/players")
        .then((res) => res.json())
        .then((playersJSON) => (appState.players = playersJSON));
};

export const fetchScores = () => {
    return fetch(apiURL + "/players")
        .then((res) => res.json())
        .then((playersJSON) => (appState.players = playersJSON));
};
