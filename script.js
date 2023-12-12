// Get the button and navigation elements
const navMenu = document.getElementById('nav-menu');
const hNav = document.getElementById('h-nav');

// Add click event listener to the button
navMenu.addEventListener('click', function() {
  // Toggle the display property of the navigation
  if (hNav.style.display === 'none' || hNav.style.display === '') {
    hNav.style.display = 'block';
  } else {
    hNav.style.display = 'none';
  }
});


let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const budgetCurrency = document.getElementById("budget-currency");
const expenseCurrency = document.getElementById("expense-currency");
const balanceCurrency = document.getElementById("balance-currency");
const list = document.getElementById("list");
let tempAmount = 0;
let selectedBudgetCurrency = "USD";
let selectedExpenseCurrency = "USD";

// Function to set budget and currencies
const setBudget = () => {
  tempAmount = parseFloat(totalAmount.value);
  if (isNaN(tempAmount) || tempAmount < 0) {
    errorMessage.classList.remove("hide");
    return;
  }
  errorMessage.classList.add("hide");
  amount.innerText = tempAmount.toFixed(2);
  budgetCurrency.innerText = selectedBudgetCurrency;
  balanceValue.innerText = tempAmount.toFixed(2);
  balanceCurrency.innerText = selectedBudgetCurrency;
  totalAmount.value = "";
};

// Set Budget Part
totalAmountButton.addEventListener("click", setBudget);

// Function to handle currency conversion
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const exchangeRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.80,
    GHS: 11.80,
    // Add other currencies and their exchange rates as needed
  };

  if (fromCurrency !== toCurrency) {
    return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  }
  return amount;
};

// Function to add expenses
const addExpense = () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return;
  }
  productTitleError.classList.add("hide");

  let expenseValue = parseFloat(userAmount.value);
  expenseValue = convertCurrency(expenseValue, selectedExpenseCurrency, selectedBudgetCurrency);
  
  expenditureValue.innerText = (parseFloat(expenditureValue.innerText) + expenseValue).toFixed(2);
  expenseCurrency.innerText = selectedBudgetCurrency;
  balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
  balanceCurrency.innerText = selectedBudgetCurrency;

  const formattedExpenseValue = convertCurrency(expenseValue, selectedBudgetCurrency, selectedExpenseCurrency);
  listCreator(productTitle.value, formattedExpenseValue, selectedExpenseCurrency);

  productTitle.value = "";
  userAmount.value = "";
};

// Function to create list
const listCreator = (expenseName, expenseValue, expenseCurrency) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue.toFixed(2)} ${expenseCurrency}</p>`;
  
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    editElement(sublistContent, expenseValue, expenseCurrency);
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    deleteElement(sublistContent, expenseValue, expenseCurrency);
  });

  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  list.appendChild(sublistContent);
};

// Event listeners for currency selection
document.getElementById("budget-currency-selector").addEventListener("change", (event) => {
  selectedBudgetCurrency = event.target.value;
  setBudget();
});

document.getElementById("expense-currency-selector").addEventListener("change", (event) => {
  selectedExpenseCurrency = event.target.value;
});

// Event listener for adding expenses
checkAmountButton.addEventListener("click", addExpense);

// Function to edit list elements
// ... (Previous code remains unchanged)

// Function to edit list elements
let editButton = document.createElement("button");
editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
editButton.style.fontSize = "1.2em";
editButton.addEventListener("click", () => {
  modifyElement(editButton, true);
});
let deleteButton = document.createElement("button");
deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
deleteButton.style.fontSize = "1.2em";
deleteButton.addEventListener("click", () => {
  modifyElement(deleteButton);
});

