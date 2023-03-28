import { Person } from 'person';
export function fetchPerson() {
    return new Person('John', { first: 'John', last: 'Doe' });
}
