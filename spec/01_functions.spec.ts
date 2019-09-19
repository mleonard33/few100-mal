import { isEven, formatter, identity, jesseDecorator } from './utils';

describe('functions', () => {
    describe('parameters to functions', () => {
        it('overloading in JavaScript', () => {
            function formatName(first: string, last: string, mi?: string): string {
                let fullName = `${last}, ${first}`;
                if (mi) {
                    fullName += ` ${mi}.`;
                }
                return fullName;
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        describe('returning stuff', () => {
            it('returning multiple things OOP style', () => {
                function formatName(first: string, last: string, mi?: string): { fullName: string, characters: number } {
                    let fullName = `${last}, ${first}`;
                    if (mi) {
                        fullName += ` ${mi}.`;
                    }
                    return {
                        fullName,
                        characters: fullName.length
                    };
                }

                const result = formatName('Han', 'Solo');
                expect(result.fullName).toBe('Solo, Han');
                expect(result.characters).toBe(9);

                // Object Destructuring

                // call interface and get fullName from the interface
                const { fullName } = formatName('Luke', 'Skywalker');
                expect(fullName).toBe('Skywalker, Luke');

                // call interface and get fullName from the interface and assign it to variable fn
                const { fullName: fn } = formatName('Luke', 'Skywalker');
                expect(fn).toBe('Skywalker, Luke');
            });
            it('returning multiple things functional style', () => {
                function formatName(first: string, last: string, mi?: string): [string, number] {
                    let fullName = `${last}, ${first}`;
                    if (mi) {
                        fullName += ` ${mi}.`;
                    }
                    return [fullName, fullName.length];
                }

                const result = formatName('Han', 'Solo');
                expect(result[0]).toBe('Solo, Han');
                expect(result[1]).toBe(9);

                // Array Destructuring
                const [fn, jesse] = formatName('Luke', 'Skywalker');
                expect(fn).toBe('Skywalker, Luke');
                expect(jesse).toBe(15);
            });
            it('fun with array destructuring', () => {
                const numbers = [1, 2, 3, 4, 5];

                const [first, , tacos] = numbers;

                expect(first).toBe(1);
                expect(tacos).toBe(3);

                const [head, ...tail] = numbers;
                expect(head).toBe(1);
                expect(tail).toEqual([2, 3, 4, 5]);
            });
            it('fun with object destructuring', () => {

                const employee = {
                    firstName: 'Sue',
                    lastName: 'Smith',
                    job: 'DEV',
                    lastPayChecks: [23_500, 22_800, 18_123]
                };


                // Your one line of code goes here.  Property name is lastName and new variable is last
                const { job, lastName: last } = employee;

                expect(last).toBe('Smith');
                expect(job).toBe('DEV');
            });
            it('adding some numbers', () => {
                //  the ...rest is everything else that is passed in
                function add(a: number = 20, b: number = 10, ...rest: number[]) {
                    const firstTwo = a + b;
                    return rest.reduce((s, n) => s + n, firstTwo);
                }

                expect(add(2, 2)).toBe(4);
                expect(add(2)).toBe(12);
                expect(add()).toBe(30);
                expect(add(undefined, 5)).toBe(25);
                expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });
        });
    });
    describe('array methods', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('you can do something with each of these', () => {
            numbers.forEach((n) => console.log(n));
        });
        describe('array methods that return something back t you - like another array', () => {
            it('you can create a new array using filter', () => {

                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);
            });
            it('create an array of mutated elements', () => {

                const doubled = numbers.map(n => n * 2);
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
            });
            it('your test - make this work', () => {
                // your single statement here
                const doubledEvens = numbers.filter(isEven)
                    .map(n => n * 2);
                expect(doubledEvens).toEqual([4, 8, 12, 16]);
            });
            it('return a single value - checking membership', () => {

                const allEven = numbers.every(isEven);
                expect(allEven).toBe(false);

                const someEven = numbers.some(isEven);
                expect(someEven).toBe(true);
            });
            //  Take an array of things and reduce it down
            it('boiling an array down to a single value', () => {
                const total = numbers.reduce((c, n) => c + n);
                expect(total).toBe(45);

                const total2 = numbers.reduce((c, n) => c + n, 100);
                expect(total2).toBe(145);
            });
        });
    });
    describe('some more higher order functions', () => {
        describe('a function that takes a function as an argument', () => {
            it('a kind of decorator', () => {
                const response = formatter('Hello World!', identity);
                expect(response).toBe('HELLO_WORLD!');

                const response2 = formatter('Hello World!');
                expect(response2).toBe('HELLO_WORLD!');

                const jesseresponse = formatter('Hello World!', (s) => `***${s}***`);
                expect(jesseresponse).toBe('***HELLO_WORLD!***');

                const bangSurround = jesseDecorator('!');
                const jr2 = formatter('Hello World!', bangSurround);
                expect(jr2).toBe('!!!HELLO_WORLD!!!!');

                const jr3 = formatter('Hello World!', jesseDecorator('@'));
                expect(jr3).toBe('@@@HELLO_WORLD!@@@');
            });
        });
        describe('making elements with various techniques', () => {
            it('straight-ahead procedural programming', () => {

                function tagMaker(tag: string, content: string) {
                    return `<${tag}>${content}</${tag}>`;
                }

                expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(tagMaker('h1', 'Dog')).toBe('<h1>Dog</h1>');
                expect(tagMaker('h1', 'Cat')).toBe('<h1>Cat</h1>');
                expect(tagMaker('p', 'Mouse')).toBe('<p>Mouse</p>');
            });
            it('doing it with objects', () => {

                class TagMaker {


                    constructor(private tag: string) { }

                    make(content: string) {
                        return `<${this.tag}>${content}</${this.tag}>`;
                    }

                }
                const h1Maker = new TagMaker('h1');
                const pMaker = new TagMaker('p');


                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker.make('Dog')).toBe('<h1>Dog</h1>');
                expect(h1Maker.make('Cat')).toBe('<h1>Cat</h1>');
                expect(pMaker.make('Mouse')).toBe('<p>Mouse</p>');

            });
            it('a functional approach', () => {

                function tagMaker(tag: string) {
                    return (content: string) => `<${tag}>${content}</${tag}>`;
                }

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker('Dog')).toBe('<h1>Dog</h1>');
                expect(h1Maker('Cat')).toBe('<h1>Cat</h1>');
                expect(pMaker('Mouse')).toBe('<p>Mouse</p>');
                expect(tagMaker('h2')('Tacos')).toBe('<h2>Tacos</h2>');
            });
        });
    });
});
