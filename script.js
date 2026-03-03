const balance = document.getElementById("balance");
const money_plus = document.getElementById("add");
const money_minus = document.getElementById("minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.querySelector('input[type="text"]');
const amount = document.querySelector('input[type="number"]');

let transactions = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter description and amount");
    return;
  }
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues();
  text.value = "";
  amount.value = "";
});

function generateID() {
  return Math.floor(Math.random() * 1000000);
}
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? " - " : " + ";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span>
    <button onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = total;
  money_plus.innerText = " + " + income;
  money_minus.innerText = " - " + expense;
}


function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  updateValues();
}