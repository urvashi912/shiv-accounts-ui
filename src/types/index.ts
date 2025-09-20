// Core business types for Shiv Accounts Cloud

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Accountant' | 'Contact';
  companyName: string;
}

export interface Contact {
  id: string;
  name: string;
  type: 'Customer' | 'Vendor' | 'Both';
  email: string;
  mobile: string;
  city: string;
  state: string;
  address?: string;
  gstNumber?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  type: 'Goods' | 'Service';
  salesPrice: number;
  purchasePrice: number;
  taxPercentage: number;
  hsnCode: string;
  category: string;
  description?: string;
  unit: string;
  createdAt: Date;
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
  computationMethod: 'Percentage' | 'Fixed';
  appliesOn: 'Sales' | 'Purchase' | 'Both';
  description?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Income' | 'Expense' | 'Equity';
  parentId?: string;
  code: string;
  balance: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  date: Date;
  dueDate: Date;
  items: PurchaseOrderItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxPercentage: number;
  amount: number;
}

export interface VendorBill {
  id: string;
  billNumber: string;
  vendorId: string;
  vendorName: string;
  date: Date;
  dueDate: Date;
  amount: number;
  paidAmount: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue';
  items: BillItem[];
  notes?: string;
}

export interface BillItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxPercentage: number;
  amount: number;
}

export interface SalesOrder {
  id: string;
  soNumber: string;
  customerId: string;
  customerName: string;
  date: Date;
  items: SalesOrderItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  status: 'Draft' | 'Confirmed' | 'Invoiced' | 'Delivered' | 'Cancelled';
}

export interface SalesOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxPercentage: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  paidAmount: number;
  status: 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue';
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxPercentage: number;
  amount: number;
}

export interface Payment {
  id: string;
  type: 'Received' | 'Made';
  amount: number;
  date: Date;
  method: 'Cash' | 'Bank Transfer' | 'Cheque' | 'Online';
  reference: string;
  contactId: string;
  contactName: string;
  invoiceId?: string;
  billId?: string;
  notes?: string;
}

export interface FinancialReport {
  type: 'Balance Sheet' | 'Profit & Loss' | 'Stock Report';
  data: any;
  generatedAt: Date;
}

export interface DashboardMetrics {
  totalSales: number;
  totalPurchases: number;
  outstandingReceivables: number;
  outstandingPayables: number;
  totalCustomers: number;
  totalVendors: number;
  totalProducts: number;
  recentTransactions: Array<{
    id: string;
    type: string;
    amount: number;
    date: Date;
    description: string;
  }>;
}