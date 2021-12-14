import { createSelector } from "reselect";
import {
    getMoneyRange,
    filterByWallet,
    sortByDate,
    filterByDateRange,
    filterByTransactionsFilters,
    getBalance,
    getCategoryOptions,
    getExpenses,
    getIncomes,
    getTransactionsBeforeStartDate,
    getBalanceByDays,
    getBarsData,
    getPieData
} from "../helpers/transactions";
import _ from "lodash";

export const checkDataLoaded = createSelector(
    state => state.user.isUserLoaded,
    state => state.transactions.isTransactionsLoaded,
    state => state.wallets.isWalletsLoaded,
    (...booleans) => booleans.every(bool => bool)
);

const selectTransactionsByWallet = createSelector(
    state => state.transactions.transactions,
    state => state.wallets.currentWallet.id,
    (transactions, walletId) =>
        sortByDate(filterByWallet(transactions, walletId))
);

const selectTransactionsForPeriod = createSelector(
    selectTransactionsByWallet,
    state => state.transactions.filters.dateRange,
    filterByDateRange
);

const selectTransactionsBeforeStartDate = createSelector(
    selectTransactionsByWallet,
    state => state.transactions.filters.dateRange[0],
    getTransactionsBeforeStartDate
);

export const selectTransactionsByFilters = createSelector(
    selectTransactionsForPeriod,
    state => state.transactions.filters.moneyRange,
    state => state.transactions.filters.categories,
    state => state.transactions.filters.search,
    filterByTransactionsFilters
);

export const selectCategoryOptions = createSelector(
    selectTransactionsForPeriod,
    getCategoryOptions
);

export const selectMoneyRange = createSelector(
    selectTransactionsForPeriod,
    getMoneyRange
);

export const selectBalance = createSelector(
    selectTransactionsByWallet,
    state => Number(state.wallets.currentWallet.initialBalance),
    (transactions, initialBalance) => getBalance(transactions) + initialBalance
);

export const selectExpenseForPeriod = createSelector(
    selectTransactionsByFilters,
    transactions => getBalance(getExpenses(transactions))
);

export const selectIncomeForPeriod = createSelector(
    selectTransactionsByFilters,
    transactions => getBalance(getIncomes(transactions))
);

export const selectBalanceForPeriod = createSelector(
    selectIncomeForPeriod,
    selectExpenseForPeriod,
    (income, expense) => income + expense
);

const selectBalanceBeforeStartDate = createSelector(
    selectTransactionsBeforeStartDate,
    state => Number(state.wallets.currentWallet.initialBalance),
    (transactions, initialBalance) => getBalance(transactions) + initialBalance
);

export const selectBalanceByDays = createSelector(
    selectTransactionsByFilters,
    state => state.transactions.filters.dateRange,
    selectBalanceBeforeStartDate,
    getBalanceByDays
);

export const selectBarsData = createSelector(
    selectTransactionsByFilters,
    state => state.transactions.filters.dateRange,
    getBarsData
);

export const selectIncomePieData = createSelector(
    selectTransactionsByFilters,
    transactions => getPieData(getIncomes(transactions))
);

export const selectExpensePieData = createSelector(
    selectTransactionsByFilters,
    transactions => getPieData(getExpenses(transactions))
);
