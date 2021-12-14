import {
    sub,
    startOfToday,
    endOfToday,
    eachDayOfInterval,
    isSameDay,
    format,
    differenceInDays
} from "date-fns";
import _ from "lodash";

export const getInitialDateRange = () => [
    sub(startOfToday(), { weeks: 1 }),
    endOfToday()
];

export const sortByDate = transactions =>
    transactions.sort((a, b) => new Date(b.spent_at) - new Date(a.spent_at));

const getCurrentTransactions = (transactions, walletId, [startDate, endDate]) =>
    transactions.filter(
        ({ wallet, spent_at }) =>
            wallet == walletId &&
            differenceInDays(new Date(spent_at), new Date(startDate)) >= 0 &&
            differenceInDays(new Date(spent_at), new Date(endDate)) <= 0
    );

export const getMoneyRange = transactions => {
    const moneyData = transactions.map(
        ({ moneyAmount, moneySign }) => moneyAmount * (moneySign == 0 ? -1 : 1)
    );
    const [minSum, maxSum] = [Math.min(...moneyData), Math.max(...moneyData)];
    if (!Number.isFinite(minSum)) return [0, 0];
    return [minSum, maxSum];
};

const getCategories = transactions =>
    Object.keys(_.groupBy(transactions, "category"));

export const syncFilters = (state, transactions, walletId) => {
    const syncCategories = ({
        selectedCategories,
        prevCategories,
        currentCategories
    }) => [
        ...selectedCategories.filter(category =>
            currentCategories.includes(category)
        ),
        ...currentCategories.filter(
            category => !prevCategories.includes(category)
        )
    ];

    const { dateRange, categories } = state.filters;
    const prevTransactions = getCurrentTransactions(
        state.transactions,
        walletId,
        dateRange
    );
    const currentTransactions = getCurrentTransactions(
        transactions,
        walletId,
        dateRange
    );

    return {
        categories: syncCategories({
            selectedCategories: categories,
            prevCategories: getCategories(prevTransactions),
            currentCategories: getCategories(currentTransactions)
        }),
        moneyRange: getMoneyRange(currentTransactions)
    };
};

export const resetFilters = (transactions, walletId, dateRange) => {
    const currentTransactions = getCurrentTransactions(
        transactions,
        walletId,
        dateRange
    );
    return {
        categories: getCategories(currentTransactions),
        moneyRange: getMoneyRange(currentTransactions),
        search: ""
    };
};

export const filterByWallet = (transactions, walletId) =>
    transactions.filter(t => t.wallet == walletId);

export const filterByDateRange = (transactions, [startDate, endDate]) =>
    transactions.filter(
        ({ spent_at }) =>
            differenceInDays(new Date(spent_at), new Date(startDate)) >= 0 &&
            differenceInDays(new Date(spent_at), new Date(endDate)) <= 0
    );

export const filterByTransactionsFilters = (
    transactions,
    [rangeStart, rangeEnd],
    categories,
    search
) =>
    transactions.filter(({ moneyAmount, moneySign, category, description }) => {
        const money = moneyAmount * (moneySign == 0 ? -1 : 1);
        description = description ?? "";
        return (
            money >= rangeStart &&
            money <= rangeEnd &&
            categories.includes(category) &&
            description.includes(search)
        );
    });

export const getBalance = transactions =>
    _.sum(
        transactions.map(
            ({ moneyAmount, moneySign }) =>
                moneyAmount * (moneySign == 0 ? -1 : 1)
        )
    );

export const getCategoryOptions = transactions =>
    Object.keys(_.groupBy(transactions, "category")).map(category => ({
        value: category,
        label: category
    }));

export const getExpenses = transactions =>
    transactions.filter(({ moneySign }) => moneySign == 0);

export const getIncomes = transactions =>
    transactions.filter(({ moneySign }) => moneySign == 1);

export const getTransactionsBeforeStartDate = (transactions, startDate) =>
    transactions.filter(
        ({ spent_at }) => new Date(startDate) >= new Date(spent_at)
    );

export const getBalanceByDays = (
    transactions,
    [startDate, endDate],
    initialBalance
) => {
    let currentBalance = initialBalance;
    return eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate)
    }).map(day => {
        const transactionsPerDay = transactions.filter(({ spent_at }) =>
            isSameDay(new Date(spent_at), day)
        );
        currentBalance += getBalance(transactionsPerDay);
        return {
            date: format(day, "MMMM dd, Y"),
            Balance: currentBalance
        };
    });
};

export const getBarsData = (transactions, [startDate, endDate]) =>
    eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate)
    }).map(day => {
        const transactionsPerDay = transactions.filter(({ spent_at }) =>
            isSameDay(new Date(spent_at), day)
        );
        return {
            date: format(day, "MMMM dd, Y"),
            Income: getBalance(getIncomes(transactionsPerDay)),
            Expense: -getBalance(getExpenses(transactionsPerDay))
        };
    });

export const getPieData = transactions => {
    const total = Math.abs(getBalance(transactions));
    return Object.entries(_.groupBy(transactions, "category")).map(
        ([category, transactions]) => {
            const totalByCategory = Math.abs(getBalance(transactions));
            return {
                x: category,
                y: totalByCategory,
                label: `${category}
                ${Number(((totalByCategory / total) * 100).toFixed(2))}%`,
                count: transactions.length
            };
        }
    );
};
