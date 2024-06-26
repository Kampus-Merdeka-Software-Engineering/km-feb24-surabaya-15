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

// ----------Dropdown Filter Year--------------
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContainer = document.querySelector('.dropdown-container-year');
    
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContainer.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!dropdownContainer.contains(event.target)) {
            dropdownContainer.classList.remove('active');
        }
    });
});
// ----------Dropdown Filter Year--------------

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
    const { data, states, categories } = await fetchData(); 
  
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

        checkbox.addEventListener('change', updateCharts);  // Add event listener for state checkboxes
    });

    // Add event listener for year checkboxes
    const yearCheckboxes = document.querySelectorAll('.content4 input[type="checkbox"]');
    yearCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCharts);
    });

    const categoryCheckboxes = document.querySelectorAll('#dropdownList input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCharts);
    });

    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', updateCharts);

    initChart1(data);
    initChart2(data);
    initChart3(data);
    initChart4(data);
    initChart5(data);
    updateTotals(data);
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
    updateCharts();
}

function initChart2(data) {
    const ctx = document.getElementById('barchartc5').getContext('2d');
    window.doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Sales',
                data: [],
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

    updateCharts();
}

function initChart3(data) {
    const ctx = document.getElementById('barchartc6').getContext('2d');
    window.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Sales',
                data: [],
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

    updateCharts();
}

function initChart4(data) {
    const ctx = document.getElementById('barchartc7').getContext('2d');
    window.cityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Sales',
                data: [],
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

    updateCharts();
}

function initChart5(data) {
    const ctx = document.getElementById('barchartc8').getContext('2d');
    window.segmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Profit',
                data: [],
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

    updateCharts();
}


function updateCharts() {
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

    const startDateInput = document.getElementById('start-date').value;
    const endDateInput = document.getElementById('end-date').value;
    const startDate = startDateInput ? new Date(startDateInput) : null;
    const endDate = endDateInput ? new Date(endDateInput) : null;
                           
    updateLineChart(selectedStates, startDate, endDate, selectedCategories);
    if (window.doughnutChart) {
        updateDoughnutChart(selectedStates, startDate, endDate, selectedCategories);
    }
    if (window.barChart) {
        updateBarChart(selectedStates, startDate, endDate, selectedCategories);
    }
    if (window.cityChart) {
        updateCityChart(selectedStates, startDate, endDate, selectedCategories);
    }
    if (window.segmentChart) {
        updateSegmentChart(selectedStates, startDate, endDate, selectedCategories);
    }
    updateTotals(window.salesData, selectedStates, startDate, endDate, selectedCategories);
}

function updateLineChart(selectedStates, startDate, endDate, selectedCategories) {
    const monthlySales = [];
    const monthYearLabels = [];

    window.salesData.forEach(data => {
        const date = new Date(data.Order_Date);
        if ((selectedStates.length === 0 || selectedStates.includes(data.State)) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate) &&
            (selectedCategories.length === 0 || selectedCategories.includes(data.Category))) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const monthYear = `${getMonthName(month)} ${year}`;
            if (!monthYearLabels.includes(monthYear)) {
                monthYearLabels.push(monthYear);
                monthlySales.push(0);
            }
            const index = monthYearLabels.indexOf(monthYear);
            monthlySales[index] += parseFloat(data.Sales);
        }
    });

    window.myChart.data.labels = monthYearLabels;
    window.myChart.data.datasets[0].data = monthlySales;
    window.myChart.update();
}

function updateDoughnutChart(selectedStates, startDate, endDate, selectedCategories) {
    const categorySales = {};

    window.salesData.forEach(data => {
        const date = new Date(data.Order_Date);
        if ((selectedStates.length === 0 || selectedStates.includes(data.State)) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate) &&
            (selectedCategories.length === 0 || selectedCategories.includes(data.Category))) {
            const Category = data.Category;
            const Sales = parseFloat(data.Sales);
            if (!categorySales[Category]) {
                categorySales[Category] = 0;
            }
            categorySales[Category] += Sales;
        }
    });

    const categorySalesArray = Object.entries(categorySales);

    categorySalesArray.sort((a, b) => b[1] - a[1]);

    const labels = categorySalesArray.map(item => item[0]);
    const sales = categorySalesArray.map(item => item[1]);

    window.doughnutChart.data.labels = labels;
    window.doughnutChart.data.datasets[0].data = sales;
    window.doughnutChart.update();
}


