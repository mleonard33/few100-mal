describe('immutability', () => {
    it('with arrays', () => {
        const numbers = [2, 3, 4, 5];

        const newNumbers = [1, ...numbers, 6];
        expect(newNumbers).toEqual([1, 2, 3, 4, 5, 6]);
        expect(numbers).toEqual([2, 3, 4, 5]);
    });
    it('removing an item from an array', () => {
        const numbers = [2, 3, 4, 5];
        const newNumbers = numbers.filter(n => n !== 4);
        expect(newNumbers).toEqual([2, 3, 5]);
        expect(numbers).toEqual([2, 3, 4, 5]);
    });
    it('do some stuff with objects', () => {

        interface Employee {
            id: string;
            firstName: string;
            lastName: string;
            department: string;
        }

        const bob: Employee = {
            id: '99',
            firstName: 'Robert',
            lastName: 'Smith',
            department: 'Guitar. And Crying'
        };

        // bob.department = 'DEV';
        const newBob = { ...bob, department: 'DEV' };

        expect(newBob).toEqual({
            id: '99',
            firstName: 'Robert',
            lastName: 'Smith',
            department: 'DEV'
        });
    });
});