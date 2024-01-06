document.addEventListener('DOMContentLoaded', async() => {
  const expensesTable = document.getElementById('daytoday');
  const yearlyTable = document.getElementById('yearly');
  const noteTable = document.getElementById('notereport');
  const downloadButton = document.getElementById('download');
  const lastDownloaded = document.getElementById('lastdownload');
  const downloadedList = document.getElementById('downloaded');

try{
  const token = localStorage.getItem('token');
 const response=await axios.get('http://localhost:3000/reportexp/all-expenses', { headers: { "Authorization": token } })
      const expenses = response.data;
      renderExpensesTable(expenses);
      renderYearlyReport(expenses);
      renderNoteReport(expenses);
      const downloadListResponse = await axios.get('http://localhost:3000/reportexp/last-downloaded', { headers: { "Authorization": token } });
      const lastDownloadedList = downloadListResponse.data;
      lastDownloaded.innerText = 'Last Downloaded';
      downloadedList.innerHTML = '';
      lastDownloadedList.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.downloadlist;
        downloadedList.appendChild(listItem);
      });


    }catch (error) {
      console.error('Error fetching expenses:', error);
    }

    downloadButton.addEventListener('click', async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/reportexp/download', { headers: { "Authorization": token } });
        
        if(response.status==200){
          var a =document.createElement('a');
          a.href=response.data.fileURL;
          a.download='myexpense.csv'
          a.click();
          console.log('we are in the report frontend and we downloaded the file successfully');
        }else{
          console.log("error")
        }
        console.log('Report downloaded successfully');
      } catch (error) {
        console.error('Error downloading report:', error);
      }
    });
  function renderExpensesTable(expenses) {
    const tbody = expensesTable.querySelector('tbody');
    tbody.innerHTML = '';
    expenses.forEach(expense => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <!-- <td>${expense.date}</td> -->
        <td>${expense.description}</td>
        <td>${expense.select}</td>
        <!--  <td>${expense.income}</td> -->
        <td>${expense.expamount}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderYearlyReport(expenses) {
    const tbody = yearlyTable.querySelector('tbody');
    tbody.innerHTML = '';


    const exampleRow = document.createElement('tr');
    exampleRow.innerHTML = '<td>January</td><td>1000</td><td>500</td><td>500</td>';
    tbody.appendChild(exampleRow);
  }

  function renderNoteReport(expenses) {
    const tbody = noteTable.querySelector('tbody');
    tbody.innerHTML = '';


    const exampleRow = document.createElement('tr');
    exampleRow.innerHTML = '<td>2023-01-01</td><td>Some notes</td>';
    tbody.appendChild(exampleRow);
  }
});
