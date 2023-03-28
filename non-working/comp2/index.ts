import { Person } from 'person';

export function fetchPerson(): Person{
  return new Person('John', {first: 'John', last: 'Doe'});
}