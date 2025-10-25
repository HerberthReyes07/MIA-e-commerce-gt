import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../services/report-service';

export type ReportType =
  | 'top-products'
  | 'top-buyers-revenue'
  | 'top-sellers-sales'
  | 'top-buyers-orders'
  | 'top-sellers-inventory';

export interface ReportColumn {
  key: string;
  label: string;
  pipe?: 'currency' | 'number' | 'date';
}

@Component({
  selector: 'app-report-viewer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.css'
})
export class ReportViewer implements OnInit, OnChanges {
  @Input() title = '';
  @Input() reportType: ReportType = 'top-products';
  @Input() columns: ReportColumn[] = [];
  @Input() hasDateFilter = false;

  data: any[] = [];
  isLoading = false;

  // Date range (opcional)
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private reports: ReportService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el tipo de reporte, resetear fechas y recargar
    if (changes['reportType'] && !changes['reportType'].firstChange) {
      this.startDate = null;
      this.endDate = null;
      this.loadData();
    }
  }

  get displayedColumns(): string[] {
    return this.columns.map(c => c.key);
  }

  async loadData(): Promise<void> {
    this.isLoading = true;
    try {
      const start = this.hasDateFilter && this.startDate ? this.formatDateParam(this.startDate) : null;
      const end = this.hasDateFilter && this.endDate ? this.formatDateParam(this.endDate) : null;

      switch (this.reportType) {
        case 'top-products':
          //console.log('Cargando reporte de top-products con rango:', start, end);
          this.data = await this.reports.getTopProductSales(start, end);
          break;
        case 'top-buyers-revenue':
          //console.log("Cargando reporte de top-buyers-revenue con rango:", start, end);
          this.data = await this.reports.getTopBuyersPlatformRevenue(start, end);
          break;
        case 'top-sellers-sales':
          //console.log("Cargando reporte de top-sellers-sales con rango:", start, end);
          this.data = await this.reports.getTopSellersSalesVolume(start, end);
          break;
        case 'top-buyers-orders':
          //console.log("Cargando reporte de top-buyers-orders con rango:", start, end);
          this.data = await this.reports.getTopBuyersNumberOfOrders(start, end);
          break;
        case 'top-sellers-inventory':
          //console.log("Cargando reporte de top-sellers-inventory");
          this.data = await this.reports.getTopSellersInventoryLevels();
          break;
      }
    } catch (err) {
      console.error('Error cargando reporte:', err);
      this.data = [];
    } finally {
      this.isLoading = false;
    }
  }

  applyRange(): void {
    this.loadData();
  }

  clearRange(): void {
    this.startDate = null;
    this.endDate = null;
    this.loadData();
  }

  // Util: yyyy-MM-dd
  private formatDateParam(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  formatCell(row: any, col: ReportColumn): string {
    const val = row[col.key];
    if (val == null || val === undefined) return '';
    switch (col.pipe) {
      case 'currency':
        return new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(Number(val));
      case 'number':
        return new Intl.NumberFormat('es-GT', { maximumFractionDigits: 2 }).format(Number(val));
      case 'date':
        try {
          const d = new Date(val);
          return d.toLocaleDateString('es-GT');
        } catch {
          return String(val);
        }
      default:
        return String(val);
    }
  }

}
