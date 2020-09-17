# challenge

## Setup

```sh
yarn
```

or

```sh
npm install
```

## Running the app

```sh
yarn start
```

or

```sh
npm start
```

## Entities Challenge
### Create a branch with your name
1. Update books.reducers to use EntityState to define State
2. Create an unsorted entity adapter for State and use it to initialize initialState
3. Update the reducer to use adapter methods
4. Use the adapter to replace the selectAll selector and to create a selectEntities selector
5. Update the selectActiveBool selector to use the selectEntities selector instead of the selectAll selector

## Form Challenge
### Create a branch with your name
1. Update The Book Model and create a property called "ref"
2. Add a field named "ref" to the form (html/ts)
3. Create a async validator called referenceValidator to check if reference already exist
(use bookService checkReference method)
4. Add the Async validator to the "ref" field

