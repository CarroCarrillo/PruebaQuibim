import { Birth } from "./Birth";
import { Death } from "./Death";
import { Event } from "./Event";

export class EventGroup {

    Births: Birth[];
    Events: Event[];
    Deaths: Death[];

    constructor(births: Birth[], events: Event[], deaths: Death[]) {
        this.Births = births;
        this.Events = events;
        this.Deaths = deaths;
    }
}