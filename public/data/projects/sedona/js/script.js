var searchform = document.querySelector(".hotel-search-form");
var searchbtn = document.querySelector(".hotel-search-button");

searchbtn.addEventListener("click", function(evt) {
  evt.preventDefault();
  searchform.classList.toggle("hotel-search-show");
});
