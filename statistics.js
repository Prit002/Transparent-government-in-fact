var members = data.results[0].members;


//console.log(members)
var averagedemocraticvote = totalvotewiththeparty("D") / totalMembers("D")
var averagerepublicanvote = totalvotewiththeparty("R") / totalMembers("R")
var averageindependentvote = totalvotewiththeparty("I") / totalMembers("I")
//console.log(averageindependentvote)

var statistics = {
    "numberofDemocrats": totalMembers("D"),
    "numberofRepublicans": totalMembers("R"),
    "numberofIndependent": totalMembers("I"),
    "totalMembers": totalMembers("D") + totalMembers("R") + totalMembers("I"),
    "pctvotewithDemocrats": Math.round(averagedemocraticvote * 100) / 100,
    "pctvotewithRepublicans": Math.round(averagerepublicanvote * 100) / 100,
    "pctvotewithIndependent": Math.round(averageindependentvote * 100) / 100,
    "pctvotewithparty": Math.round(averagedemocraticvote * 100) / 100 + Math.round(averagerepublicanvote * 100) / 100 + Math.round(averageindependentvote * 100) / 100,
    "leastEngaged": partypct(sortDescending("missed_votes_pct"), "missed_votes_pct"),
    "leastLoyal": partypct(sortDescending("votes_with_party_pct"), "votes_with_party_pct"),
    "mostEngaged": partypct(sortAscending("missed_votes_pct"), "missed_votes_pct"),
    "mostLoyal": partypct(sortAscending("votes_with_party_pct"), "votes_with_party_pct"),
}

var table = document.getElementById("senatetable")
var table1 = document.getElementById("Least-Engage");
var table2 = document.getElementById("Most-Engage");
var table3 = document.getElementById("Least-Loyal");
var table4 = document.getElementById("Most-Loyal");

if (location.pathname == "/C:/Users/PC/Desktop/tigf/houseAttendance.html" || location.pathname == "/C:/Users/PC/Desktop/tigf/SenateAttendance.html") {



    createTable(statistics["leastEngaged"], table1, "missed_votes", "missed_votes_pct");
    createTable(statistics["mostEngaged"], table2, "missed_votes", "missed_votes_pct");

} else if (location.pathname == "/C:/Users/PC/Desktop/tigf/SenatePartyLoyalty.html" || location.pathname == "/C:/Users/PC/Desktop/tigf/housePartyLoyalty.html") {

    createTable(statistics["leastLoyal"], table3, "total_votes", "votes_with_party_pct");
    createTable(statistics["mostLoyal"], table4, "total_votes", "votes_with_party_pct");
}


//console.log(averagedemocraticvote)//96.97052631578948
//console.log(averagerepublicanvote)//87.15108695652171
//console.log(averageindependentvote) //95.17500000000001

//console.log(totalvotewiththeparty("D"))//5527.320000000001
//console.log(totalvotewiththeparty("R"))//4008.9499999999985
//console.log(totalvotewiththeparty("I"))//190.35000000000002



//using math.round funtion display a number to 2 decimal places.

console.log(statistics)
//numerofDemocrats: 5
//numberofRepublicans: 46
//numberofindependent: 2
//pctvotewithDemocrats: 96.97
//pctvotewithRepublicans: 87.15
//pctvotewithindependent: 95.18


//total members of party
function totalMembers(party) {
    var partyMembers = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == party) {
            partyMembers.push(members[i]);
        }
    }
    return partyMembers.length;
}

//% vote with the party
function totalvotewiththeparty(party) {
    var sum = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == party) {
            sum += members[i].votes_with_party_pct;
        }
    }
    return sum;
}

//ascending order
function sortAscending(key) {
    var sortArray = members;
    sortArray.sort(function (a, b) {
        if (a[key] < b[key])
            return -1;
        if (a[key] > b[key])
            return 1;
        return 0;
    });
    return sortArray;
}
//ten % of the member
function partypct(array, key) {
    var percentageArray = [];

    for (var i = 0; i < array.length; i++) {
        if (i < (array.length * 0.1)) {
            percentageArray.push(array[i]);
        } else if (array[i][key] == array[i - 1][key]) {
            percentageArray.push(array[i]);
        } else {
            break;
        }
    }
    return percentageArray
}
//Descending order
function sortDescending(key) {
    var sortArray = members;
    sortArray.sort(function (a, b) {
        if (a[key] > b[key])
            return -1;
        if (a[key] < b[key])
            return 1;
        return 0;
    });
    return sortArray
}

createGlanceTable();

function createGlanceTable() {

 function replaceNaNwithzero(object) {
    for(var x in object){  
        if(isNaN(object[x])){
            object[x] = 0;
        }
    }
    }
replaceNaNwithzero(statistics);

    var row = document.createElement("tr");

    var datacell1 = document.createElement("td");
    datacell1.innerHTML = "Democrats";
    row.appendChild(datacell1);
    var datacell2 = document.createElement("td");
    datacell2.innerHTML = statistics.numberofDemocrats;
    row.appendChild(datacell2);
    var datacell3 = document.createElement("td");
    datacell3.innerHTML = statistics.pctvotewithDemocrats + " % ";
    row.appendChild(datacell3);

    var row2 = document.createElement("tr");
    var dataCell4 = document.createElement("td");
    dataCell4.innerHTML = "Republicans";
    row2.appendChild(dataCell4)
    var dataCell5 = document.createElement("td");
    dataCell5.innerHTML = statistics.numberofRepublicans;
    row2.appendChild(dataCell5)
    var dataCell6 = document.createElement("td");
    dataCell6.innerHTML = statistics.pctvotewithRepublicans + " % ";;

    row2.appendChild(dataCell6)

    var row3 = document.createElement("tr");
    var dataCell7 = document.createElement("td");
    dataCell7.innerHTML = "Independents";
    row3.appendChild(dataCell7)
    var dataCell8 = document.createElement("td");
    dataCell8.innerHTML = statistics.numberofIndependent;
    row3.appendChild(dataCell8)
    var dataCell9 = document.createElement("td");
    dataCell9.innerHTML = statistics.pctvotewithIndependent + " % ";

    row3.appendChild(dataCell9)

    var row4 = document.createElement("tr");
    var dataCell10 = document.createElement("td");
    dataCell10.innerHTML = "Total";
    row4.appendChild(dataCell10)
    var dataCell11 = document.createElement("td");
    dataCell11.innerHTML = statistics.totalMembers;
    row4.appendChild(dataCell11)
    var dataCell12 = document.createElement("td");
    dataCell12.innerHTML = statistics.pctvotewithparty + " % ";

    row4.appendChild(dataCell12)



    table.appendChild(row)
    table.appendChild(row2)
    table.appendChild(row3)
    table.appendChild(row4)
}


function createTable(statisticsArray, tableId, key, keyPct) {


    for (var i = 0; i < statisticsArray.length; i++) {
console.log(statisticsArray.length)
        var row = document.createElement("tr");
        var datacell = document.createElement("td");

        var middle_name = statisticsArray[i].middle_name;
        if (middle_name != null) {
            middle_name = statisticsArray[i].middle_name;
        } else {
            middle_name = "";
        }
        datacell.innerHTML = statisticsArray[i].first_name + " " + middle_name + " " + statisticsArray[i].last_name;
        row.appendChild(datacell);
        var datacell1 = document.createElement("td");
        datacell1.innerHTML = statisticsArray[i][key]
        row.appendChild(datacell1);
        var datacell2 = document.createElement("td");
        datacell2.innerHTML = statisticsArray[i][keyPct] + " % ";
        row.appendChild(datacell2);

        tableId.appendChild(row)
    }
}
