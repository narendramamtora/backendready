const baseUrl = 'http://localhost:3000/expense';
let currentPage = 1;
let expensesPerPage = 5;

function updateExpensesPerPage() {
  expensesPerPage = parseInt(document.getElementById('expensesPerPage').value); //i had added parseInt to convert the value in integer which is not compulsory
  localStorage.setItem('expensesPerPage', expensesPerPage);  //.setItem will store it to local storage
  getExpenses(1);  // Fetch and display the first page of expenses
}
async function Storedata(event) {
  event.preventDefault();
  console.log('Submit button clicked');
  let submitDescrip = document.getElementById('descrip').value;
  let select = document.getElementById('select').value;
  let expense = document.getElementById('expense').value;

  let obj = {
    descrip: submitDescrip,
    mselect: select,
    expense: expense
  };
  let obj1 = {
    description: submitDescrip,
    select: select,
    expamount: expense
  };

  // Display the new expense on the screen
  showExpenseOnScreen(obj1);

  try {
    const token = localStorage.getItem('token');
    console.log('this is the token of post in the expense', token);
    const response = await axios.post(`${baseUrl}/add-expense`, obj, { headers: { "Authorization": token } });
    console.log('POST request successful:', response.data);

    document.getElementById('descrip').value = '';
    document.getElementById('select').value = '';
    document.getElementById('expense').value = '';
  } catch (err) {
    console.log('POST request error:', err);
  }
}

document.getElementById('rzpbutton').onclick = async function (e) {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:3000/purchase/premiummember', { headers: { "Authorization": token } });
  console.log('check if the res in the rzpbutton ');

  var options = {
    "key": response.data.key_id,
    "order_id": response.data.order.id,
    //for handling success payment 
    "handler": async function (response) {
      await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
        status: 'success'
      }, { headers: { "Authorization": token } });
      alert('you are a premium user');
      replaceButtonWithMessage();
    }
  };
  const rzpl = new Razorpay(options);
  rzpl.open();
  e.preventDefault();

  rzpl.on('payment.failed', async function (response) {
    console.log('this is failed response 00001', response);
    await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
      order_id: response.error.metadata.order_id,
      payment_id: response.error.metadata.payment_id,
      status: 'failed'
    }, { headers: { "Authorization": token } })
    alert('Something went wrong');
  });
}

const downloadButton = document.getElementById('downloadfile');
downloadButton.addEventListener('click', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/premium-status`, { headers: { "Authorization": token } });

    if (response.data.isPremiumUser) {
      window.location.href = 'file:///F:/javascript/01 Expense Tracker - Node.js Project/frontend/report.html';
    } else {
      alert('You need to be a premium user to download the report file.');
    }
  } catch (error) {
    console.error('Error checking premium status:', error);
  }
});

function showLeaderBoard() {
  const leaderboardHeading = document.getElementById("leaderboard");
  if (leaderboardHeading.style.display === "none" || leaderboardHeading.style.display === "") {
    leaderboardHeading.style.display = "block";
  } else {
    leaderboardHeading.style.display = "none"; 
  }
}

function replaceButtonWithMessage(res) {
  const rzpButton = document.getElementById('rzpbutton');
  if (rzpButton) {
    rzpButton.parentNode.removeChild(rzpButton);
    const premiumContainer = document.createElement('div');
    const premiumMessage = document.createElement('span');
    premiumMessage.textContent = 'You are a premium user';
    premiumContainer.appendChild(premiumMessage);
    const showLeaderBoardButton = document.createElement("input");
    showLeaderBoardButton.type = "button";
    showLeaderBoardButton.value = "ShowLeaderBoard";

    showLeaderBoardButton.onclick = async () => {
      try {
        showLeaderBoard()
        console.log('you clicked show leader successfully');
        try {
          const token = localStorage.getItem('token');
          await getExpenses(currentPage); // Fetch expenses for the current page
          const res = await axios.get(`${baseUrl}/premium/all-expenses`, { headers: { "Authorization": token } });
          console.log('Users:', res.data.users);
          console.log('Response:', res);
          showLeadersOnScreen(res);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    };
    premiumContainer.appendChild(showLeaderBoardButton);
    const expensesList = document.getElementById("my-form");
    expensesList.appendChild(premiumContainer);
  } else {
    console.error("Element with ID 'rzpbutton' not found.");
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem('token');
    const premiumStatusResponse = await axios.get(`${baseUrl}/premium-status`, {
      headers: { "Authorization": token }
    });
    const isPremiumUser = premiumStatusResponse.data.isPremiumUser;
    if (isPremiumUser) {
      replaceButtonWithMessage();
    } else {
      const rzpButton = document.getElementById('rzpbutton');
      rzpButton.style.display = 'block';
    }
  } catch (err) {
    console.error('Error checking premium status:', err);
  }

  try {
    await getExpenses(currentPage); // Fetch expenses for the current page
  } catch (err) {
    console.log(err);
  }
});
window.addEventListener("DOMContentLoaded", async () => {

  const expensesPerPageSelect = document.getElementById('expensesPerPage');
  expensesPerPageSelect.addEventListener('change', updateExpensesPerPage);

// Check for stored value in localStorage
const storedExpensesPerPage = localStorage.getItem('expensesPerPage');
if (storedExpensesPerPage) {
  expensesPerPage = parseInt(storedExpensesPerPage);
  document.getElementById('expensesPerPage').value = storedExpensesPerPage;
}


  try {
    await getExpenses(currentPage);
  } catch (err) {
    console.log(err);
  }
});
async function getExpenses(page) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/all-expenses?page=${page}&limit=${expensesPerPage}`, { headers: { "Authorization": token } });

    const expensesList = document.getElementById("expenses-list");
    expensesList.innerHTML = '';

    for (const expense of response.data.expenses) {
      showExpenseOnScreen(expense);
    }

    currentPage = page;

    addExpensePagination(response.data.pagination);
  } catch (err) {
    console.log(err);
  }
}


function addExpensePagination(pagination) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = '';

  if (pagination.hasPreviousPage) {
    const previousButton = createPaginationButton("Previous", pagination.previousPage);
    paginationContainer.appendChild(previousButton);
  }

  for (let i = 1; i <= pagination.lastPage; i++) {
    const pageButton = createPaginationButton(i, i);
    paginationContainer.appendChild(pageButton);
  }

  if (pagination.hasNextPage) {
    const nextButton = createPaginationButton("Next", pagination.nextPage);
    paginationContainer.appendChild(nextButton);
  }
}

function createPaginationButton(text, page) {
  const button = document.createElement("button");
  button.textContent = text;

  button.addEventListener("click", async () => {
    await getExpenses(page);
  });

  return button;
}

function showExpenseOnScreen(obj) {
  const expensesList = document.getElementById("expenses-list");
  const listItem = document.createElement("li");
  listItem.textContent = `${obj.description}-${obj.expamount}-${obj.select}`;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete Expense";
  deleteButton.onclick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/delete-expense/${obj.id}`, { headers: { "Authorization": token } });
      console.log('expense deleted successfully');
      expensesList.removeChild(listItem);
    } catch (err) {
      console.log(err);
    }
  };

  listItem.appendChild(deleteButton);
  expensesList.appendChild(listItem);
}

async function showLeadersOnScreen(res) {
  const LeaderList = document.getElementById("leaderboard-list");
  for (const user of res.data.users) {
    const listItem = document.createElement("li");
    const totalCost = user.totalExpense !== null ? user.totalExpense : 0;
    listItem.textContent = `Name: ${user.name}, Total Expense: ${totalCost}`;
    LeaderList.appendChild(listItem);
  }
}
