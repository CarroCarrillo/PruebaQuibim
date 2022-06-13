import { EventType } from "./EventType";

export class Birth extends EventType {
    
    constructor(birth: Partial<Birth>) {
        super(birth, 'Birth');
    }
    
}