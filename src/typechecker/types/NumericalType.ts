import { WhileType } from "./WhileType";

export class NumericalType extends WhileType {

    private static instance: NumericalType = null;

    private constructor() {
        super();
    }

    public static getInstance(): NumericalType {
        if (NumericalType.instance == null) {
            NumericalType.instance = new NumericalType();
        }
        return NumericalType.instance;
    }

}