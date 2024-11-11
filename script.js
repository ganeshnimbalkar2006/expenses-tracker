let budget = 0;
let expenses = [];
let remainingBalance = 0;

function setBudget() {
  const budgetInput = document.getElementById("budget-input").value;
  budget = parseFloat(budgetInput);
  remainingBalance = budget;
  document.getElementById("budget-display").innerText = `Budget: $${budget.toFixed(2)}`;
  document.getElementById("balance-display").innerText = `Remaining Balance: $${remainingBalance.toFixed(2)}`;
}

function addExpense() {
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (description && !isNaN(amount) && amount > 0) {
    expenses.push({ description, amount });
    remainingBalance -= amount;

    document.getElementById("balance-display").innerText = `Remaining Balance: $${remainingBalance.toFixed(2)}`;
    renderExpenses();
    updateChart();
    
    document.getElementById("expense-description").value = "";
    document.getElementById("expense-amount").value = "";
  } else {
    alert("Please enter a valid description and amount.");
  }
}

function renderExpenses() {
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = "";
  
  expenses.forEach((expense) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${expense.description}</span> <span>$${expense.amount.toFixed(2)}</span>`;
    expenseList.appendChild(listItem);
  });
}

function updateChart() {
  const ctx = document.getElementById("expenseChart").getContext("2d");

  const labels = expenses.map(expense => expense.description);
  const data = expenses.map(expense => expense.amount);

  if (window.expenseChart) {
    window.expenseChart.destroy();
  }

  window.expenseChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Expenses",
        data: data,
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}
