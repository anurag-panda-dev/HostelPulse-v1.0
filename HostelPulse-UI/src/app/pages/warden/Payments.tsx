import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { StatusChip } from '../../components/StatusChip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { mockPayments } from '../../data/mockData';
import { Search, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

export function WardenPayments() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesTab =
      activeTab === 'all' ? true :
      payment.status === activeTab;

    const matchesSearch =
      searchQuery === '' ||
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.roomNumber.includes(searchQuery);

    return matchesTab && matchesSearch;
  });

  const totalPaid = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = mockPayments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + (p.paidAmount ? p.amount - p.paidAmount : p.amount), 0);

  const totalAmount = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = ((totalPaid / totalAmount) * 100).toFixed(1);

  const paidCount = mockPayments.filter(p => p.status === 'paid').length;
  const pendingCount = mockPayments.filter(p => p.status === 'pending').length;
  const partialCount = mockPayments.filter(p => p.status === 'partial').length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">Track and manage student payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{(totalAmount / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500">Total Amount</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-green-600">
                ₹{(totalPaid / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500">Collected</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-orange-600">
                ₹{(totalPending / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-purple-600">{collectionRate}%</p>
              <p className="text-sm text-gray-500">Collection Rate</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or room..."
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All ({mockPayments.length})</TabsTrigger>
            <TabsTrigger value="paid">Paid ({paidCount})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="partial">Partial ({partialCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const balance = payment.paidAmount 
                      ? payment.amount - payment.paidAmount 
                      : (payment.status === 'paid' ? 0 : payment.amount);
                    const isOverdue = payment.status !== 'paid' && new Date(payment.dueDate) < new Date();

                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.studentName}</TableCell>
                        <TableCell>{payment.roomNumber}</TableCell>
                        <TableCell className="capitalize">{payment.type.replace('-', ' ')}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          ₹{(payment.paidAmount || (payment.status === 'paid' ? payment.amount : 0)).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span className={balance > 0 ? 'text-orange-600 font-medium' : 'text-green-600'}>
                            ₹{balance.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                            {new Date(payment.dueDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short'
                            })}
                            {isOverdue && ' (Overdue)'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusChip status={payment.status} />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {filteredPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No payment records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Payment Types Breakdown */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Types Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['hostel-fee', 'mess-fee', 'fine', 'other'].map(type => {
            const typePayments = mockPayments.filter(p => p.type === type);
            const typeTotal = typePayments.reduce((sum, p) => sum + p.amount, 0);
            const typePaid = typePayments
              .filter(p => p.status === 'paid')
              .reduce((sum, p) => sum + p.amount, 0);
            const typePercentage = typeTotal > 0 ? ((typePaid / typeTotal) * 100).toFixed(0) : 0;

            return (
              <div key={type} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 capitalize mb-1">{type.replace('-', ' ')}</p>
                <p className="text-xl font-semibold text-gray-900">₹{(typeTotal / 1000).toFixed(0)}K</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${typePercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{typePercentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
