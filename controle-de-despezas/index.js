const transactionsUl = document.getElementById('transactions');
const balanceDisplay = document.getElementById('balance');
const incomeMoneyDisplay = document.getElementById('money-plus');
const expenseMoneyDisplay = document.getElementById('money-minus');
const form = document.getElementById('form');
const inputTransactionName = document.getElementById('text');
const inputTransactionAmount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const insertTransactionIntoDOM = ({ id, name, amount }) => {
  const operator = amount < 0 ? '-' : '+';
  const CSSClass = operator === '-' ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(amount);
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `${name}<span> ${operator} R$ ${amountWithoutOperator}</span>
  <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
  `;
  transactionsUl.appendChild(li);
};

const removeTransaction = (transactionID) => {
  transactions = transactions.filter(
    (transaction) => transaction.id !== transactionID
  );
  updateLocalStorage();
  init();
};

const getExpenses = (transactionsAmount) =>
  Math.abs(
    transactionsAmount
      .filter((value) => value < 0)
      .reduce((sum, transaction) => sum + transaction, 0)
      .toFixed(2)
  );

const getIncome = (transactionsAmount) =>
  transactionsAmount
    .filter((value) => value > 0)
    .reduce((sum, transaction) => sum + transaction, 0)
    .toFixed(2);

const getTotal = (transactionsAmount) =>
  transactionsAmount.reduce((sum, transaction) => sum + transaction, 0);

const updateBalanceValues = () => {
  const transactionsAmount = transactions.map(({ amount }) => amount);
  const total = getTotal(transactionsAmount);
  const income = getIncome(transactionsAmount);
  const expenses = getExpenses(transactionsAmount);

  balanceDisplay.innerText = `R$ ${total}`;
  incomeMoneyDisplay.innerText = `R$ ${income}`;
  expenseMoneyDisplay.innerText = `R$ ${expenses}`;
};

const init = () => {
  transactionsUl.innerHTML = '';
  transactions.forEach(insertTransactionIntoDOM);
  updateBalanceValues();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const generateID = () => Math.floor(Math.random() * 10000);

const addTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount),
  });
};

const cleanInputs = () => {
  inputTransactionName.value = '';
  inputTransactionAmount.value = '';
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

  if (isSomeInputEmpty) {
    alert('Por favor, preencha o nome e o valor da transação');
    return;
  }

  addTransactionsArray(transactionName, transactionAmount);
  init();
  updateLocalStorage();
  cleanInputs();
};

form.addEventListener('submit', handleFormSubmit);
