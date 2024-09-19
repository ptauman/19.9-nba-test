const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter/"

const searchForm = document.getElementById("search form") as HTMLFormElement;
const searchSelect = document.getElementById("search") as HTMLSelectElement;
const pointsRange = document.getElementById("points range") as HTMLInputElement;
const fgRange = document.getElementById("fg% range") as HTMLInputElement;
const threeRange = document.getElementById("3p% range") as HTMLInputElement;

const tableDiv = document.getElementById("tableDiv") as HTMLDivElement;

const pgplayet = document.getElementById("point guard div") as HTMLDivElement;
const sgplayet = document.getElementById("shooting guard div") as HTMLDivElement;
const sfplayet = document.getElementById("small forward div") as HTMLDivElement;
const pfplayet = document.getElementById("power forward div") as HTMLDivElement;
const cplayet = document.getElementById("center div") as HTMLDivElement;

interface FantasyTeam {
    PG? : player,
    SG? : player,
    SF? : player,
    PF? : player,
    C? : player
}

interface Myrequest {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
}
interface player {
    age : number;
    games : number;
    playerName : string;
    points : number;
    position : string;
    season : number[];
    team : string;
    threePercent : number;
    twoPercent : number;
    _v : number;
    _id : string;
}
const player1 : player = {
    age : 0,
    games : 0,
    playerName : "",
    points : 0,
    position : "PG",
    season : [],
    team : "",
    threePercent : 54,
    twoPercent : 65,
    _v : 0,
    _id : "654"
}
const player2 : player = {
    age : 1,
    games : 1,
    playerName : "",
    points : 1,
    position : "PG",
    season : [],
    team : "",
    threePercent : 32,
    twoPercent : 12,
    _v : 1,
    _id : "876"
}
const players = [player1, player2]


async function getPlayersFromAPI(parameter: Myrequest) :Promise<player[]> {
    try{
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parameter),
        });
        const data = await response.json();
        return data
    }
    catch(error){
        return error
    }
}


searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let userRequest  :Myrequest = {
        position : searchSelect.value,
        twoPercent : Number(pointsRange.value),
        threePercent: Number(fgRange.value),
        points: Number(threeRange.value)
    }
    // const players = await getPlayersFromAPI(userRequest)
    const players = [player1, player2]
    // const players = []
    showTable (players)
    const myFantasy = loadFromStorage()
    showPlayers(myFantasy)
});

async function showTable(players :player[]):Promise<void> {
    console.log("it is a test")

    tableDiv.innerHTML = "";
 
    const table = document.createElement("table");
    table.classList.add("table");
    table.id = "players table";
    tableDiv.appendChild(table);

    for (let player of players){

        const row = document.createElement("tr");
        table.appendChild(row);

        const namecell = document.createElement("td");
        namecell.textContent = player.playerName;
        namecell.classList.add("cell");
        row.appendChild(namecell);

        const positioncell = document.createElement("td");
        positioncell.textContent = player.position;
        positioncell.classList.add("cell");
        row.appendChild(positioncell);

        const pointscell = document.createElement("td");
        pointscell.textContent = player.points.toString();
        pointscell.classList.add("cell");
        row.appendChild(pointscell);

        const threePercentcell = document.createElement("td");
        threePercentcell.textContent = player.threePercent.toString();
        threePercentcell.classList.add("cell");
        row.appendChild(threePercentcell);

        const twoPercentcell = document.createElement("td");
        twoPercentcell.textContent = player.twoPercent.toString();
        twoPercentcell.classList.add("cell");
        row.appendChild(twoPercentcell);

        const addToFantasyButton = document.createElement("button");
        addToFantasyButton.classList.add("addToFantsyButton");
        addToFantasyButton.textContent = "Add to Fanatsy";
        addToFantasyButton.addEventListener("click", () => {
            addToMyFantasyTeam(player);
        });
        row.appendChild(addToFantasyButton);        
    }
}
function addToMyFantasyTeam(player : player){
    const myFantasy = loadFromStorage()
    myFantasy[player.position] = player
    saveToStorage(myFantasy)
    showPlayers(myFantasy)   
}

function saveToStorage(myFantasy : FantasyTeam){
    localStorage.setItem("myFantasy", JSON.stringify(myFantasy))
}
function loadFromStorage(){
     const myFantasy = JSON.parse(localStorage.getItem("myFantasy") || "{}")
     return myFantasy
}

function showPlayers(FantasyTeam : FantasyTeam){
    if (FantasyTeam.PG){
        showPlayer(FantasyTeam.PG, pgplayet)
    }
    if (FantasyTeam.SG){
        showPlayer(FantasyTeam.SG, sgplayet)
    }
    if (FantasyTeam.SF){
        showPlayer(FantasyTeam.SF, sfplayet)
    }
    if (FantasyTeam.PF){
        showPlayer(FantasyTeam.PF, pfplayet)
    }
    if (FantasyTeam.C){
        showPlayer(FantasyTeam.C, cplayet)
    }
}

function showPlayer(player : player, element : HTMLDivElement){
   const list = document.createElement("ul");
   element.appendChild(list);

   const name = document.createElement("li");
   name.textContent = player.playerName;
   list.appendChild(name);
   
   const threePercent = document.createElement("li");
   threePercent.textContent = `threePercent ${player.threePercent.toString()}`;
   list.appendChild(threePercent);

   const twoPercent = document.createElement("li");
   twoPercent.textContent = `twoPercent ${player.twoPercent.toString()}`;
   list.appendChild(twoPercent);

   const points = document.createElement("li");
   points.textContent = `points ${player.points.toString()}`
   list.appendChild(points);
}

document.addEventListener("DOMContentLoaded", async () => {
    const myFantasy = loadFromStorage()
    showPlayers(myFantasy)   
})




