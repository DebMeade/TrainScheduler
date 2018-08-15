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

  $("#add-train").on("click", function(event) {
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

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);
    $("#rows-here").append("<tr>"
    
    + "<td>" + childSnapshot.val().name + "</td>"
    + "<td>" + childSnapshot.val().destination + "</td>"
    + "<td>" + childSnapshot.val().frequency + "</td>"
    + "<td>" + "Next Arrival" + "</td>"
    + "<td>" + "Next Arrival Minutes Away" + "</td>"
    +
    "</tr>");

    $("#name-input").empty();
})


  })