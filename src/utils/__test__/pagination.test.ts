import { getRecordRange } from '../pagination';

describe('getRecordRange', () => {
  it('should return correct range for page within total records', () => {
    const result = getRecordRange(2, 10, 50);
    expect(result).toBe('11 - 20');
  });

  it('should return correct range for the last page when total records are less than pageSize', () => {
    const result = getRecordRange(5, 10, 45);
    expect(result).toBe('41 - 45');
  });

  it('should return correct range for the first page', () => {
    const result = getRecordRange(1, 10, 50);
    expect(result).toBe('1 - 10');
  });

  it('should return "1 - 0" when there are no records', () => {
    const result = getRecordRange(1, 10, 0);
    expect(result).toBe('1 - 0');
  });

  it('should return the correct range when the last page has fewer records than pageSize', () => {
    const result = getRecordRange(3, 10, 25);
    expect(result).toBe('21 - 25');
  });

  it('should return correct range for pages when total records exactly match pageSize', () => {
    const result = getRecordRange(5, 10, 50);
    expect(result).toBe('41 - 50');
  });

  it('should handle single record case correctly', () => {
    const result = getRecordRange(1, 10, 1);
    expect(result).toBe('1 - 1');
  });
});
