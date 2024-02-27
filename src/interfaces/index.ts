import { Validator } from "../types";

export interface OptionsRule {
  getRule: () => Omit<Validator, "name">;
}
