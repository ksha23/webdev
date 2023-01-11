// Get the button element
var button = document.getElementById("resetButton");

// Add a click event listener to the button
button.addEventListener("click", function () {
  // Get all the select elements in the form
  var selects = document.querySelectorAll("#filter-form select");
  var form = document.getElementById("filter-form");
  // Set the value of each select element to "all"
  selects.forEach(function (select) {
    select.value = "all";
    form.submit()
  });
});