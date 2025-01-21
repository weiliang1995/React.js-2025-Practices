type Person = {
  name: string;
  age: number;
}

let person: Person

let people: Person[] = [
  { name: "John", age: 30 },
];
let course: string | any = 'React - The Complete Guide';

course = 12345
course = true

function subtract(a: number,b: number) {
  return a - b;

}

function print(value: any) {
  console.log(value);
}

function insertAtBeginning<T>(array:T[],value:T){
  const newArray = [value, ...array];
  return newArray;
}