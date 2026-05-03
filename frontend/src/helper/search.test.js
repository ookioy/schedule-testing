import { search } from './search';
import { GROUPED } from '../constants/common';

// Arrange (Global)
const items = [
    {
        id: 101, 
        name: '1 к. 19 аудиторія',
        type: {
            description: 'Практична',
        },
        grouped: true,
    },
    {
        id: 202,
        name: '1 к. 21 ауд.',
        type: {
            description: 'Лекційна',
        },
        grouped: false,
    },
];

const term = 'аудиторія';
const deepTerm = 'Лекційна';
const arr = ['name', 'type.description', 'id']; 
const excludeTerm = 'exclude9012';

describe('behavior of search function', () => {
    describe('Original tests', () => {
        test('shows all items if search term length === 0', () => {
            expect(search(items, '', arr)).toHaveLength(items.length);
        });

        test('shows items which include search term', () => {
            expect(search(items, term, arr)).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ name: expect.stringContaining(term) }),
                ]),
            );
        });

        test('shows items which include search term equal "групова"', () => {
            expect(search(items, GROUPED, arr)).toEqual(
                expect.arrayContaining([expect.objectContaining({ grouped: true })]),
            );
        });

        test('it shows items which include search term in deep object', () => {
            expect(search(items, deepTerm, arr)).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: expect.objectContaining({
                            description: expect.stringContaining(deepTerm),
                        }),
                    }),
                ]),
            );
        });

        test('it does not show items which exclude search term', () => {
            expect(search(items, excludeTerm, arr)).toEqual(
                expect.not.arrayContaining([
                    expect.objectContaining({ name: expect.stringContaining(excludeTerm) }),
                ]),
            );
        });
    });

    describe('Edge cases and New scenarios', () => {
        test('should trim spaces from the search term (start and end)', () => {
            // Arrange
            const termWithSpaces = '   аудиторія   ';
            // Act
            const result = search(items, termWithSpaces, arr);
            // Assert
            expect(result).toHaveLength(1);
            // expect(result[0].name).toContain('аудиторія');
        });

        test('should be case-insensitive during search', () => {
            // Arrange
            const upperCaseTerm = 'ЛЕКЦІЙНА';
            // Act
            const result = search(items, upperCaseTerm, arr);
            // Assert
            expect(result).toHaveLength(1);
            // expect(result[0].type.description).toBe('Лекційна');
        });

        test('should handle numeric values in fields correctly', () => {
            // Arrange
            const numericTerm = '101';
            // Act
            const result = search(items, numericTerm, arr);
            // Assert
            expect(result).toHaveLength(1);
            // expect(result[0].id).toBe(101);
        });

        test('should return empty array if searching by non-existent field', () => {
            // Arrange
            const nonExistentArr = ['wrongField'];
            const searchFor = 'Практична';
            // Act
            const result = search(items, searchFor, nonExistentArr);
            // Assert
            expect(result).toHaveLength(0);
            // expect(result).toEqual([]);
        });

        test('should return empty array if items array is empty', () => {
            // Arrange
            const emptyItems = [];
            const searchFor = 'аудиторія';
            // Act
            const result = search(emptyItems, searchFor, arr);
            // Assert
            expect(result).toEqual([]);
        });

        test('should return all items when search term is only spaces', () => {
            // Arrange - only spaces should be trimmed to empty string
            const termOnlySpaces = '     ';
            // Act
            const result = search(items, termOnlySpaces, arr);
            // Assert - should return all items due to empty term after trim
            expect(result).toHaveLength(items.length);
            // Verify it returns the exact same array reference (early return)
            expect(result).toBe(items);
        });

        test('should handle nested fields with missing parent object safely', () => {
            // Arrange - item with missing intermediate object
            const itemsMissingParent = [
                {
                    id: 301,
                    name: 'Test Item',
                    // missing 'type' object
                },
                ...items,
            ];
            const searchFields = ['type.description', 'name'];
            // Act - should not crash even though type object doesn't exist
            const result = search(itemsMissingParent, 'Test', searchFields);
            // Assert - should find the item by name
            expect(result).toContainEqual(expect.objectContaining({ name: 'Test Item', id: 301 }));
            expect(result.length).toBeGreaterThan(0);
        });
    });
});
