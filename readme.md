## issue description

This repo aims to demonstrate an issue in Typescript.
Where TS treat differently private members of a class when reading the type from a ts file
vs reading it from a `d.ts` file (which were generated from that ts file).

## running the project

// root folder
```
npm install 
```

// working
```
cd working
npm run compile
```

// non-working
```
cd non-working
npm run compile
```
You will see the following error
```
comp1/index.ts:9:9 - error TS2322: Type 'import("/Users/giladshoham/dev/temp/ts-bug/non-working/comp2/node_modules/person/dist/index").Person' is not assignable to type 'import("/Users/giladshoham/dev/temp/ts-bug/non-working/comp1/node_modules/person/index").Person'.
  Types have separate declarations of a private property 'fullName'.

9   const person: Person = fetchPerson();
          ~~~~~~
```

## explanation

in both working and non-working there is the same code.
A very simple 2 components: `comp1` and `comp2`.

* comp2 - has a `fetchPerson` which return an instance of `Person` hard coded.
* comp1 - calls `fetchPerson` from comp2 and send it to a `printName` function which expect to get a `Person`.

Person looks like this
```ts
export type Name = {
  first: string,
  last: string
}
export class Person {
  constructor (public nickname: string, private fullName: Name){}
}
```
The difference between working and non-working is:
in the `non-working` under `comp1/node_modules/person` we have in the `package.json` (`comp1/node_modules/person/package.json`)
the following:
```
"types": "index.ts",
```
but in comp2 we do have d.ts file for person (`comp2/node_modules/person/dist/index.d.ts`).

In both working and non-working folders, comp1 and comp2 each have their own person in the inner node_modules (to make sure it's not a problem of different instances).
The only diff between the folders is whether person types are based on the d.ts or 
based on the index.ts file using the `types: index.ts` in `package.json`

The code for comp1, comp2, person is identical in all cases.

I would expect TS to treat the d.ts file and the ts file which used to generate this d.ts the same way.

## File Structure
```
.
├── non-working
│   ├── comp1
│   │   ├── index.ts
│   │   └── node_modules
│   │       └── person
│   │           ├── dist
│   │           │   ├── index.d.ts
│   │           │   └── index.js
│   │           ├── index.ts
│   │           └── package.json
│   ├── comp2
│   │   ├── index.ts
│   │   └── node_modules
│   │       └── person
│   │           ├── dist
│   │           │   ├── index.d.ts
│   │           │   └── index.js
│   │           ├── index.ts
│   │           └── package.json
│   ├── package.json
│   └── tsconfig.json
├── package-lock.json
├── package.json
├── person
│   ├── dist
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── readme.md
└── working
    ├── comp1
    │   ├── index.ts
    │   └── node_modules
    │       └── person
    │           ├── dist
    │           │   ├── index.d.ts
    │           │   └── index.js
    │           ├── index.ts
    │           └── package.json
    ├── comp2
    │   ├── index.ts
    │   └── node_modules
    │       └── person
    │           ├── dist
    │           │   ├── index.d.ts
    │           │   └── index.js
    │           ├── index.ts
    │           └── package.json
    ├── package.json
    └── tsconfig.json
```

## Compile person 
If you want to generate js and d.ts files of person just go into the person folder and run compile.

## Notes
In order to make the setup for repo as easy is possible, the internal node_modules of comp1 and comp2 (which only contains person code), are committed to git.
So you only need to run `npm install` in the root to get typescript installed
