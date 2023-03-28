export type Name = {
  first: string,
  last: string
}
export class Person {
  constructor (public nickname: string, private fullName: Name){}
}