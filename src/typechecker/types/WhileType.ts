
export abstract class WhileType {

    public toString():string{
        return `${this.constructor.name}`;
    }

    public coerce(targetType:WhileType):boolean{
        return targetType === this;
    }
 }
