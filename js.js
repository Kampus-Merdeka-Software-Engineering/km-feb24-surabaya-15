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
        { "Order_Date": "2014-01-15", "Sales": 150 },
        { "Order_Date": "2014-02-15", "Sales": 200 },
        { "Order_Date": "2014-03-15", "Sales": 250 },
        { "Order_Date": "2014-04-15", "Sales": 300 },
        { "Order_Date": "2014-05-15", "Sales": 350 },
        { "Order_Date": "2014-06-15", "Sales": 400 },
        { "Order_Date": "2014-07-15", "Sales": 450 },
        { "Order_Date": "2014-08-15", "Sales": 500 },
        { "Order_Date": "2014-09-15", "Sales": 550 },
        { "Order_Date": "2014-10-15", "Sales": 600 },
        { "Order_Date": "2014-11-15", "Sales": 650 },
        { "Order_Date": "2014-12-15", "Sales": 700 },
        { "Order_Date": "2015-01-15", "Sales": 750 },
        { "Order_Date": "2015-02-15", "Sales": 800 },
        { "Order_Date": "2015-03-15", "Sales": 850 },
        { "Order_Date": "2015-04-15", "Sales": 900 },
        { "Order_Date": "2015-05-15", "Sales": 950 },
        { "Order_Date": "2015-06-15", "Sales": 1000 },
        { "Order_Date": "2015-07-15", "Sales": 1050 },
        { "Order_Date": "2015-08-15", "Sales": 1100 },
        { "Order_Date": "2015-09-15", "Sales": 1150 },
        { "Order_Date": "2015-10-15", "Sales": 1200 },
        { "Order_Date": "2015-11-15", "Sales": 1250 },
        { "Order_Date": "2015-12-15", "Sales": 1300 },
        { "Order_Date": "2016-01-15", "Sales": 1350 },
        { "Order_Date": "2016-02-15", "Sales": 1400 },
        { "Order_Date": "2016-03-15", "Sales": 1450 },
        { "Order_Date": "2016-04-15", "Sales": 1500 },
        { "Order_Date": "2016-05-15", "Sales": 1550 },
        { "Order_Date": "2016-06-15", "Sales": 1600 },
        { "Order_Date": "2016-07-15", "Sales": 1650 },
        { "Order_Date": "2016-08-15", "Sales": 1700 },
        { "Order_Date": "2016-09-15", "Sales": 1750 },
        { "Order_Date": "2016-10-15", "Sales": 1800 },
        { "Order_Date": "2016-11-15", "Sales": 1850 },
        { "Order_Date": "2016-12-15", "Sales": 1900 },
        { "Order_Date": "2017-01-15", "Sales": 1950 },
        { "Order_Date": "2017-02-15", "Sales": 2000 },
        { "Order_Date": "2017-03-15", "Sales": 2050 },
        { "Order_Date": "2017-04-15", "Sales": 2100 },
        { "Order_Date": "2017-05-15", "Sales": 2150 },
        { "Order_Date": "2017-06-15", "Sales": 2200 },
        { "Order_Date": "2017-07-15", "Sales": 2250 },
        { "Order_Date": "2017-08-15", "Sales": 2300 },
        { "Order_Date": "2017-09-15", "Sales": 2350 },
        { "Order_Date": "2017-10-15", "Sales": 2400 },
        { "Order_Date": "2017-11-15", "Sales": 2450 },
        { "Order_Date": "2017-12-15", "Sales": 2500 }
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

//---------------- Sidebar dropdown category-------------------
function toggleDropdown() {
    var dropdownContent = document.querySelector('.category-dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  }
  
  function confirmSelection(event) {
    var checkbox = event.target;
    var option = checkbox.value;
     var confirmed = confirm("Apakah Anda yakin?");
    if (confirmed) {
      console.log('Pilihan ' + option + ' telah dikonfirmasi.');
      
    } else {
      checkbox.checked = false; 
    }
  }
  
  function searchFunction() {
    var input, filter, ul, li, checkboxes, label, txtValue;
    input = document.getElementById("CategorysearchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdownList");
    checkboxes = ul.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
      label = checkbox.nextSibling; 
      txtValue = label.textContent || label.innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        label.style.display = ""; 
      } else {
        label.style.display = "none"; 
      }
    });
}

