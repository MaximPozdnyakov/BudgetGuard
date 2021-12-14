import PropTypes from "prop-types";

export const expenseOptions = [
    { value: "Car", label: "Car" },
    { value: "Travel", label: "Travel" },
    { value: "Food & Drink", label: "Food & Drink" },
    { value: "Family & Personal", label: "Family & Personal" },
    { value: "Bills & Fees", label: "Bills & Fees" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Home", label: "Home" },
    { value: "Shopping", label: "Shopping" },
    { value: "Healthcare", label: "Healthcare" }
];

export const incomeOptions = [
    { value: "Gift", label: "Gift" },
    { value: "Business", label: "Business" },
    { value: "Salary", label: "Salary" },
    { value: "Extra Income", label: "Extra Income" }
];

export const groupedOptions = [
    {
        label: "Expense",
        options: expenseOptions
    },
    {
        label: "Income",
        options: incomeOptions
    }
];

export const colors = {
    Gift: "#18b272",
    Business: "#ffa200",
    Salary: "#60b3b8",
    "Extra Income": "#f964a0",
    Car: "#45A7E6",
    Travel: "#F964A0",
    "Food & Drink": "#FFA801",
    "Family & Personal": "#5EC4AC",
    "Bills & Fees": "#B6985C",
    Entertainment: "#E36AEF",
    Home: "#E1697A",
    Shopping: "#1BB374",
    Healthcare: "#7944D0"
};

export const transactionShape = PropTypes.shape({
    id: PropTypes.number,
    moneyAmount: PropTypes.string,
    moneySign: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    category: PropTypes.string,
    description: PropTypes.string
});
