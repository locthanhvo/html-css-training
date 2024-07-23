import * as api from '../api';

const mockResponse = [
  {
    id: 1,
    name: 'John Smith',
    isAdmin: false,
  },
];

describe('Testing api', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Get users list', async () => {
    const response = await api.apiRequest(
      'GET',
      'https://example.com/api/data',
    );
    expect(response).toEqual(mockResponse);
  });

  it('Create a new user', async () => {
    const response = await api.apiRequest(
      'POST',
      'https://example.com/api/data',
      {
        ...mockResponse,
      },
    );
    expect(response).toEqual(mockResponse);
  });

  it('Update a user', async () => {
    const response = await api.apiRequest(
      'PATCH',
      'https://example.com/api/data',
      {
        ...mockResponse,
      },
    );
    expect(response).toEqual(mockResponse);
  });

  it('Remove a user', async () => {
    const response = await api.apiRequest(
      'DELETE',
      'https://example.com/api/data/1',
    );
    expect(response).toEqual(mockResponse);
  });
});
