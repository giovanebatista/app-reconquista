// Sistema de autenticação simplificado
// Em produção, integrar com Firebase Auth ou similar

export interface User {
  id: string;
  email: string;
  name?: string;
  provider: 'google' | 'email' | 'guest' | 'admin';
  isAdmin?: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}

// Credenciais admin (hardcoded para desenvolvimento)
const ADMIN_CREDENTIALS = {
  email: 'admin@codigomasculino.com',
  password: 'Codigo2025!',
};

export class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  // Login com Google (simulado - integrar com Google OAuth)
  async loginWithGoogle(): Promise<User> {
    // Em produção, usar Google OAuth
    // Por enquanto, simular
    const user: User = {
      id: crypto.randomUUID(),
      email: 'user@gmail.com',
      name: 'Usuário Google',
      provider: 'google',
      createdAt: new Date(),
    };
    
    this.saveUser(user);
    return user;
  }
  
  // Login com Magic Link (simulado - integrar com serviço de email)
  async sendMagicLink(email: string): Promise<boolean> {
    // Em produção, enviar email com link único
    // Por enquanto, simular sucesso
    console.log(`Magic link enviado para ${email}`);
    return true;
  }
  
  async verifyMagicLink(token: string): Promise<User> {
    // Em produção, verificar token
    // Por enquanto, simular
    const user: User = {
      id: crypto.randomUUID(),
      email: 'user@email.com',
      provider: 'email',
      createdAt: new Date(),
    };
    
    this.saveUser(user);
    return user;
  }
  
  // Login como Guest
  createGuestUser(): User {
    const user: User = {
      id: 'guest-' + Date.now(),
      email: 'guest@temp.com',
      provider: 'guest',
      createdAt: new Date(),
    };
    
    this.saveUser(user);
    return user;
  }
  
  // Login Admin
  async loginAdmin(email: string, password: string): Promise<User | null> {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user: User = {
        id: 'admin-001',
        email: ADMIN_CREDENTIALS.email,
        name: 'Administrador',
        provider: 'admin',
        isAdmin: true,
        createdAt: new Date(),
      };
      
      this.saveUser(user);
      return user;
    }
    
    return null;
  }
  
  // Salvar usuário no localStorage
  private saveUser(user: User): void {
    localStorage.setItem('codigomasculino_auth', JSON.stringify(user));
  }
  
  // Carregar usuário do localStorage
  loadUser(): User | null {
    const saved = localStorage.getItem('codigomasculino_auth');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  }
  
  // Logout
  logout(): void {
    localStorage.removeItem('codigomasculino_auth');
    localStorage.removeItem('codigomasculino_user');
  }
  
  // Verificar se é guest
  isGuest(user: User | null): boolean {
    return user?.provider === 'guest';
  }
  
  // Verificar se é admin
  isAdmin(user: User | null): boolean {
    return user?.isAdmin === true;
  }
  
  // Verificar se tem acesso a conteúdo
  hasContentAccess(user: User | null, lessonId: number): boolean {
    // Admin tem acesso total
    if (this.isAdmin(user)) return true;
    
    // Guest só tem acesso à aula 1
    if (this.isGuest(user)) return lessonId === 1;
    
    // Usuários autenticados precisam de assinatura ativa
    // (verificar no AppContext)
    return true;
  }
}

export const authService = AuthService.getInstance();
