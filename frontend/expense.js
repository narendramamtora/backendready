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
    const token= localStorage.getItem('token');
    console.log('this is the token of post in the expense',token);
    const response = await axios.post(`${baseUrl}/add-expense`, obj,{headers:{"Authorization":token}});
    console.log('POST request successful:', response.data);
    
    document.getElementById('descrip').value = '';
    document.getElementById('select').value = '';
    document.getElementById('expense').value = '';
  } catch (err) {
    console.log('POST request error:', err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token= localStorage.getItem('token');
    const res = await axios.get(`${baseUrl}/all-expenses`,{headers:{"Authorization":token}});
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
  const expensesList = document.getElementById("my-form");
  const listItem = document.createElement("li");
  listItem.textContent = `${obj.description}-${obj.expamount}-${obj.select}`;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete Expense";
  deleteButton.onclick = async () => {
    try {
      const token= localStorage.getItem('token');
      await axios.delete(`${baseUrl}/delete-expense/${obj.id}`,{headers:{"Authorization":token}});
      console.log('expense deleted successfully');
      expensesList.removeChild(listItem);
    } catch (err) {
      console.log(err);
    }
  };

  // const EditButton = document.createElement("input");
  // EditButton.type = "button";
  // EditButton.value = "Edit";
  // EditButton.onclick = async () => {
  //   document.getElementById("descrip").value = obj.description;
  //   document.getElementById("select").value = obj.select;
  //   document.getElementById("expense").value = obj.expamount;
  //   try {
  //     await axios.delete(`${baseUrl}/delete-expense/${obj.id}`);
  //     console.log('edited successfully');
  //     expensesList.removeChild(listItem);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  listItem.appendChild(deleteButton);
  // listItem.appendChild(EditButton);
  expensesList.appendChild(listItem);
}
