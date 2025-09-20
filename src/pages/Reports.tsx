import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { BarChart3, FileText, Package, TrendingUp } from 'lucide-react';
import { mockReportData } from '@/data/mockData';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('balance-sheet');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const balanceSheetChartData = [
    { name: 'Current Assets', amount: 1030000 },
    { name: 'Fixed Assets', amount: 850000 },
    { name: 'Current Liabilities', amount: 350000 },
    { name: 'Long-term Liabilities', amount: 600000 },
    { name: 'Owner\'s Equity', amount: 1050000 },
  ];

  const profitLossChartData = [
    { name: 'Sales Revenue', amount: 850000, type: 'income' },
    { name: 'Other Income', amount: 25000, type: 'income' },
    { name: 'COGS', amount: -450000, type: 'expense' },
    { name: 'Operating Expenses', amount: -180000, type: 'expense' },
    { name: 'Admin Expenses', amount: -95000, type: 'expense' },
  ];

  const stockChartData = mockReportData.stockReport.map(item => ({
    name: item.product.substring(0, 15) + '...',
    quantity: item.quantity,
    value: item.value,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Financial insights and business analytics
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(1880000)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <BarChart3 className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(950000)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(150000)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(1005000)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
          <TabsTrigger value="stock-report">Stock Report</TabsTrigger>
        </TabsList>

        {/* Balance Sheet */}
        <TabsContent value="balance-sheet" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Balance Sheet Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Assets */}
                  <div>
                    <h3 className="font-semibold text-success mb-3">Assets</h3>
                    <Table>
                      <TableBody>
                        {mockReportData.balanceSheet.assets.map((asset, index) => (
                          <TableRow key={index}>
                            <TableCell className="py-2">{asset.name}</TableCell>
                            <TableCell className="text-right py-2 font-medium">
                              {formatCurrency(asset.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="border-t-2">
                          <TableCell className="py-2 font-semibold">Total Assets</TableCell>
                          <TableCell className="text-right py-2 font-bold text-success">
                            {formatCurrency(mockReportData.balanceSheet.assets.reduce((sum, asset) => sum + asset.amount, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Liabilities */}
                  <div>
                    <h3 className="font-semibold text-destructive mb-3">Liabilities</h3>
                    <Table>
                      <TableBody>
                        {mockReportData.balanceSheet.liabilities.map((liability, index) => (
                          <TableRow key={index}>
                            <TableCell className="py-2">{liability.name}</TableCell>
                            <TableCell className="text-right py-2 font-medium">
                              {formatCurrency(liability.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Equity */}
                  <div>
                    <h3 className="font-semibold text-primary mb-3">Equity</h3>
                    <Table>
                      <TableBody>
                        {mockReportData.balanceSheet.equity.map((equity, index) => (
                          <TableRow key={index}>
                            <TableCell className="py-2">{equity.name}</TableCell>
                            <TableCell className="text-right py-2 font-medium">
                              {formatCurrency(equity.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Balance Sheet Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={balanceSheetChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profit & Loss */}
        <TabsContent value="profit-loss" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Profit & Loss Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Income */}
                  <div>
                    <h3 className="font-semibold text-success mb-3">Income</h3>
                    <Table>
                      <TableBody>
                        {mockReportData.profitLoss.income.map((income, index) => (
                          <TableRow key={index}>
                            <TableCell className="py-2">{income.name}</TableCell>
                            <TableCell className="text-right py-2 font-medium text-success">
                              {formatCurrency(income.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="border-t">
                          <TableCell className="py-2 font-semibold">Total Income</TableCell>
                          <TableCell className="text-right py-2 font-bold text-success">
                            {formatCurrency(mockReportData.profitLoss.income.reduce((sum, income) => sum + income.amount, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Expenses */}
                  <div>
                    <h3 className="font-semibold text-destructive mb-3">Expenses</h3>
                    <Table>
                      <TableBody>
                        {mockReportData.profitLoss.expenses.map((expense, index) => (
                          <TableRow key={index}>
                            <TableCell className="py-2">{expense.name}</TableCell>
                            <TableCell className="text-right py-2 font-medium text-destructive">
                              {formatCurrency(expense.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="border-t">
                          <TableCell className="py-2 font-semibold">Total Expenses</TableCell>
                          <TableCell className="text-right py-2 font-bold text-destructive">
                            {formatCurrency(mockReportData.profitLoss.expenses.reduce((sum, expense) => sum + expense.amount, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Net Profit */}
                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Net Profit</span>
                      <span className="text-lg font-bold text-success">
                        {formatCurrency(875000 - 725000)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={profitLossChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Bar dataKey="amount">
                      {profitLossChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.type === 'income' ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Stock Report */}
        <TabsContent value="stock-report" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Current Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReportData.stockReport.map((stock, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{stock.product}</TableCell>
                        <TableCell className="text-center">{stock.quantity}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(stock.value)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total Stock Value</TableCell>
                      <TableCell className="text-center font-bold">
                        {mockReportData.stockReport.reduce((sum, stock) => sum + stock.quantity, 0)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {formatCurrency(mockReportData.stockReport.reduce((sum, stock) => sum + stock.value, 0))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Stock Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={stockChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stockChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {stockChartData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{entry.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(entry.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}