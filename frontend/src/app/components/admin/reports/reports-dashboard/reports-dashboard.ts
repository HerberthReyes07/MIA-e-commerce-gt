import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReportViewer, ReportColumn, ReportType } from '../report-viewer/report-viewer';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReportViewer
  ],
  templateUrl: './reports-dashboard.html',
  styleUrl: './reports-dashboard.css'
})
export class ReportsDashboard {
  reportConfigs: Array<{
    type: ReportType;
    title: string;
    hasDateFilter: boolean;
    columns: ReportColumn[];
  }> = [
    {
      type: 'top-products',
      title: 'Top Productos por Ventas',
      hasDateFilter: true,
      columns: [
        { key: 'productId', label: 'ID' },
        { key: 'productName', label: 'Producto' },
        { key: 'ownerName', label: 'Vendedor' },
        { key: 'ownerEmail', label: 'Email Vendedor' },
        { key: 'totalUnitsSold', label: 'Unidades Vendidas', pipe: 'number' },
        { key: 'totalRevenue', label: 'Ingresos', pipe: 'currency' }
      ]
    },
    {
      type: 'top-buyers-revenue',
      title: 'Top Compradores por Ingresos de Plataforma',
      hasDateFilter: true,
      columns: [
        { key: 'customerId', label: 'ID' },
        { key: 'customerName', label: 'Cliente' },
        { key: 'customerEmail', label: 'Email Cliente' },
        { key: 'totalOrders', label: 'Órdenes', pipe: 'number' },
        { key: 'totalPlatformRevenue', label: 'Ingresos Plataforma', pipe: 'currency' },
        { key: 'averagePlatformRevenue', label: 'Promedio', pipe: 'currency' }
      ]
    },
    {
      type: 'top-sellers-sales',
      title: 'Top Vendedores por Volumen de Ventas',
      hasDateFilter: true,
      columns: [
        { key: 'sellerId', label: 'ID' },
        { key: 'sellerName', label: 'Vendedor' },
        { key: 'sellerEmail', label: 'Email Vendedor' },
        { key: 'registrationDate', label: 'Fecha de Registro', pipe: 'date' },
        { key: 'totalProductsSold', label: 'Productos Vendidos', pipe: 'number' },
        { key: 'totalRevenue', label: 'Ingresos', pipe: 'currency' }
      ]
    },
    {
      type: 'top-buyers-orders',
      title: 'Top Compradores por Número de Órdenes',
      hasDateFilter: true,
      columns: [
        { key: 'buyerId', label: 'ID' },
        { key: 'buyerName', label: 'Comprador' },
        { key: 'buyerEmail', label: 'Email Comprador' },
        { key: 'registrationDate', label: 'Fecha de Registro', pipe: 'date' },
        { key: 'totalOrders', label: 'Órdenes', pipe: 'number' },
        { key: 'totalSpent', label: 'Gastado', pipe: 'currency' }
      ]
    },
    {
      type: 'top-sellers-inventory',
      title: 'Top Vendedores por Inventario',
      hasDateFilter: false,
      columns: [
        { key: 'sellerId', label: 'ID' },
        { key: 'sellerName', label: 'Vendedor' },
        { key: 'sellerEmail', label: 'Email Vendedor' },
        { key: 'registrationDate', label: 'Fecha de Registro', pipe: 'date' },
        { key: 'productsForSaleCount', label: 'Productos en Venta', pipe: 'number' },
        { key: 'totalStock', label: 'Stock Total', pipe: 'number' }
      ]
    }
  ];

  selectedReport = this.reportConfigs[0];
}
