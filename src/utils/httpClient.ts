import { Client } from 'undici';

// Cliente optimizado para las llamadas a Cognito Mock
const cognitoClient = new Client('http://localhost:9229');

export async function getJwks() {
  const { body } = await cognitoClient.request({
    path: '/.well-known/jwks.json',
    method: 'GET'
  });
  return await body.json();
}