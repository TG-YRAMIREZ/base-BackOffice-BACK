import { MockAgent, setGlobalDispatcher } from 'undici';

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);

const mockPool = mockAgent.get('https://adfs.provident.com.mx');

describe('Auth Service', () => {
  it('debe validar el token usando el JWKS externo', async () => {
    mockPool.intercept({ 
      path: '/.well-known/jwks.json',
      method: 'GET' 
    }).reply(200, { keys: [] });
  });
});