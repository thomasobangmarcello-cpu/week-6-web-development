
# SpendWise – Interactive Budget Tracker

## 1. Project Description

SpendWise is a simple and interactive budgeting application developed using HTML, CSS, and JavaScript.

The application helps users manage their monthly budgets, record daily expenses, monitor their spending, and calculate their remaining balance.

## 2. Improvements Made This Week

The following features were added:

- Monthly budget setting.
- Expense recording form.
- Automatic calculation of total expenses.
- Automatic calculation of remaining balance.
- Budget status messages.
- Expense records displayed in a table.
- Ability to delete individual expenses.
- Ability to clear all expenses.
- Dynamic dashboard updates.
- Local storage to preserve information after refreshing the page.
- Responsive design for mobile and desktop screens.

## 3. How Conditionals Are Used

Conditional statements such as `if`, `else if`, and `else` are used to make budgeting decisions.

For example:

- If no budget is set, the application asks the user to set one.
- If expenses are higher than the budget, an overspending warning is displayed.
- If 80% or more of the budget has been used, a spending warning appears.
- If expenses are within the budget, a positive message is displayed.

## 4. How Arrays Are Used

An array called `expenses` stores multiple expense records.

Each record contains:

- Expense ID.
- Expense name.
- Expense category.
- Expense amount.

The `push()` method adds new expenses to the array.

The application also uses the array to display, calculate, and delete expense records.

## 5. How Loops Are Used

The `for...of` loop processes the expense records stored in the array.

It is used to:

- Calculate total expenses.
- Display all recorded expenses.
- Process records when deleting an expense.

This makes it easier to manage multiple records without creating separate variables for each expense.

## 6. How DOM Manipulation Is Used

DOM manipulation allows JavaScript to update the webpage dynamically.

The application uses methods such as:

- `getElementById()` to select HTML elements.
- `createElement()` to create new table elements.
- `appendChild()` to display expense records.
- `textContent` to update dashboard information.
- `innerHTML` to clear previous expense records.

Whenever a user adds or deletes an expense, the dashboard updates automatically.

## 7. How Event Listeners Are Used

Event listeners allow users to interact with SpendWise.

The application uses:

- `submit` to capture budget and expense forms.
- `click` to delete expenses.
- `click` to clear all expenses.

The `preventDefault()` method prevents the form from refreshing the webpage when submitted.

## 8. Challenges and Solutions

**Challenge 1: Calculating multiple expenses**

Solution: I used arrays and loops to store and calculate all expense records.

**Challenge 2: Updating the dashboard automatically**

Solution: I created an `updateDashboard()` function that recalculates and displays the latest information.

**Challenge 3: Providing feedback when the budget is exceeded**

Solution: I used conditional statements to compare total expenses with the available budget.

**Challenge 4: Losing records after refreshing the webpage**

Solution: I used browser local storage to save and retrieve the budget and expense records.

## 9. Technologies Used

- HTML5 – Application structure.
- CSS3 – Styling and responsive layout.
- JavaScript – Application functionality.
- DOM Manipulation – Dynamic webpage updates.
- Local Storage – Saving user information.

## 10. Conclusion

This project helped me understand how JavaScript makes webpages interactive.

I applied decision-making, arrays, loops, DOM manipulation, and event listeners to develop a functional budgeting application.

SpendWise demonstrates how HTML, CSS, and JavaScript work together to create a practical application for managing personal expenses.
