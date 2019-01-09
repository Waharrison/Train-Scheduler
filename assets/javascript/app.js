var config = {
  apiKey: "AIzaSyD_t23wptpfonRNkXO21w8YPlvkOaMvWII",
  authDomain: "first-database-2a13d.firebaseapp.com",
  databaseURL: "https://first-database-2a13d.firebaseio.com",
  projectId: "first-database-2a13d",
  storageBucket: "first-database-2a13d.appspot.com",
  messagingSenderId: "106278721056"
};
firebase.initializeApp(config);

var database = firebase.database();

var name= "";
var dest="";
var frequency="";

// grabbing information when clicked submit
$("#submitButton").on("click", function () {
  var name = $("#nameInput").val().trim();
  var dest = $("#destInput").val().trim();
  var trainTime = $("#trainTimeInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();


  //push data to firebase
  firebase.database().ref().push({
    name: name,
    dest: dest,
    trainTime: trainTime,
    frequency: frequency,

 });

 dateAdded: firebase.database.ServerValue.TIMESTAMP
  
    alert("Train successfully added");

    //clears fields
    $("#nameInput").val("");
    $("#destInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");

})

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //store in variables from firebase
  var Tname = childSnapshot.val().name;
  var Tdest = childSnapshot.val().dest;
  var Ttime = childSnapshot.val().trainTime;
  var Tfrequency = childSnapshot.val().frequency;
console.log(Ttime)

  // console.log(Tname);
  // console.log(Tdest);
  // console.log(Ttime);
  // console.log(Tfrequency);

  // compute the difference in time from 'now' and the first train using UNIX timestamp, store in var and convert to minutes
  var TtrainTime = moment().diff(moment.unix(Ttime, "X"), "minutes");
  console.log(TtrainTime)
   // get the remainder of time by using 'moderator' with the frequency & time difference, store in var
  Tremainder = TtrainTime % Tfrequency;
  console.log(Tremainder);
  // subtract the remainder from the frequency, store in var
  var minAway = Tfrequency - Tremainder;

  var nextArrival = moment().add(minAway, "m").format("hh:mm A");

  var newRow = $("<tr>").append(
    $("<td>").text(Tname),
    $("<td>").text(Tdest),
    $("<td>").text(Tfrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway),
  );



  $("#train-table > tbody").append(newRow);

});
