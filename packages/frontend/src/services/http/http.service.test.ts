import { getBackendUrl } from './http.service';

describe('http service', () => {
  it('should get the correct backend url', async () => {
    // expect(
    //   getBackendUrl({ baseUrl: 'http://localhost:3000', port: '3000' }),
    // ).toBe('http://localhost:3001');
    expect(getBackendUrl({ baseUrl: 'https://www.ynet.co.il', port: '' })).toBe(
      'https://www.ynet.co.il:3001',
    );
  });
});
