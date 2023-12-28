document.addEventListener('DOMContentLoaded', () => {
    const expensesTable = document.getElementById('expensesTable');
    const savingBalanceElement = document.getElementById('savingBalance');
    let expenses = [];
  
    // Fetch expenses data from the server
    axios.get('http://localhost:3000/expenses')
      .then(response => {
        expenses = response.data;
        renderTable();
        updateSavingBalance();
      })
      .catch(error => console.error('Error fetching expenses:', error));
  
    function renderTable() {
      const tbody = expensesTable.querySelector('tbody');
      tbody.innerHTML = '';
  
      expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${expense.date}</td>
          <td>${expense.description}</td>
          <td>${expense.category}</td>
          <td>${expense.income}</td>
          <td>${expense.expense}</td>
        `;
        tbody.appendChild(row);
      });
    }
  
    function updateSavingBalance() {
      const totalIncome = expenses.reduce((acc, expense) => acc + parseFloat(expense.income), 0);
      const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.expense), 0);
      const savingBalance = totalIncome - totalExpense;
      savingBalanceElement.textContent = savingBalance.toFixed(2);
    }
  });
  