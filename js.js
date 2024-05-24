document.getElementById('StateSearch').addEventListener('click', function(event) {
  document.getElementById('StatedropdownList').classList.toggle('show');
  event.stopPropagation(); // Prevent the event from bubbling up to the window click listener
});

function filterFunction() {
  var input, filter, div, labels, i;
  input = document.getElementById('StateSearch');
  filter = input.value.toUpperCase();
  div = document.getElementById('StatedropdownList');
  labels = div.getElementsByTagName('label');
  for (i = 0; i < labels.length; i++) {
      txtValue = labels[i].textContent || labels[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          labels[i].style.display = "";
      } else {
          labels[i].style.display = "none";
      }
  }
}

// Prevent the dropdown from closing when clicking inside it
document.getElementById('StatedropdownList').addEventListener('click', function(event) {
  event.stopPropagation();
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#StateSearch')) {
      var dropdowns = document.getElementsByClassName('state-dropdown-content');
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}


function fetchJSONdata(){
    fetch("dataset.json")
    .then((res) =>{
        if (!res.ok) {
          throw new error(`HTTP Error! Status: ${res.status}`)
        }
        return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Unable to fetch data : ", error))
}
fetchJSONdata()

function toggleCheckBox(id,e) {
    const checkbox = document.getElementById(id);
    const elemen = document.getElementById(e);

    if (checkbox.checked) {
        elemen.style.display = 'block';
    } else {
        elemen.style.display = 'none';
    }
  }

