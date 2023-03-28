export type Name = {
    first: string;
    last: string;
};
export declare class Person {
    nickname: string;
    private fullName;
    constructor(nickname: string, fullName: Name);
}
