export class User {

    constructor(
        public username: string,
        public age: number,
        public email: string,
        public password: string,
        public createdAt: Date,
        public id?: string
    ) {}
}