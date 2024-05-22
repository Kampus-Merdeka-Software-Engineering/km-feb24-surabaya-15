function dropdown() {
    document.getElementById("Dropdown").classList.toggle("show");
  }
  

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) { 
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