// -------------------content 1------------------------

// -------------------content 2------------------------

// -------------------content 3------------------------

// -------------------content 5------------------------
fetch('dataset.json')
    .then(response => response.json())
    .then(data => {
        
        const categorySales = data.reduce((acc, obj) => {
            const Category = obj.Category;
            const Sales = parseFloat(obj.Sales);
            if (!acc[Category]) {
                acc[Category] = 0;
            }
            acc[Category] += Sales;
            return acc;
        }, {});

        
        const categorySalesArray = Object.entries(categorySales);

        
        categorySalesArray.sort((a, b) => b[1] - a[1]);

        
        const labels = categorySalesArray.map(item => item[0]);
        const sales = categorySalesArray.map(item => item[1]);

        
        const ctx = document.getElementById('barchartc5').getContext('2d');
        const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sales',
                    data: sales,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// -------------------content 6------------------------
fetch('dataset.json')
    .then(response => response.json())
    .then(data => {
        
        const salesSubcategory = data.reduce((acc, obj) => {
            const Sales = parseFloat(obj.Sales);
            const Sub_Category = obj.Sub_Category;
            if (!acc[Sub_Category]) {
                acc[Sub_Category] = 0;
            }
            acc[Sub_Category] += Sales;
            return acc;
        }, {});

        
        const salesSubcategoryArray = Object.entries(salesSubcategory);

        
        salesSubcategoryArray.sort((a, b) => b[1] - a[1]);

        
        const labels = salesSubcategoryArray.map(item => item[0]);
        const sales = salesSubcategoryArray.map(item => item[1]);

        
        const ctx = document.getElementById('barchartc6').getContext('2d');
        const barchartc6 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sales',
                    data: sales,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// -------------------content 7------------------------
fetch('dataset.json')
    .then(response => response.json())
    .then(data => {
        
        const cityMostSales = data.reduce((acc, obj) => {
            const Sales = parseFloat(obj.Sales);
            const City = obj.City;
            if (!acc[City]) {
                acc[City] = 0;
            }
            acc[City] += Sales;
            return acc;
        }, {});

        
        const cityMostSalesArray = Object.entries(cityMostSales);

        
        cityMostSalesArray.sort((a, b) => b[1] - a[1]);

        
        const top10CitySalesArray = cityMostSalesArray.slice(0, 10);

        
        const labels = top10CitySalesArray.map(item => item[0]);
        const sales = top10CitySalesArray.map(item => item[1]);

        
        const ctx = document.getElementById('barchartc7').getContext('2d');
        const barchartc7 = new Chart(ctx, {
            type: 'bar', 
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sales',
                    data: sales,
                    backgroundColor: 'rgba(64, 224, 208, 0.2)', 
                    borderColor: 'rgba(64, 224, 208, 1)',       
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', 
                scales: {
                    x: { 
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// -------------------content 8------------------------

fetch('dataset.json')
    .then(response => response.json())
    .then(data => {
        
        const segmentProfits = data.reduce((acc, obj) => {
            const Segment = obj.Segment;
            const Profit = parseFloat(obj.Profit);
            if (!acc[Segment]) {
                acc[Segment] = 0;
            }
            acc[Segment] += Profit;
            return acc;
        }, {});

        
        const segmentProfitsArray = Object.entries(segmentProfits);

       
        segmentProfitsArray.sort((a, b) => b[1] - a[1]);

        
        const labels = segmentProfitsArray.map(item => item[0]);
        const profits = segmentProfitsArray.map(item => item[1]);

        
        const ctx = document.getElementById('barchartc8').getContext('2d');
        const barchartc8 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Profit',
                    data: profits,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

