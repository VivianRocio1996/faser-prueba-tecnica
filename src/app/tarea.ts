export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        public destacada: boolean = false // Indica si la tarea es destacada, por defecto es false
    ){}
}