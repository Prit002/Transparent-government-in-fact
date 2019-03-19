console.log(data.results[0].members)

var members = data.results[0].members;

var table = document.getElementById("senate-data");
var repeatState = document.getElementById("state-filter");
var democratic = document.getElementById("democratic");
var republican = document.getElementById("republican");
var independent = document.getElementById("independent");
var displayMessage = document.getElementById("displayMessage");

filterState()
createTable(members);


function createTable(members) {
    table.innerHTML = "";
    if (members.length == 0) {
        displayMessage.style.display = "block";
    } else {
        displayMessage.style.display = "none";

        for (var i = 0; i < members.length; i++) {

            var row = document.createElement("tr");
            var datacell = document.createElement("td");

            var middle_name = members[i].middle_name;
            if (middle_name != null) {
                middle_name = members[i].middle_name;
            } else {
                middle_name = "";
            }
            datacell.innerHTML = members[i].first_name + " " + middle_name + " " + members[i].last_name;
            row.appendChild(datacell);
            var datacell1 = document.createElement("td");
            datacell1.innerHTML = members[i].party;
            row.appendChild(datacell1);
            var datacell2 = document.createElement("td");
            datacell2.innerHTML = members[i].state;
            row.appendChild(datacell2);
            var datacell3 = document.createElement("td");
            datacell3.innerHTML = members[i].seniority;
            row.appendChild(datacell3);
            var datacell4 = document.createElement("td");
            datacell4.innerHTML = members[i].votes_with_party_pct;
            row.appendChild(datacell4);

            table.appendChild(row)
        }
    }
}


repeatState.addEventListener("change", function () {
    var filteredArray = filter();
    createTable(filteredArray)
      
});

democratic.addEventListener("click", function () {
    var filteredArray = filter();
    createTable(filteredArray)
    

});

republican.addEventListener("click", function () {
    var filteredArray = filter();
    createTable(filteredArray)
    
    
});
independent.addEventListener("click", function () {
    var filteredArray = filter();
   
    createTable(filteredArray)
    
});

function filter() {
    
    var newArray = [];

    for (var i = 0; i < members.length; i++) {
        if (members[i].state == repeatState.value || repeatState.value == "all") {
            if (democratic.checked == true && members[i].party == "D") {
                newArray.push(members[i]);
            }
            if (republican.checked == true && members[i].party == "R") {
                newArray.push(members[i]);
            }
            if (independent.checked == true && members[i].party == "I") {
                newArray.push(members[i])
            }
        }
    }
    return newArray;
}

function filterState() {

    var unique = members.map(item => item.state).filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
    }).sort();
    //    console.log(unique)

    for (var i = 0; i < unique.length; i++) {
        let option = document.createElement("option");
        option.value = unique[i];
        option.innerHTML = unique[i];
        repeatState.appendChild(option)
    }
}