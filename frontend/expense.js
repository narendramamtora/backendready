const baseUrl = 'http://localhost:3000/expense';

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
    //for handing success payment 
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
          const res = await axios.get(`http://localhost:3000/premium/all-expenses`, { headers: { "Authorization": token } });
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
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseUrl}/all-expenses`, { headers: { "Authorization": token } });
    console.log(res);

    for (const expense of res.data) {
      showExpenseOnScreen(expense);
      // console.log(expense)
    }
  } catch (err) {
    console.log(err);
  }
});

async function showExpenseOnScreen(obj) {
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

