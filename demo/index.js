let web3;
let payments;
let vq;
let accounts;

function init(cb) {

    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    payments = new web3.eth.Contract(abi, "0x345ca3e014aaf5dca488057592ee47305d9b3e10");
    
    web3.eth.getAccounts()
    .then(_accounts => {
        vq = {
            payments: {
                accounts: _accounts,
                createTransaction: (payer, amount, payee, manager, ref) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .createTransaction(payee, manager, web3.utils.toHex(ref))
                        .estimateGas({
                            from: payer,
                            value: amount
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .createTransaction(payee, manager, web3.utils.toHex(ref))
                                .send({
                                    from: payer,
                                    value: amount,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ),
                /* acceptTransaction: (payee, txID) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .acceptTransaction(txID)
                        .estimateGas({
                            from: payee
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .acceptTransaction(txID)
                                .send({
                                    from: payee,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ),
                cancelTransaction: (payer, txID) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .cancelTransaction(txID)
                        .estimateGas({
                            from: payer,
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .cancelTransaction(txID)
                                .send({
                                    from: payer,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ),
                getUserTransactionsCount: (user, userType) => new Promise(
                    (resolve, reject) => {
                        payments
                            .methods
                            .getUserTransactionsCount(user, userType)
                            .call()
                            .then((result) => {
                                resolve(result);
                            })
                            .catch(error => reject(error))
                    }
                ),
                getUserTransactionByID: (user, userType, txID) => new Promise(
                    (resolve, reject) => {
                        payments
                            .methods
                            .getUserTransactionByID(user, userType, txID)
                            .call()
                            .then((result) => {
                                resolve(result);
                            })
                            .catch(error => reject(error))
                    }
                ), */
                /* getAllUserTransactions: (user, userType, offset, limit) => new Promise(
                    (resolve, reject) => {
                        payments
                            .methods
                            .getAllUserTransactions(user, userType, offset, limit)
                            .call()
                            .then((result) => {
                                resolve(result);
                            })
                            .catch(error => reject(error))
                    }
                ), */
                /* getTransactionStatus: (user, userType, txID) => new Promise(
                    (resolve, reject) => {
                        payments
                            .methods
                            .getTransactionStatus(user, userType, txID)
                            .call({})
                            .then((result) => {
                                resolve(result);
                            })
                            .catch(error => reject(error))
                    }
                ),
                releaseDeposit: (payer, txID) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .releaseDeposit(txID)
                        .estimateGas({
                            from: payer
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .releaseDeposit(txID)
                                .send({
                                    from: payer,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ),
                refundDeposit: (payee, txID) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .refundDeposit(txID)
                        .estimateGas({
                            from: payee
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .refundDeposit(txID)
                                .send({
                                    from: payee,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ),
                withdrawDeposits: (user) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .withdrawDeposits()
                        .estimateGas({
                            from: user,
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .withdrawDeposits()
                                .send({
                                    from: user,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ),
                freezeContract: (owner) => new Promise(
                    (resolve, reject) => {
                        payments
                        .methods
                        .freezeContract()
                        .estimateGas({
                            from: owner
                        })
                        .then(estimatedGas => {
                            payments
                                .methods
                                .freezeContract()
                                .send({
                                    from: owner,
                                    gas: Math.floor(estimatedGas)
                                })
                                .on('transactionHash', function(hash){
                                    //Placeholder
                                })
                                .on('confirmation', function(confirmationNumber, receipt){
                                    //Placeholder
                                })
                                .on('receipt', function(receipt){
                                    //return receipt
                                    return resolve(receipt);
                                })
                                .on('error', (error, receipt) => {
                                    // If there's an out of gas error the second parameter is the receipt.
                                    return reject(error, receipt);
                                }); 
                        });
                    }
                ) */
            }
        }

        cb();
    });
}

init();


function test() {
        
    const transactionMock = {
        OWNER: vq.payments.accounts[0],
        PAYER: vq.payments.accounts[1],
        PAYEE: vq.payments.accounts[2],
        MANAGER: vq.payments.accounts[3],
        AMOUNT: web3.utils.toWei("1", "ether"),
        REF: "test"
    }

    //Create a transaction from PAYER to PAYEE
    vq
    .payments
    .createTransaction(transactionMock.PAYER, transactionMock.AMOUNT, transactionMock.PAYEE, transactionMock.MANAGER, transactionMock.REF)
    .then(tx => {
        const transactionID = 0;
        //Accept the transaction as PAYEE
        vq
        .payments
        .acceptTransaction(transactionMock.PAYEE, transactionID)
        .then(tx2 => {
            //Release the transaction as PAYER            
            /* vq.payments.getUserTransactionByID(transactionMock.PAYER, 0, transactionID).then((transaction) => {
                console.log('transaction', transaction)
            })
            .catch(test => console.log('ERRRRRR', test)) */
/*
            vq
            .payments
            .releaseDeposit(transactionMock.PAYER, transactionID)
            .then(tx3 => {
                //Withdraw deposits as PAYEE
                payments.methods.Deposits(vq.payments.accounts[2]).call().then(deposits => {
                    console.log('deposits', deposits)
                })
                vq
                .payments
                .withdrawDeposits(transactionMock.PAYEE)
                .then(tx4 => {
                    console.log('WITHDRAWN');
                });
            }); */
        });
    });

    /* //Create a transaction from PAYER to PAYEE
    vq
    .payments
    .createTransaction(transactionMock.PAYER, transactionMock.AMOUNT, transactionMock.PAYEE, transactionMock.MANAGER, transactionMock.REF)
    .then(tx => {
        const transactionID = 1;
        //Cancel the transaction as PAYER
        vq
        .payments
        .cancelTransaction(transactionMock.PAYER, transactionID)
        .then(tx2 => {
            console.log('CANCELLED');
        });
    }); */
}