function updateBarChart(selectedStates, startDate, endDate, selectedCategories) {
    const salesSubcategory = {};

    window.salesData.forEach(data => {
        const date = new Date(data.Order_Date);
        if ((selectedStates.length === 0 || selectedStates.includes(data.State)) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate) &&
            (selectedCategories.length === 0 || selectedCategories.includes(data.Category))) {
            const Sub_Category = data.Sub_Category;
            const Sales = parseFloat(data.Sales);
            if (!salesSubcategory[Sub_Category]) {
                salesSubcategory[Sub_Category] = 0;
            }
            salesSubcategory[Sub_Category] += Sales;
        }
    });

    const salesSubcategoryArray = Object.entries(salesSubcategory);

    salesSubcategoryArray.sort((a, b) => b[1] - a[1]);

    const labels = salesSubcategoryArray.map(item => item[0]);
    const sales = salesSubcategoryArray.map(item => item[1]);

    window.barChart.data.labels = labels;
    window.barChart.data.datasets[0].data = sales;
    window.barChart.update();
}


function updateCityChart(selectedStates, startDate, endDate, selectedCategories) {
    const citySales = {};

    window.salesData.forEach(data => {
        const date = new Date(data.Order_Date);
        if ((selectedStates.length === 0 || selectedStates.includes(data.State)) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate) &&
            (selectedCategories.length === 0 || selectedCategories.includes(data.Category))) {
            const City = data.City;
            const Sales = parseFloat(data.Sales);
            if (!citySales[City]) {
                citySales[City] = 0;
            }
            citySales[City] += Sales;
        }
    });

    const citySalesArray = Object.entries(citySales);

    citySalesArray.sort((a, b) => b[1] - a[1]);

    const top10CitySalesArray = citySalesArray.slice(0, 10);

    const labels = top10CitySalesArray.map(item => item[0]);
    const sales = top10CitySalesArray.map(item => item[1]);

    window.cityChart.data.labels = labels;
    window.cityChart.data.datasets[0].data = sales;
    window.cityChart.update();
}

function updateSegmentChart(selectedStates, startDate, endDate, selectedCategories) {
    const segmentProfits = {};

    window.salesData.forEach(data => {
        const date = new Date(data.Order_Date);
        if ((selectedStates.length === 0 || selectedStates.includes(data.State)) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate) &&
            (selectedCategories.length === 0 || selectedCategories.includes(data.Category))) {
            const Segment = data.Segment;
            const Profit = parseFloat(data.Profit);
            if (!segmentProfits[Segment]) {
                segmentProfits[Segment] = 0;
            }
            segmentProfits[Segment] += Profit;
        }
    });

    const segmentProfitsArray = Object.entries(segmentProfits);

    segmentProfitsArray.sort((a, b) => b[1] - a[1]);

    const labels = segmentProfitsArray.map(item => item[0]);
    const profits = segmentProfitsArray.map(item => item[1]);

    window.segmentChart.data.labels = labels;
    window.segmentChart.data.datasets[0].data = profits;
    window.segmentChart.update();
}

function updateTotals(data, selectedStates = [], startDate = null, endDate = null, selectedCategories = []) {
    let totalSales = new Set();
    let totalProfit = 0;
    let totalCustomer = new Set();

    data.forEach(item => {
        const date = new Date(item.Order_Date);
        if ((selectedStates.length === 0 || selectedStates.includes(item.State)) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate) &&
            (selectedCategories.length === 0 || selectedCategories.includes(item.Category))) {
            totalSales.add(item.Row_ID);
            totalProfit += parseFloat(item.Profit);
            totalCustomer.add(item.Customer_ID);
        }
    });

    document.getElementById('totalSales').textContent = totalSales.size;
    document.getElementById('totalProfit').textContent = totalProfit.toLocaleString();
    document.getElementById('totalCustomer').textContent = totalCustomer.size;
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
  