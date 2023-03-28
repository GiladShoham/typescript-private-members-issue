import {fetchPerson} from '../comp2';
import type { Person } from 'person';

export function printName(person: Person){
  console.log(person.nickname)
}

export function mainFunc(){
  const person: Person = fetchPerson();
  printName(person);
}

mainFunc();