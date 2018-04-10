
import web3 from '../web3';
import { address, abi } from 'constants';

web3.eth.defaultAccount = web3.eth.getCoinbase();
const VQPaymentsContract = web3.eth.contract(abi);
const payments = VQPaymentsContract.at(address);

const createTransaction = (payee:string, manager:string, ref:string) => {
    return payments.createTransaction(payee, manager, ref);
}
const acceptTransaction = (txID:number) => {
    return payments.acceptTransaction(txID);
}
const cancelTransaction = (txID:number) => {
    return payments.cancelTransaction(txID);
}
const getUserTransactionsCount = (user:string, userType:number) => {
    return payments.getUserTransactionsCount(user, userType);
}
const getUserTransactionByID = (user:string, userType:number, txID:number) => {
    return payments.getUserTransactionByID(user, userType, txID);
}
/* const getAllUserTransactions = (user:string, userType:number, offset:number, limit:number) => {
    return payments.getAllUserTransactions(user, userType, offset, limit);
} */
const getTransactionStatus = (payer:string, txID:number) => {
    return payments.getTransactionStatus(payer, txID);
}
const releaseDeposit = (txID:number) => {
    return payments.releaseDeposit(txID);
}
const refundDeposit = (txID:number) => {
    return payments.refundDeposit(txID);
}
const freezeContract = () => {
    return payments.freezeContract();
}
const withdrawDeposits = () => {
    return payments.withdrawDeposits();
}

export default {
    createTransaction,
    acceptTransaction,
    cancelTransaction,
    getUserTransactionsCount,
    getUserTransactionByID,
    //getAllUserTransactions,
    getTransactionStatus,
    releaseDeposit,
    refundDeposit,
    freezeContract,
    withdrawDeposits,
}

