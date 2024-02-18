type PatternName = 
| "ALPHANUMERIC" 
| "CONTAINS" 
| "EMAIL" 
| "CUSTOM" 
| "DATE" 
| "NUMERIC" 
| "PHONE_NUMBER" 
| "URL"
| "UPPERCASE"
| "LOWERCASE"
| "HEX_COLOR"
| "CREDIT_CARD_NUMBER";

export type Validator = {
  name: PatternName;
  pattern: string | RegExp;
  rule: RegExp;
};

export type Rule = Omit<Validator , 'rule'>;