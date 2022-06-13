import { EventGroup } from "./EventGroup";

export class HistoryDate {
    date: string;
    url: string;
    data: EventGroup;

    constructor(date: string, url: string, data: EventGroup) {
        this.date = date;
        this.url = url;
        this.data = data;
    }
}