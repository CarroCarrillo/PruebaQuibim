import { EventType } from "./EventType";

export class Death extends EventType {
    
    constructor(death: Partial<Death>) {
        super(death, 'Death');
    }
    
}