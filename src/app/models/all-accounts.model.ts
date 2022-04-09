import { Account } from "./account.model";

export interface AllAccounts {
    cashAndInvestments: Array<Account>;
    longTermAssets: Array<Account>;
    shortTermLiabilities: Array<Account>;
    longTermDebt: Array<Account>;
}
