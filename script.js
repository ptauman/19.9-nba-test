var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//קביעת כתובת היוארל שלנו
var BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter/";
var SAVE_URL = "https://nbaserver-q21u.onrender.com/api/AddTeam";
//פורם החיפוש וסלקטור החיפוש
var searchForm = document.getElementById("search form");
var searchSelect = document.getElementById("search");
//טווחי החיפוש
var pointsRange = document.getElementById("points range");
var fgRange = document.getElementById("fg% range");
var threeRange = document.getElementById("3p% range");
//כיתוב טווחי החיפוש
var pointsRangeSpan = document.getElementById("points range label");
var fgRangeSpan = document.getElementById("fg% range label");
var threeRangeSpan = document.getElementById("3p% range label");
//אלמנט הטבלה
var tableDiv = document.getElementById("tableDiv");
//אלמנטי השחקנים
var pgplayer = document.getElementById("point guard div");
var sgplayer = document.getElementById("shooting guard div");
var sfplayer = document.getElementById("small forward div");
var pfplayer = document.getElementById("power forward div");
var cplayer = document.getElementById("center div");
//קבלת נתונים מהשרת
function getPlayersFromAPI(parameter) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(BASE_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            }, //מצרפים לבקשה גם את האלמנט שצריך להוסיף
                            body: JSON.stringify(parameter),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    //החזרת המשתנה וטיפול בשגיאה
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//האזנה לכפתור החיפוש
searchForm.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var userRequest, players;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //במידה והוא לא בחר משהו מתאים זה יקפיץ הודעה
                if (searchSelect.value === "default") {
                    alert("Please select a position");
                    return [2 /*return*/];
                }
                //מניעת ניקוי הטופס
                event.preventDefault();
                userRequest = {
                    //האלמנט שואב משדה הבחירה
                    position: searchSelect.value,
                    //האלמנט שואב נתונים משלוש שדות הטווח
                    twoPercent: Number(fgRange.value),
                    threePercent: Number(threeRange.value),
                    points: Number(pointsRange.value),
                };
                return [4 /*yield*/, getPlayersFromAPI(userRequest)];
            case 1:
                players = _a.sent();
                //קראיה לפונקצייה הצגת טבלה והעברת רשימת השחקנים אליה
                showTable(players);
                return [2 /*return*/];
        }
    });
}); });
//פונקציה להצגת הטבלה המקבל רשימה של שחקנים
function showTable(players) {
    return __awaiter(this, void 0, void 0, function () {
        var table, titelsArr, _i, titelsArr_1, titel, th, _loop_1, _a, players_1, player;
        return __generator(this, function (_b) {
            //הפונקציה מרוקנת את אלמנט הטבלה מתכנים קיימים - באם ישנם
            tableDiv.innerHTML = "";
            //ככל וברשימת השחקנים שהתקבלה מהקריאה לפונקציה הנוכחית, אין תוכן
            if (players.length === 0) {
                //תוצג הודעה והפונקציה תחדל מביצוע
                tableDiv.innerHTML = "No players found";
                return [2 /*return*/];
            }
            table = document.createElement("table");
            table.classList.add("table");
            table.id = "players table";
            tableDiv.appendChild(table);
            titelsArr = ["Name", "Position", "points", "FG%", "3P%", "action"];
            //לולאה שתרוץ על רשימת הכותרות
            for (_i = 0, titelsArr_1 = titelsArr; _i < titelsArr_1.length; _i++) {
                titel = titelsArr_1[_i];
                th = document.createElement("th");
                //שאיבת הטקסט מהרשימה
                th.textContent = titel;
                //הוספת קלאס לכותרת
                th.classList.add("th");
                //הוספת הכותרת לטבלה
                table.appendChild(th);
            }
            _loop_1 = function (player) {
                //יצירת שורה והוספתה לטבלה
                var row = document.createElement("tr");
                table.appendChild(row);
                //רשימת המידע שצריך להכינס לטבלה
                var informationArr = [player.playerName, player.position, player.points.toString(), player.threePercent.toString(), player.twoPercent.toString()];
                //עבור כל פריט מידע
                for (var _c = 0, informationArr_1 = informationArr; _c < informationArr_1.length; _c++) {
                    var info = informationArr_1[_c];
                    //יצירת תא
                    var cell = document.createElement("td");
                    //העברת המידע מהרשימה לתא
                    cell.textContent = info;
                    //הוספת קלאס לתא
                    cell.classList.add("cell");
                    //הוספת התא לשורה
                    row.appendChild(cell);
                }
                //יצירת כפתור והוספתו לטבלה תוך קביעת טקסט מתאים
                var addToFantasyButton = document.createElement("button");
                addToFantasyButton.classList.add("buton");
                addToFantasyButton.textContent = "Add to Fanatsy";
                //הוספת האזנה לכפותר
                addToFantasyButton.addEventListener("click", function () {
                    //ככל והכפתור יילחץ נקרא לפונקציית הוספת שחקן ונעביר לה את השחקן הנוכחי
                    addToMyFantasyTeam(player);
                });
                row.appendChild(addToFantasyButton);
            };
            //עבור כל שחקן בקשימת השחקניםש התקבלה
            for (_a = 0, players_1 = players; _a < players_1.length; _a++) {
                player = players_1[_a];
                _loop_1(player);
            }
            return [2 /*return*/];
        });
    });
}
//פונקציה להופסת שחקן לקבוצה. מקבלת את השחקן בקריאה אליה
function addToMyFantasyTeam(player) {
    //שליפת רשימת החשקנים בקבוצה
    var myFantasy = loadFromStorage();
    //דוחפת את השחקן לקטגוריה המתאימה
    myFantasy[player.position] = player;
    //שמירת הקבוצה מחדש 
    saveToStorage(myFantasy);
    //הצגת השחקנים בקבוצה
    showPlayers(myFantasy);
}
//פונקציה לשמירה בזכירון. מקבלת אובייקט בן כמה שחקנים
function saveToStorage(myFantasy) {
    localStorage.setItem("myFantasy", JSON.stringify(myFantasy));
}
//פונקציה לשליפת רשימת השחקנים. מחזירה אובייקט בן כמה שחקנים
function loadFromStorage() {
    var myFantasy = JSON.parse(localStorage.getItem("myFantasy") || "{}");
    return myFantasy;
}
//פונקציה להצגת השחקנים בכרטיסים שלהםץ
function showPlayers(FantasyTeam) {
    //ניקח כל שחקן ונשלח אותו ואת האלמנט המתאים לפונקציה שתוסיף את התוכן
    var playersArr = ["PG", "SG", "SF", "PF", "C"];
    var elementsArr = [pgplayer, sgplayer, sfplayer, pfplayer, cplayer];
    for (var i = 0; i < playersArr.length; i++) {
        if (FantasyTeam[playersArr[i]]) {
            showPlayer(FantasyTeam[playersArr[i]], elementsArr[i]);
        }
    }
}
//פונקציה למילוי כרטיסי השחרקנים. מקבלת שחקן ואמנט מתאים
function showPlayer(player, element) {
    //ריקון הכרטיס
    element.innerHTML = "";
    var paragraf = document.createElement("p");
    paragraf.textContent = player.position;
    element.appendChild(paragraf);
    //בניית רישמה
    var list = document.createElement("ul");
    element.appendChild(list);
    var infoArr = ["playerName", "points", "threePercent", "twoPercent"];
    for (var info in infoArr) {
        var li = document.createElement("li");
        li.textContent = "".concat(infoArr[info], ": ").concat(player[infoArr[info]].toString());
        list.appendChild(li);
    }
}
// שורה לשם
//   const name = document.createElement("li");
//   name.textContent = player.playerName;
//   list.appendChild(name);
// //שורה לעוד מאפיין
//   const threePercent = document.createElement("li");
//   threePercent.textContent = `threePercent ${player.threePercent.toString()}`;
//   list.appendChild(threePercent);
// //עוד מאפיין
//   const twoPercent = document.createElement("li");
//   twoPercent.textContent = `twoPercent ${player.twoPercent.toString()}`;
//   list.appendChild(twoPercent);
// //עוד מאפיין
//   const points = document.createElement("li");
//   points.textContent = `points ${player.points.toString()}`;
//   list.appendChild(points);
// }
//האזנה לטעינת הטפס
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var myFantasy;
    return __generator(this, function (_a) {
        myFantasy = loadFromStorage();
        showPlayers(myFantasy);
        return [2 /*return*/];
    });
}); });
//האזנה לטווחים וייצוג הערך שלהם
threeRange.addEventListener("change", function () {
    threeRangeSpan.textContent = threeRange.value;
});
fgRange.addEventListener("change", function () {
    fgRangeSpan.textContent = fgRange.value;
});
pointsRange.addEventListener("change", function () {
    pointsRangeSpan.textContent = pointsRange.value;
});
//האזנה לסלקטור
searchSelect.addEventListener("change", function () {
    //מחיקת הטבלה. נועד למנוע הוספה של ערכים מהטבלה השייכים לסוג אחד לפי הסלדטור שנמצא כרגע בסוג אחר
    tableDiv.innerHTML = "";
});
console.log(loadFromStorage());
