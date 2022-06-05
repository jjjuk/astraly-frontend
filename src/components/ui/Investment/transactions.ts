import { addDays } from 'date-fns'

export const transactions = [
  {
    action: 'Deposit LP',
    date: new Date(),
    transactionId: '0',
  },
  {
    action: 'Withdraw LP',
    date: addDays(new Date(), -1),
    transactionId: '0',
  },
  {
    action: 'Swap Tokens',
    date: addDays(new Date(), -5),
    transactionId: '0',
  },
  {
    action: 'Deposit LP',
    date: addDays(new Date(), -5),
    transactionId: '0',
  },
  {
    action: 'Withdraw LP',
    date: addDays(new Date(), -11),
    transactionId: '0',
  },
  {
    action: 'Withdraw LP',
    date: addDays(new Date(), -12),
    transactionId: '0',
  },
  {
    action: 'Deposit LP',
    date: addDays(new Date(), -20),
    transactionId: '0',
  },
]
