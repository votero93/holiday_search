document.addEventListener('DOMContentLoaded', makeRequests)

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

async function makeRequests(){
    var thisURL = new URL(window.location.href).searchParams;
    console.log(thisURL);
    if(thisURL.has("month")){
        var month = parseInt(thisURL.get("month"));
        var year = parseInt(thisURL.get("year"));
        var api_key = "335601dcb4943fa680b0426e8f53988580e74f54";
        var url = "https://calendarific.com/api/v2/holidays?&api_key=" + api_key + "&country=US&year=" + year + "&month=" + month;
        console.log(url);

        var response = await fetch(url);
    
        var data = await response.json();
        console.log(data);

        var holidays = data.response.holidays;
        console.log(holidays.length);
        var results = document.getElementById('results');
        for(var i = 0; i < holidays.length; i++){
            if(i != holidays.length - 1 && holidays[i].name == holidays[i + 1].name){
                holidays.splice(i + 1, 1);
            }

            var character = document.createElement("div");
            character.className = "character";
            results.appendChild(character);
            var name = document.createElement("h3");
            name.className = "name";
            var day = holidays[i].date.datetime.day;
            var dateObj = new Date(month + "/" + day + "/" + year);
            //console.log(dateObj);
            name.innerHTML = holidays[i].name +  " - " + daysOfTheWeek[dateObj.getDay()] + ", " + holidays[i].date.datetime.month + "/" + day;
            character.appendChild(name);
            
            var description = document.createElement("p");
            description.className = "description";
            description.innerHTML = holidays[i].description;
            character.appendChild(description);
        }
        console.log(holidays.length);
    }
    
}
