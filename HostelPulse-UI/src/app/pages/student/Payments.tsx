import { useAuth } from '../../context/AuthContext';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { StatusChip } from '../../components/StatusChip';
import { getPaymentsByStudent } from '../../data/mockData';
import { CreditCard, Calendar, IndianRupee } from 'lucide-react';

export function Payments() {
  const { user } = useAuth();
  const payments = getPaymentsByStudent(user!.id);
  
  const totalDue = payments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Payments" />

      <div className="p-4 space-y-4">
        {/* Total Due Card */}
        <Card className="p-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm opacity-90">Total Outstanding</p>
              <h2 className="text-3xl font-semibold">₹{totalDue.toLocaleString()}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm opacity-90">
            {payments.filter(p => p.status !== 'paid').length} pending payment(s)
          </p>
        </Card>

        {/* Info Note */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a read-only view of your payment records. 
            For payment-related queries or to make payments, please contact the warden's office.
          </p>
        </Card>

        {/* Payment History */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Payment History</h3>
          <div className="space-y-3">
            {payments.map((payment) => (
              <Card key={payment.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 capitalize mb-1">
                      {payment.type.replace('-', ' ')}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <IndianRupee className="w-3 h-3" />
                      <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <StatusChip status={payment.status} />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Due Date:</span>
                    <span className="font-medium">
                      {new Date(payment.dueDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  {payment.status === 'paid' && payment.paidDate && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Paid On:</span>
                      <span className="font-medium text-green-600">
                        {new Date(payment.paidDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  )}

                  {payment.status === 'partial' && payment.paidAmount && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Paid Amount:</span>
                      <span className="font-medium">₹{payment.paidAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {payment.status !== 'paid' && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Balance:</span>
                      <span className="font-medium text-orange-600">
                        ₹{((payment.paidAmount ? payment.amount - payment.paidAmount : payment.amount)).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {payment.status !== 'paid' && new Date(payment.dueDate) < new Date() && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                    Payment overdue
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-semibold text-green-600">
                ₹{payments
                  .filter(p => p.status === 'paid')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending:</span>
              <span className="font-semibold text-orange-600">
                ₹{totalDue.toLocaleString()}
              </span>
            </div>
            <div className="pt-3 border-t flex justify-between">
              <span className="font-medium text-gray-900">Total:</span>
              <span className="font-semibold text-gray-900">
                ₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
