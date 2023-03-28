import { fetchPerson } from '../comp2';
export function printName(person) {
    console.log(person.nickname);
}
export function mainFunc() {
    const person = fetchPerson();
    printName(person);
}
mainFunc();
