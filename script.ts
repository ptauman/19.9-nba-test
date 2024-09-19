//קביעת כתובת היוארל שלנו
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter/";
const SAVE_URL = "https://nbaserver-q21u.onrender.com/api/AddTeam";
//פורם החיפוש וסלקטור החיפוש
const searchForm = document.getElementById("search form") as HTMLFormElement;
const searchSelect = document.getElementById("search") as HTMLSelectElement;
//טווחי החיפוש
const pointsRange = document.getElementById("points range") as HTMLInputElement;
const fgRange = document.getElementById("fg% range") as HTMLInputElement;
const threeRange = document.getElementById("3p% range") as HTMLInputElement;
//כיתוב טווחי החיפוש
const pointsRangeSpan = document.getElementById("points range label") as HTMLSpanElement;
const fgRangeSpan = document.getElementById("fg% range label") as HTMLSpanElement;
const threeRangeSpan = document.getElementById("3p% range label") as HTMLSpanElement;
//אלמנט הטבלה
const tableDiv = document.getElementById("tableDiv") as HTMLDivElement;
//אלמנטי השחקנים
const pgplayer = document.getElementById("point guard div") as HTMLDivElement;
const sgplayer = document.getElementById( "shooting guard div") as HTMLDivElement;
const sfplayer = document.getElementById("small forward div") as HTMLDivElement;
const pfplayer = document.getElementById("power forward div") as HTMLDivElement;
const cplayer = document.getElementById("center div") as HTMLDivElement;
// אבטיפוס של קבוצת שחקנים כפי שהיא נשמרת בזיכרון מקומי או מועברת להצגה
interface FantasyTeam {
  PG?: player;
  SG?: player;
  SF?: player;
  PF?: player;
  C?: player;
}
//אבטיפוס של אלמנט לבקשת קבלת שחקנים
interface Myrequest {
  position: string;
  twoPercent: number;
  threePercent: number;
  points: number;
}
//אבטיפוס של שחקן כפי שמתקבל מהשרת
interface player {
  age: number;
  games: number;
  playerName: string;
  points: number;
  position: string;
  season: number[];
  team: string;
  threePercent: number;
  twoPercent: number;
  _v: number;
  _id: string;
}
//קבלת נתונים מהשרת
async function getPlayersFromAPI(parameter: Myrequest): Promise<player[]> {
  try {//משתנה שיכיל את התשובה
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },//מצרפים לבקשה גם את האלמנט שצריך להוסיף
      body: JSON.stringify(parameter),
    });//משתנה שמכיל את התשובה בג'אווה סקריפט
    const data = await response.json();
    //החזרת המשתנה וטיפול בשגיאה
    return data;
  } catch (error) {
    return error;
  }
}
//האזנה לכפתור החיפוש
searchForm.addEventListener("submit", async (event) => {
    //מניעת ניקוי הטופס
  event.preventDefault();
  //הגדרת אלמנט חדש לבקשה
  let userRequest: Myrequest = {
    //האלמנט שואב משדה הבחירה
    position: searchSelect.value,
    //האלמנט שואב נתונים משלוש שדות הטווח
    twoPercent: Number(fgRange.value),
    threePercent: Number(threeRange.value),
    points: Number(pointsRange.value),
  };//למנט נשלח לפונקציית ביצוע הבקשות. אלמנט אחר מקבל את התוכן שיוחזר מהבקשהת
  const players = await getPlayersFromAPI(userRequest);
  //קראיה לפונקצייה הצגת טבלה והעברת רשימת השחקנים אליה
  showTable(players);
});
//פונקציה להצגת הטבלה המקבל רשימה של שחקנים
async function showTable(players: player[]): Promise<void> {
    //הפונקציה מרוקנת את אלמנט הטבלה מתכנים קיימים - באם ישנם
  tableDiv.innerHTML = "";
//ככל וברשימת השחקנים שהתקבלה מהקריאה לפונקציה הנוכחית, אין תוכן
  if (players.length === 0) {
    //תוצג הודעה והפונקציה תחדל מביצוע
    tableDiv.innerHTML = "No players found";
    return;
  }
//יצירת טבלהת הוספת קלאס , מספר מזהה והוספתה לאלמנט הטבלה
  const table = document.createElement("table");
  table.classList.add("table");
  table.id = "players table";
  tableDiv.appendChild(table);
//כותרות
  const hedername = document.createElement("th")
  hedername.textContent = "Name"
  hedername.classList.add("th")
  table.appendChild(hedername)

  const hederposition = document.createElement("th")
  hederposition.textContent = "Position"
  hederposition.classList.add("th")
  table.appendChild(hederposition)

  const hederpoints = document.createElement("th")
  hederpoints.textContent = "th"
  hederpoints.classList.add("cell")
  table.appendChild(hederpoints)

  const hederfg = document.createElement("th")
  hederfg.textContent = "FG%"
  hederfg.classList.add("th")
  table.appendChild(hederfg)

  const heder3p = document.createElement("th")
  heder3p.textContent = "3P%"
  heder3p.classList.add("th")
  table.appendChild(heder3p)

  const hederbuton = document.createElement("th")
  hederbuton.textContent = "add to fantasty team"
  hederbuton.classList.add("th")
  table.appendChild(hederbuton)

//עבור כל שחקן בקשימת השחקניםש התקבלה
  for (let player of players) {
    //יצירת שורה והוספתה לטבלה
    const row = document.createElement("tr");
    table.appendChild(row);
    //יצירת תא לשםת קביעת ערכות הוספת קלאס והוספה לאמ=למט האב
    const namecell = document.createElement("td");
    namecell.textContent = player.playerName;
    namecell.classList.add("cell");
    row.appendChild(namecell);
//תא לסוג השחקן
    const positioncell = document.createElement("td");
    positioncell.textContent = player.position;
    positioncell.classList.add("cell");
    row.appendChild(positioncell);
//תא לנקודות 
    const pointscell = document.createElement("td");
    pointscell.textContent = player.points.toString();
    pointscell.classList.add("cell");
    row.appendChild(pointscell);
//תא למשהו הראשון
    const threePercentcell = document.createElement("td");
    threePercentcell.textContent = player.threePercent.toString();
    threePercentcell.classList.add("cell");
    row.appendChild(threePercentcell);
//תא למשהו השני
    const twoPercentcell = document.createElement("td");
    twoPercentcell.textContent = player.twoPercent.toString();
    twoPercentcell.classList.add("cell");
    row.appendChild(twoPercentcell);
//כפתור
    const addToFantasyButton = document.createElement("button");
    addToFantasyButton.classList.add("buton");
    addToFantasyButton.textContent = "Add to Fanatsy";
    //הוספת האזנה לכפותר
    addToFantasyButton.addEventListener("click", () => {
        //ככל והכפתור יילחץ נקרא לפונקציית הוספת שחקן ונעביר לה את השחקן הנוכחי
      addToMyFantasyTeam(player);
    });
    row.appendChild(addToFantasyButton);
  }
}
//פונקציה להופסת שחקן לקבוצה. מקבלת את השחקן בקריאה אליה
function addToMyFantasyTeam(player: player) {
  //שליפת רשימת החשקנים בקבוצה
  const myFantasy = loadFromStorage();
  //דוחפת את השחקן לקטגוריה המתאימה
  myFantasy[player.position] = player;
  //שמירת הקבוצה מחדש 
  saveToStorage(myFantasy);
  //הצגת השחקנים בקבוצה
  showPlayers(myFantasy);
}
//פונקציה לשמירה בזכירון. מקבלת אובייקט בן כמה שחקנים
function saveToStorage(myFantasy: FantasyTeam) {
  localStorage.setItem("myFantasy", JSON.stringify(myFantasy));
}
//פונקציה לשליפת רשימת השחקנים. מחזירה אובייקט בן כמה שחקנים
function loadFromStorage() {
  const myFantasy = JSON.parse(localStorage.getItem("myFantasy") || "{}");
  return myFantasy;
}
//פונקציה להצגת השחקנים בכרטיסים שלהםץ
function showPlayers(FantasyTeam: FantasyTeam) {
  //ניקח כל שחקן ונשלח אותו ואת האלמנט המתאים לפונקציה שתוסיף את התוכן
  if (FantasyTeam.PG) {
    showPlayer(FantasyTeam.PG, pgplayer);
  }
  if (FantasyTeam.SG) {
    showPlayer(FantasyTeam.SG, sgplayer);
  }
  if (FantasyTeam.SF) {
    showPlayer(FantasyTeam.SF, sfplayer);
  }
  if (FantasyTeam.PF) {
    showPlayer(FantasyTeam.PF, pfplayer);
  }
  if (FantasyTeam.C) {
    showPlayer(FantasyTeam.C, cplayer);
  }
}
//פונקציה למילוי כרטיסי השחרקנים. מקבלת שחקן ואמנט מתאים
function showPlayer(player: player, element: HTMLDivElement) {
  //ריקון הכרטיס
  element.innerHTML = "";
//בניית רישמה
  const list = document.createElement("ul");
  element.appendChild(list);
// שורה לשם
  const name = document.createElement("li");
  name.textContent = player.playerName;
  list.appendChild(name);
//שורה לעוד מאפיין
  const threePercent = document.createElement("li");
  threePercent.textContent = `threePercent ${player.threePercent.toString()}`;
  list.appendChild(threePercent);
//עוד מאפיין
  const twoPercent = document.createElement("li");
  twoPercent.textContent = `twoPercent ${player.twoPercent.toString()}`;
  list.appendChild(twoPercent);
//עוד מאפיין
  const points = document.createElement("li");
  points.textContent = `points ${player.points.toString()}`;
  list.appendChild(points);
}
//האזנה לטעינת הטפס
document.addEventListener("DOMContentLoaded", async () => {
  //שליפת רישמת השחקנים והצגתם
  const myFantasy = loadFromStorage();
  showPlayers(myFantasy);
});
//האזנה לטווחים וייצוג הערך שלהם
threeRange.addEventListener("change", () => {
  threeRangeSpan.textContent = threeRange.value;
});
fgRange.addEventListener("change", () => {
  fgRangeSpan.textContent = fgRange.value;
});
pointsRange.addEventListener("change", () => {
  pointsRangeSpan.textContent = pointsRange.value;
});
//האזנה לסלקטור
searchSelect.addEventListener("change", () => {
  //מחיקת הטבלה. נועד למנוע הוספה של ערכים מהטבלה השייכים לסוג אחד לפי הסלדטור שנמצא כרגע בסוג אחר
  tableDiv.innerHTML = "";
});
console.log(loadFromStorage());
