import { Injectable } from '@angular/core';
import { AxiosService } from './axios-service';

export interface EmployeeDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  registrationDate?: string;
  phone: string;
}

export interface EmployeeRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: AxiosService) { }

  async createEmployee(payload: EmployeeRegisterDto): Promise<EmployeeDto> {
    const response = await this.http.request<EmployeeDto>('POST', '/employees', payload);
    return response.data;
  }

  async updateEmployee(employeeDto: EmployeeDto): Promise<EmployeeDto> {
    const response = await this.http.request<EmployeeDto>('PUT', `/employees/${employeeDto.id}`, employeeDto);
    return response.data;
  }

  async getAllEmployees(): Promise<EmployeeDto[]> {
    const response = await this.http.request<EmployeeDto[]>('GET', '/employees');
    return response.data || [];
  }

  async getEmployeeById(employeeId: number): Promise<EmployeeDto> {
    const response = await this.http.request<EmployeeDto>('GET', `/employees/${employeeId}`);
    return response.data;
  }
  
}
