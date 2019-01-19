var config = {
		apiKey: "AIzaSyDXKDk0isyf65yS679if5M2bq0x0KG1Fok",
		authDomain: "class-project-2a15f.firebaseapp.com",
		databaseURL: "https://class-project-2a15f.firebaseio.com",
		projectId: "class-project-2a15f",
		storageBucket: "class-project-2a15f.appspot.com",
		messagingSenderId: "811548623995"
	};
	firebase.initializeApp(config);


	var database = firebase.database();
	
	var trainName = $("#trainNameInput");
	var destination = $("#destinationInput)";
	var trainTime = $("#trainTimeInput");
	var frequency = $("#frequencyInput");

	$("#clock").html(moment()._d);
	


	

	$("#addTrainForm").on("submit", function(event){
	event.preventDefault();
	console.log("works")

	var newTrain = {
		name: $("#trainNameInput").val().trim(),
		destination: $("#destinationInput").val().trim(),
		trainTime: $("#trainTimeInput").val().trim(),
		frequency: $("#frequencyInput").val().trim(),
	}
	database.ref().push(newTrain);


});

database.ref("/trains").on("child_added", function (childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());


	// var firebaseName = childSnapshot.val().name;
	// var firebaseDestination = childSnapshot.val().destination;
	// var firebaseTrainTimeInput = childSnapshot.val().trainTime;
	// var firebaseFrequency = childSnapshot.val().frequency;

	var trainNameData = childSnapshot.val().name
	var destinationData = childSnapshot.val().destination
	var frequencyData = childSnapshot.val().frequency
	var firstTrainTimeData = childSnapshot.val().trainTime
  console.log(trainNameData);
  console.log(destinationData);
  console.log(frequencyData);
  console.log(firstTrainTimeData);
	// splits user inputed first time 09:40 to ["09", "20"]
	var timeArr = firstTrainTimeData.split(":")
  
	// Use the array to make a actual moment() and store in trainTime
	var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1])
  
	// maxMoment will now be either the current time or the first train arrival of the day. Whichever is further out
	var maxMoment = moment.max(moment(), trainTime)
  
	// If the first train has not come yet maxMoment is equal to trainTime (First train of the day) otherwise it is equal to the current moment
	if (maxMoment === trainTime) {
  
	  // Format train arrival to be readable
	  var tArrival = trainTime.format("hh:mm A");
  
	  // Use trainTime and current moment() to calculate minutes unitl next arrival
	  var tMinutes = trainTime.diff(moment(), "minutes");
  
	} else {
  
	  // differenceTimes is how long it has passed since first train of day
	  var differenceTimes = moment().diff(trainTime, "minutes");
  
	  // tRemainder is the left over of taking the diffferenceTimes and modulus frequency.
	  var tRemainder = differenceTimes % frequencyData;
  
	  // tMinutes takes the frequency and - the remainder. This number is always less than frequency
	  var tMinutes = frequencyData - tRemainder;
  
	  // Next arrival is the current time plus the tMinutes
	  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
	}
	var newTableRow = `<tr><td>${trainNameData}</td><td>${destinationData}</td><td>${frequencyData}</td></tr>`
	
	// <td>${tArrival}</td><td>${tMinutes}</td></tr>`
	$("#train-table").append(newTableRow);





});

