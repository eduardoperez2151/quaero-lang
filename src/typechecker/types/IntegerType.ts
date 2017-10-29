import { WhileType } from "./WhileType";
import { NumericalType } from "./NumericalType";

export class IntegerType extends WhileType {

    private static instance: IntegerType = null;

    private constructor() {
        super();
    }

    public static getInstance(): IntegerType {
        if (IntegerType.instance == null) {
            IntegerType.instance = new IntegerType();
        }
        return IntegerType.instance;
    }

    public coerce(targetType: WhileType): boolean {
        return super.coerce(targetType) || this.isNumerical(targetType);
    }

    protected isNumerical(type:WhileType):boolean{
        return type instanceof NumericalType;
    }

}