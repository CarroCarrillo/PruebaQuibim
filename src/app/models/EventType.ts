import { Link } from "./Link";

export abstract class EventType {

    year: string;
    text: string;
    html: string;
    no_year_html: string;
    links: Link[];
    type: string;

    constructor(eventType: Partial<EventType>, type: string) {
        if (eventType) {
            Object.assign(this, eventType);
        }
        this.type = type;
    }

}