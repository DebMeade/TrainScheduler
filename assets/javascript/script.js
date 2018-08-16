var config = {
    apiKey: "AIzaSyAcsLvIoNIfj6yWXLdC2FPxOf5yCSQJ0E0",
    authDomain: "trainscheduler-991b1.firebaseapp.com",
    databaseURL: "https://trainscheduler-991b1.firebaseio.com",
    projectId: "trainscheduler-991b1",
    storageBucket: "trainscheduler-991b1.appspot.com",
    messagingSenderId: "358878132936"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var time = "";
var frequency = "";

$("#add-train").on("click", function (event) {
    event.preventDefault();
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });
    $(this).closest("form").find("input").val("");
})

database.ref().on("child_added", function (childSnapshot) {
    
    var train = childSnapshot.val()
    console.log(train.name);
    console.log(train.destination);
    console.log(train.time);
    console.log(train.frequency);
    $("#rows-here").append("<tr>"

        + "<td>" + train.name + "</td>"
        + "<td>" + train.destination + "</td>"
        + "<td>" + train.frequency + "</td>"
        + "<td>" + nextArrival(train.time, train.frequency) + "</td>"
        + "<td>" + minutesAway(nextArrival(train.time, train.frequency)) + "</td>"
        +
        "</tr>");

    $("#name-input").empty();
})

function nextArrival(firstTrainTime, trainFrequency) {
    //calculate the time of the next arrival
    //use the first time the train took off and the frequency of the train
    var currentTime = moment();
    var firstDepartureTime = moment(firstTrainTime, "HH:mm");
    var nextDepartureTime = firstDepartureTime;
    //1.check time of the first train-is it after now?
    while ( !firstDepartureTime.isAfter(currentTime) ) {
        nextDepartureTime.add(trainFrequency, "m");
    }   console.log(nextDepartureTime.format("HH:mm"));
    return nextDepartureTime.format("HH:mm");
    //2.if true then return that time, 
    //3.if false 
    //3a.add the frequency to the current train time
    //3b.compare train time and now again
}

function minutesAway(nextDepartureTime) {
    //return minutes until next train arrival
    //1.current time
    var currentTime = moment();
    //2.next arrival time
    var nextDeparture = moment(nextDepartureTime, "HH:mm");
    //3.difference between the two
    var minutesAway = nextDeparture.diff(currentTime, "minutes");
    console.log(minutesAway);
    return minutesAway;
}