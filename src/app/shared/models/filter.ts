export class Filter {
    // if papers, send back papers with questions included
    paper: boolean;
    // if lesson, send back lessons
    lesson: boolean;
    difficulties?: number[];
    includeCompleted: boolean;
    includeAllKeywords: boolean;

    public Filter() {
        this.paper = false;
        this.lesson = false;
        this.difficulties = null;
        this.includeCompleted = false;
        this.includeAllKeywords = false;
    }
}
