import { WhileType } from "./WhileType";

export class UndefinedType extends WhileType {

    private static instance: UndefinedType = null;

    private constructor() {
        super();
    }

    public static getInstance(): UndefinedType {
        if (UndefinedType.instance == null) {
            UndefinedType.instance = new UndefinedType();
        }
        return UndefinedType.instance;
    }

    public coerce(targetType:WhileType):boolean{
        return false;
    }

}