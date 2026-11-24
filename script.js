
// ======================================
// 1. SELECT HTML ELEMENTS (DOM)
// ======================================

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseCategory = document.getElementById("expenseCategory");
const expenseAmount = document.getElementById("expenseAmount");

const totalBudgetElement = document.getElementById("totalBudget");
const totalExpensesElement = document.getElementById("totalExpenses");
const remainingBalanceElement = document.getElementById("remainingBalance");

const expenseList = document.getElementById("expenseList");
const budgetMessage = document.getElementById("budgetMessage");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const clearExpensesButton = document.getElementById("clearExpenses");


// ======================================
// 2. STORE DATA USING VARIABLES & ARRAYS
// ======================================

let budget = Number(localStorage.getItem("spendwiseBudget")) || 0;

let expenses = [];

try {
    expenses = JSON.parse(
        localStorage.getItem("spendwiseExpenses")
    ) || [];

    if (!Array.isArray(expenses)) {
        expenses = [];
    }
} catch (error) {
    expenses = [];
}


// ======================================
// 3. FORMAT MONEY
// ======================================

function formatMoney(amount) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES"
    }).format(amount);
}


// ======================================
// 4. SAVE DATA TO LOCAL STORAGE
// ======================================

function saveData() {
    localStorage.setItem("spendwiseBudget", budget);

    localStorage.setItem(
        "spendwiseExpenses",
        JSON.stringify(expenses)
    );
}


// ======================================
// 5. CALCULATE TOTAL EXPENSES USING LOOP
// ======================================

function calculateTotalExpenses() {

    let total = 0;

    // Loop through all expense records
    for (const expense of expenses) {
        total += Number(expense.amount);
    }

    return total;
}


// ======================================
// 6. DISPLAY EXPENSES ON THE DASHBOARD
// ======================================

function displayExpenses() {

    // Clear previous records
    expenseList.innerHTML = "";

    // CONDITIONAL: Check if there are expenses
    if (expenses.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.className = "empty-message";
        cell.textContent = "No expenses recorded yet.";

        row.appendChild(cell);
        expenseList.appendChild(row);

    } else {

        // LOOP: Display every expense record
        for (const expense of expenses) {

            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = expense.name;

            const categoryCell = document.createElement("td");
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement("td");
            amountCell.textContent = formatMoney(
                Number(expense.amount)
            );

            const actionCell = document.createElement("td");

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.type = "button";
            deleteButton.dataset.id = expense.id;

            actionCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(categoryCell);
            row.appendChild(amountCell);
            row.appendChild(actionCell);

            expenseList.appendChild(row);
        }
    }
}


// ======================================
// 7. UPDATE THE DASHBOARD
// ======================================

function updateDashboard() {

    const totalExpenses = calculateTotalExpenses();

    const remainingBalance = budget - totalExpenses;

    // Update dashboard figures
    totalBudgetElement.textContent = formatMoney(budget);

    totalExpensesElement.textContent = formatMoney(
        totalExpenses
    );

    remainingBalanceElement.textContent = formatMoney(
        remainingBalance
    );

    // Update expense records
    displayExpenses();

    // Update budget feedback
    updateBudgetStatus(totalExpenses, remainingBalance);

    // Save the latest information
    saveData();
}


// ======================================
// 8. USE CONDITIONALS FOR BUDGET DECISIONS
// ======================================

function updateBudgetStatus(totalExpenses, remainingBalance) {

    budgetMessage.className = "";
    progressBar.style.width = "0%";

    // Calculate percentage of budget used
    let percentage = 0;

    if (budget > 0) {
        percentage = (totalExpenses / budget) * 100;
    }

    // Prevent the progress bar from exceeding 100%
    const displayedPercentage = Math.min(percentage, 100);

    progressBar.style.width = displayedPercentage + "%";

    progressText.textContent =
        percentage.toFixed(1) + "% of budget used";

    // CONDITIONAL STATEMENTS
    if (budget <= 0) {

        budgetMessage.textContent =
            "Please set your monthly budget to get started.";

        budgetMessage.className = "warning";

    } else if (totalExpenses === 0) {

        budgetMessage.textContent =
            "Your budget is ready. Start recording your expenses.";

        budgetMessage.className = "success";

    } else if (remainingBalance < 0) {

        budgetMessage.textContent =
            "Warning! You have exceeded your budget by " +
            formatMoney(Math.abs(remainingBalance)) + ".";

        budgetMessage.className = "danger";

        progressBar.style.backgroundColor = "#d93636";

    } else if (percentage >= 80) {

        budgetMessage.textContent =
            "Warning! You have used most of your budget. Spend carefully.";

        budgetMessage.className = "warning";

        progressBar.style.backgroundColor = "#d18a18";

    } else {

        budgetMessage.textContent =
            "Great job! You are managing your budget well.";

        budgetMessage.className = "success";

        progressBar.style.backgroundColor = "#43d9a3";
    }
}


// ======================================
// 9. EVENT LISTENER: SET MONTHLY BUDGET
// ======================================

budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget <= 0) {

        alert("Please enter a valid budget greater than zero.");

        return;
    }

    budget = newBudget;

    updateDashboard();

    budgetForm.reset();

    alert("Your monthly budget has been updated!");
});


// ======================================
// 10. EVENT LISTENER: ADD NEW EXPENSE
// ======================================

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();

    const category = expenseCategory.value;

    const amount = Number(expenseAmount.value);

    // Validate user information
    if (
        name === "" ||
        category === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert("Please enter valid expense information.");

        return;
    }

    // Create a new expense record
    const newExpense = {

        id: Date.now().toString(),

        name: name,

        category: category,

        amount: amount
    };

    // Add the new record to the array
    expenses.push(newExpense);

    // Update the webpage
    updateDashboard();

    // Clear the form
    expenseForm.reset();

    alert("Expense added successfully!");
});


// ======================================
// 11. EVENT LISTENER: DELETE EXPENSE
// ======================================

expenseList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-button")) {

        const expenseId = event.target.dataset.id;

        // Remove the selected expense using a loop
        const updatedExpenses = [];

        for (const expense of expenses) {

            if (expense.id !== expenseId) {

                updatedExpenses.push(expense);
            }
        }

        expenses = updatedExpenses;

        // Update dashboard after deletion
        updateDashboard();
    }
});


// ======================================
// 12. EVENT LISTENER: CLEAR ALL EXPENSES
// ======================================

clearExpensesButton.addEventListener("click", function() {

    if (expenses.length === 0) {

        alert("There are no expenses to clear.");

    } else {

        const confirmation = confirm(
            "Are you sure you want to delete all expenses?"
        );

        if (confirmation) {

            expenses = [];

            updateDashboard();

            alert("All expenses have been cleared.");
        }
    }
});


// ======================================
// 13. DISPLAY CURRENT DATE
// ======================================

const currentDateElement = document.getElementById("currentDate");

const today = new Date();

currentDateElement.textContent = today.toLocaleDateString(
    "en-KE",
    {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
);


// ======================================
// 14. LOAD DASHBOARD WHEN PAGE OPENS
// ======================================

budgetInput.value = budget > 0 ? budget : "";

updateDashboard();
