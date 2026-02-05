export interface CreateUserDto {
  email: string;
  modules: string[]; 
  documentPermissions?: string[];
  canDownloadPii: boolean;
}