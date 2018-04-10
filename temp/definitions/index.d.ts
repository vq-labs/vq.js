declare class SingletonClass {
    private static _instance;
    private _score;
    constructor();
    static getInstance(): SingletonClass;
    setScore(value: number): void;
    getScore(): number;
    addPoints(value: number): void;
    removePoints(value: number): void;
}
declare var scoreManager: SingletonClass;
