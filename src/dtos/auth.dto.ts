export interface LoginResponseDto {
  user: {
    userId: string;
    email: string;
    fullName: string;
    lastLogin: Date | null;
  };
  permissions: string[]; // Ej: ['USER_ADMIN', 'DOC_INE', 'EXP_SEARCH']
  accessToken: string; 
}