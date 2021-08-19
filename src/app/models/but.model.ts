import { Match } from "./match.model";

export class But {
    id: string;
    minute = 0;
    penalty = false;

    constructor(match: Match, minute: number, butDePlus?: string) {
        this.id = match.id + minute;
        this.minute = minute;
        if (butDePlus) {
            this.id = this.id + 'plus'
        }
    }
}