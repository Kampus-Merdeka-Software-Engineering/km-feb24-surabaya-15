// -----------Modal-----------
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  });
  const modalCloseButton = document.querySelector('.modal-close');
  modalCloseButton.addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  });
    
const modal = document.getElementById('modal');
modal.style.opacity = 0;
modal.style.transition = 'opacity 0.5s ease-in-out';

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  setTimeout(function() {
    modal.style.opacity = 1;
  }, 50);
});
// -----------------------------

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

document.getElementById('StatedropdownList').addEventListener('click', function(event) {
  event.stopPropagation();
});

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

// Bagian JS untuk Menu Dropdown State dan Datatable
async function fetchData() {
    const response = await fetch('dataset.json'); 
    const data = await response.json();
    
    // Extract unique states from the data
    const states = new Set(data.map(item => item.State)); 
    const categories = new Set(data.map(item => item.Category));
  
    return { data, states, categories }; 
}

async function initDataTable() {
    const { data } = await fetchData(); // Destructure data from the result of fetchData
  
    $(document).ready(function() {
        $('#your_table_id').DataTable({
            data: data,
            columns: [
                { data: 'Row_ID', width: '5%' }, 
                { data: 'Order_ID', width: '5%' },
                { data: 'Order_Date', width: '7%' },
                { data: 'Ship_Date', width: '7%' },
                { data: 'Ship_Mode', width: '7%' },
                { data: 'Customer_ID', width: '5%' },
                { data: 'Customer_Name', width: '10%' },
                { data: 'Segment', width: '7%' },
                { data: 'Country', width: '7%' },
                { data: 'City', width: '7%' },
                { data: 'State', width: '7%' },
                { data: 'Postal_Code', width: '5%' },
                { data: 'Region', width: '7%' },
                { data: 'Product_ID', width: '7%' },
                { data: 'Category', width: '7%' },
                { data: 'Sub_Category', width: '7%' },
                { data: 'Product_Name', width: '10%' },
                { data: 'Sales', width: '7%' },
                { data: 'Quantity', width: '5%' },
                { data: 'Discount', width: '5%' },
                { data: 'Profit', width: '7%' }
                // ... add more columns as needed
            ],
            scrollX: true, // Enable horizontal scrolling
            autoWidth: false // Disable automatic column width calculation
        });
    });
}

initDataTable();
// ---------------------------------

document.addEventListener('DOMContentLoaded', async function() {
    const {data} = await fetchData();

    // Menghitung total sales, total profit, and total customer
    let totalSales = new Set();
    let totalProfit = 0;
    let totalCustomer = new Set();

    data.forEach(item => {
        totalSales.add(item.Row_ID);
        totalProfit += parseFloat(item.Profit);
        totalCustomer.add(item.Customer_ID);
    });

    // Display the totals in the HTML
    document.getElementById('totalSales').textContent = totalSales.size;
    document.getElementById('totalProfit').textContent = totalProfit.toLocaleString();
    document.getElementById('totalCustomer').textContent = totalCustomer.size;
});

document.addEventListener('DOMContentLoaded', async function() {
    const { data, states } = await fetchData(); 
  
    const stateDropdownList = document.getElementById('StatedropdownList');
    states.forEach(state => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.value = state;
        label.textContent = state;
        label.appendChild(checkbox);
        stateDropdownList.appendChild(label);

        checkbox.addEventListener('change', updateChart);  // Add event listener for state checkboxes
    });

    // Add event listener for year checkboxes
    const yearCheckboxes = document.querySelectorAll('.content4 input[type="checkbox"]');
    yearCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChart);
    });

    const categoryCheckboxes = document.querySelectorAll('#dropdownList input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateChart);
    });

    initChart1(data);
});

function initChart1(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
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

    window.salesData = data.sort((a, b) => new Date(a.Order_Date) - new Date(b.Order_Date));
    window.categoryData = new Set(data.map(item => item.Category));
    updateChart();
}

function updateChart() {
    const stateCheckboxes = document.querySelectorAll('#StatedropdownList input[type="checkbox"]');
    const selectedStates = Array.from(stateCheckboxes)
                                .filter(checkbox => checkbox.checked)
                                .map(checkbox => checkbox.value);

    const yearCheckboxes = document.querySelectorAll('.content4 input[type="checkbox"]');
    const selectedYears = Array.from(yearCheckboxes)
                               .filter(checkbox => checkbox.checked)
                               .map(checkbox => checkbox.id.replace('year', ''));

    const selectedCategories = Array.from(document.querySelectorAll('#dropdownList input[type="checkbox"]:checked'))
                               .map(checkbox => checkbox.value);

    const monthlySales = [];
    const monthYearLabels = [];

    window.salesData.forEach(data => {
        const date = new Date(data.Order_Date);
        const year = date.getFullYear();
        const month = date.getMonth();
        if (selectedStates.includes(data.State) && selectedYears.includes(year.toString()) 
            && (selectedCategories.length === 0 || selectedCategories.includes(data.Category))) {
            const monthYear = `${getMonthName(month)} ${year}`;
            if (!monthYearLabels.includes(monthYear)) {
                monthYearLabels.push(monthYear);
                monthlySales.push(0);
            }
            const index = monthYearLabels.indexOf(monthYear);
            monthlySales[index] += parseFloat(data.Sales); // Ensure Sales is treated as a number
        }
    });

    window.myChart.data.labels = monthYearLabels;
    window.myChart.data.datasets[0].data = monthlySales;
    window.myChart.update();
}

function getMonthName(monthIndex) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthIndex];
}



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

