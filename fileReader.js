// Classes must be at the top to prevent hoisting err
class Weather {
    constructor(date, time, bPressure){
        this.date = date;
        this.time = time;
        this.bPressure = bPressure;
    }   
}

//takes file picked from the input 
function splitFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        var lines = contents.split("\n");
        var dataObj = contentToObject(contents);
        console.log(dataObj);
        //displayContents(contents);
    };

    reader.readAsText(file);
}

// shows content on the dom
function displayContents(contents) {
    console.log(typeof contents);
    var element = document.getElementById('file-content');
    element.textContent = contents;
}

function contentToObject(contents){
    var lines = contents.split("\n");
    var weatherObjs = [];
    for(var i = 1; i < lines.length; i++){
        //get the specific data points and add to object. Then add object to array 
        var tableCol = lines[i].split("\t");
        var msec = Date.parse(tableCol[0].split(" ", 1)[0].replace(/_/g, "-")); //correct date format and convert to mill sec
        var date = new Date(msec);
        var time = tableCol[0].split(" ", 2)[1];
        var current = new Weather(date, time, tableCol[3]);
        weatherObjs[i] = current;
    }
    return weatherObjs;
}

function showDiv(){
    var div = document.getElementsByClassName("hidden");
    var div = div[0].style.display = "block";
    console.log(div);
}

function findDates(e){
    console.log("this works");
}

//writes file to page after selection
document.getElementById('file-input')
.addEventListener('change', splitFile, false);

document.getElementById('dates-input')
.addEventListener('click', findDates, false);