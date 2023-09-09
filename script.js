// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


 $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //WHEN I click the save button for that time block
  //THEN the text for that event is saved in local storage

  $(".saveBtn").on("click", function(){
    //get id value from parent on selected button child. will be assigned as key for local storage
    var timeBlockId = $(this).parent().attr("id");
    //get description from time block. will be assigned as value for local sotage
    var userDescription = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userDescription);
  })
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //WHEN I view the time blocks for that day
  //THEN each time block is color-coded to indicate whether it is in the past, present, or future
  //compare current time with time block. set proper class by removal and/or adding. 

  var currentHour = dayjs().hour();
  
  $('.time-block').each(function(){
    //gets hour value of time block
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    //confirm 24 hr time value for each time block
    //console.log(blockHour);
    if (blockHour < currentHour){
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour){
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //WHEN I refresh the page
  //THEN the saved events persist

  $(".time-block").each(function(){
    // assign var to key from local storage 
    var timeBlockId = $(this).attr("id");
    //assign var to value from local storage
    var userDescription = localStorage.getItem(timeBlockId);

    if(userDescription){
      $(this).find(".description").val(userDescription);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  //WHEN I open the planner
  //THEN the current day is displayed at the top of the calendar
  var currentData = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentData);
 });


