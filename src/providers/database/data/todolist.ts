
export class ToDoModel {
    constructor(
        public title: string,
        public start: string,
        public end: string,
        public remaining:string,
        public isChecked:boolean
    ) { }
}