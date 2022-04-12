import { Account } from "./account.model"

export interface GroupedAccounts {
    CashAndInvestments: Array<Account>;
    LongTermAssets: Array<Account>;
    LongTermDebt: Array<Account>;
    ShortTermLiabilities: Array<Account>;
}
