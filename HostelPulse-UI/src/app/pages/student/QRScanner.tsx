import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { X, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

type ScanStatus = 'scanning' | 'success' | 'error';

export function QRScanner() {
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState<ScanStatus>('scanning');
  const [errorMessage, setErrorMessage] = useState('');

  // Simulate QR scan after 2 seconds
  useEffect(() => {
    if (scanStatus === 'scanning') {
      const timer = setTimeout(() => {
        // Randomly succeed or fail for demo
        const success = Math.random() > 0.3;
        
        if (success) {
          setScanStatus('success');
        } else {
          setScanStatus('error');
          setErrorMessage('QR code expired. Please ask guard for a new one.');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [scanStatus]);

  const handleRetry = () => {
    setScanStatus('scanning');
    setErrorMessage('');
  };

  const handleDone = () => {
    toast.success('Attendance marked successfully!');
    navigate('/student/attendance');
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-white font-semibold">Scan QR Code</h1>
            <button
              onClick={() => navigate('/student/attendance')}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Scanner View */}
        <div className="flex-1 flex items-center justify-center p-4">
          {scanStatus === 'scanning' && (
            <div className="relative">
              {/* Camera Placeholder */}
              <div className="w-64 h-64 bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Camera className="w-16 h-16 text-gray-600" />
                
                {/* Scanning Animation */}
                <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-scan" />
              </div>

              {/* Hint */}
              <p className="text-white text-center mt-6">
                Point camera at QR code
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Scanning...
              </p>
            </div>
          )}

          {scanStatus === 'success' && (
            <Card className="p-6 max-w-sm mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Attendance Marked!
                </h2>
                <p className="text-gray-600 mb-1">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-green-600">Present</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Guard:</span>
                    <span className="font-medium text-gray-900">Suresh Kumar</span>
                  </div>
                </div>
                <Button className="w-full mt-6" onClick={handleDone}>
                  Done
                </Button>
              </div>
            </Card>
          )}

          {scanStatus === 'error' && (
            <Card className="p-6 max-w-sm mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Scan Failed
                </h2>
                <p className="text-gray-600 mb-6">
                  {errorMessage || 'Unable to scan QR code. Please try again.'}
                </p>
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleRetry}>
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/student/attendance')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Bottom Hints */}
        {scanStatus === 'scanning' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <p className="text-white text-sm text-center opacity-80">
              Make sure you're within the hostel premises and during attendance hours
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(256px); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
