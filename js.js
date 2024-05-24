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

  document.addEventListener('DOMContentLoaded', function() {
    // Data penjualan dalam format JSON
    const salesData = [
      { "Order_Date": "2014-01-15", "Sales": 123 },
      { "Order_Date": "2014-02-15", "Sales": 178 },
      { "Order_Date": "2014-03-15", "Sales": 214 },
      { "Order_Date": "2014-04-15", "Sales": 195 },
      { "Order_Date": "2014-05-15", "Sales": 310 },
      { "Order_Date": "2014-06-15", "Sales": 275 },
      { "Order_Date": "2014-07-15", "Sales": 329 },
      { "Order_Date": "2014-08-15", "Sales": 298 },
      { "Order_Date": "2014-09-15", "Sales": 245 },
      { "Order_Date": "2014-10-15", "Sales": 367 },
      { "Order_Date": "2014-11-15", "Sales": 298 },
      { "Order_Date": "2014-12-15", "Sales": 450 },
      { "Order_Date": "2015-01-15", "Sales": 490 },
      { "Order_Date": "2015-02-15", "Sales": 420 },
      { "Order_Date": "2015-03-15", "Sales": 385 },
      { "Order_Date": "2015-04-15", "Sales": 510 },
      { "Order_Date": "2015-05-15", "Sales": 470 },
      { "Order_Date": "2015-06-15", "Sales": 515 },
      { "Order_Date": "2015-07-15", "Sales": 390 },
      { "Order_Date": "2015-08-15", "Sales": 430 },
      { "Order_Date": "2015-09-15", "Sales": 480 },
      { "Order_Date": "2015-10-15", "Sales": 525 },
      { "Order_Date": "2015-11-15", "Sales": 570 },
      { "Order_Date": "2015-12-15", "Sales": 600 },
      { "Order_Date": "2016-01-15", "Sales": 645 },
      { "Order_Date": "2016-02-15", "Sales": 685 },
      { "Order_Date": "2016-03-15", "Sales": 720 },
      { "Order_Date": "2016-04-15", "Sales": 690 },
      { "Order_Date": "2016-05-15", "Sales": 730 },
      { "Order_Date": "2016-06-15", "Sales": 780 },
      { "Order_Date": "2016-07-15", "Sales": 815 },
      { "Order_Date": "2016-08-15", "Sales": 840 },
      { "Order_Date": "2016-09-15", "Sales": 875 },
      { "Order_Date": "2016-10-15", "Sales": 920 },
      { "Order_Date": "2016-11-15", "Sales": 955 },
      { "Order_Date": "2016-12-15", "Sales": 990 },
      { "Order_Date": "2017-01-15", "Sales": 1035 },
      { "Order_Date": "2017-02-15", "Sales": 1080 },
      { "Order_Date": "2017-03-15", "Sales": 1125 },
      { "Order_Date": "2017-04-15", "Sales": 1160 },
      { "Order_Date": "2017-05-15", "Sales": 1205 },
      { "Order_Date": "2017-06-15", "Sales": 1250 },
      { "Order_Date": "2017-07-15", "Sales": 1285 },
      { "Order_Date": "2017-08-15", "Sales": 1320 },
      { "Order_Date": "2017-09-15", "Sales": 1365 },
      { "Order_Date": "2017-10-15", "Sales": 1400 },
      { "Order_Date": "2017-11-15", "Sales": 1445 },
      { "Order_Date": "2017-12-15", "Sales": 1480 }
  ];
  

    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Monthly Sales',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales'
                    }
                }
            }
        }
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChart);
    });

    function updateChart() {
        const selectedYears = Array.from(checkboxes)
                                   .filter(checkbox => checkbox.checked)
                                   .map(checkbox => checkbox.id.replace('year', ''));

        const monthlySales = [];
        const monthYearLabels = [];

        salesData.forEach(data => {
            const date = new Date(data.Order_Date);
            const year = date.getFullYear();
            const month = date.getMonth();
            if (selectedYears.includes(year.toString())) {
                const monthYear = `${getMonthName(month)} ${year}`;
                if (!monthYearLabels.includes(monthYear)) {
                    monthYearLabels.push(monthYear);
                    monthlySales.push(0);
                }
                const index = monthYearLabels.indexOf(monthYear);
                monthlySales[index] += data.Sales;
            }
        });

        myChart.data.labels = monthYearLabels;
        myChart.data.datasets[0].data = monthlySales;
        myChart.update();
    }

    function getMonthName(monthIndex) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[monthIndex];
    }

    // Panggil updateChart saat pertama kali untuk menampilkan data awal
    updateChart();
});

