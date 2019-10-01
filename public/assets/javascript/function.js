//Start Document Ready Function
$( document ).ready(function() {

//Firebase Configuration Settings
var firebaseConfig = {
    apiKey: "AIzaSyBU-2S-PobbYkWSNxHYRtWmnuTEFHsz_oE",
    authDomain: "zstormdevelopment.firebaseapp.com",
    databaseURL: "https://zstormdevelopment.firebaseio.com",
    projectId: "zstormdevelopment",
    storageBucket: "zstormdevelopment.appspot.com",
    messagingSenderId: "443988656115",
    appId: "1:443988656115:web:db8f9670ba382375689c86",
    measurementId: "G-MWJ6CC26BF"
};


// Initialize Firebase and database 
firebase.initializeApp(firebaseConfig);

//Initial variables
var database = firebase.database()
var name = '';
var destination = '';
var inputTime = '';
var frequency = '';
var newTrain = 0;


//Adding new trains to list
$("#add-user").on("click", function (event) {
    event.preventDefault();

//grabbing data from inputs on form
    name = $("#input-name").val().trim();
    destination = $("#input-dest").val().trim();
    inputTime = $("#input-time").val().trim();
    frequency = $("#input-freq").val().trim();

    inputTimeConvert = moment(inputTime, 'HH:mm').format('hh:mm A')

//doing calculation
    var theFreq = frequency;
    var first = moment(inputTimeConvert, "hh:mm A")
    var currentTime = moment();
    var current = currentTime.toString()
    var diffTime = moment().diff(moment(first), "minutes");
    var remainder = diffTime % theFreq;
    var timeTillNext = theFreq - remainder;
    var tillTrain = timeTillNext.toString()
    var nextTrain = moment().add(timeTillNext, "minutes").format('hh:mm A');
    var strTrain = nextTrain.toString()

//pushing data to the database
    database.ref().push({
        name: name,
        destination: destination,
        inputTimeConvert: inputTimeConvert,
        theFreq: theFreq,
        current: current,
        tillTrain: tillTrain,
        strTrain: strTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});


//console.log and appending to train list
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    newTrain++
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.inputTimeConvert);
    console.log(sv.theFreq);
    console.log(sv.current);
    console.log(sv.tillTrain);
    console.log(sv.strTrain);
    console.log(sv.dateAdded);


    $('#emptyRow').append('<div class="flex-auto shadow-md table-row">')
    $('#emptyRow').append('<div class="flex-auto border-dashed border-2 border-black table-cell bg-white text-black px-4 py-2 text-sm">' + newTrain + '</div>')
    $('#emptyRow').append(' <div class="flex-auto border-dashed border-2 border-black w-1/6 table-cell bg-white text-black px-4 py-2 text-sm">' + sv.name + '</div>')
    $('#emptyRow').append(' <div class="flex-auto border-dashed border-2 border-black w-1/6 table-cell bg-white text-black px-4 py-2 text-sm">' + sv.destination + '</div>')
    $('#emptyRow').append(' <div class="flex-auto border-dashed border-2 border-black w-1/6 table-cell bg-white text-black px-4 py-2 text-sm">' + sv.inputTimeConvert + '</div>')
    $('#emptyRow').append(' <div class="flex-auto border-dashed border-2 border-black w-1/6 table-cell bg-white text-black px-4 py-2 text-sm">' + sv.theFreq + '</div>')
    $('#emptyRow').append(' <div class="flex-auto border-dashed border-2 border-black w-1/6 table-cell bg-white text-black px-4 py-2 text-sm">' + sv.strTrain + '</div>')
    $('#emptyRow').append(' <div class="flex-auto border-dashed border-2 border-black w-1/6 table-cell bg-white text-black px-4 py-2 text-sm">' + sv.tillTrain + '</div></div>')



}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

});