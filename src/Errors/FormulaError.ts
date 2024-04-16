export class FormulaError extends Error{
    formula?: string;
    /**
     *
     */
    constructor(message:string, formula?: string) {
        super(message);
        this.formula = formula;
    }
}