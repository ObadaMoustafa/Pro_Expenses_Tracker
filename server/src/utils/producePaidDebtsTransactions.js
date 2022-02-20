export function producePaidDebtsTransactions(userDebts) {
  const allPaidDebtsTransactions = [];
  if (userDebts.length > 0) {
    userDebts.map((debt) =>
      debt.payHistory.forEach((transaction) => {
        allPaidDebtsTransactions.push({
          title: debt.title,
          date: transaction.date,
          amount: transaction.amount,
          _id: transaction._id,
        });
      })
    );

    allPaidDebtsTransactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  return allPaidDebtsTransactions;
}
