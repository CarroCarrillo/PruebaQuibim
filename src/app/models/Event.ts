import { EventType } from "./EventType";

export class Event extends EventType {
    
    constructor(event: Partial<Event>) {
        super(event, 'Event');
    }
    
}