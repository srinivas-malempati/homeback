export type AdvisorType = "home" | "finance" | "ship" | "car";

export interface AIState {
  loading: boolean;
  result: string | null;
  error: string | null;
}

export interface HomeForm {
  type: string; beds: string; buy: string;
  val: string; yrs: string; pri: string; city: string;
}
export interface FinanceForm {
  bal401: string; age: string; income: string;
  status: string; ira: string; stocks: string;
}
export interface ShipForm {
  family: string; size: string; furn: string; elec: string;
}
export interface CarForm {
  year: string; make: string; model: string; miles: string; cond: string;
}
