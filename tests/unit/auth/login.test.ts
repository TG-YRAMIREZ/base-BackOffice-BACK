import { AuthService } from '../../services/auth/auth.service';

describe('AuthService - HU BO-4 Governance', () => {
  it('Debe retornar los 15 permisos para el administrador del seed', async () => {
    const email = 'admin@provident.com.mx';
    const sub = 'local_0hD3g3ox';
    const name = 'Admin Test';

    const result = await AuthService.executeLogin(email, sub, name);

    expect(result).not.toBeNull();
    expect(result?.permissions).toContain('USER_ADMIN');
    expect(result?.permissions.length).toBeGreaterThanOrEqual(15);
  });

  it('Debe retornar null si el usuario no existe (403)', async () => {
    const result = await AuthService.executeLogin('fake@provident.com.mx', '123', 'Fake');
    expect(result).toBeNull();
  });
});