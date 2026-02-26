import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { QrCode, Clock, Info } from 'lucide-react';
import { toast } from 'sonner';

export function QRSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    block: '',
    year: '',
  });

  const handleGenerateQR = () => {
    if (!formData.block || !formData.year) {
      toast.error('Please select block and year');
      return;
    }

    toast.success('QR code session started!');
    navigate('/guard/qr-session');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="QR Attendance" />

      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">How it works</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Select the block and year you're assigned to</li>
                <li>Click "Generate QR Code" to start attendance session</li>
                <li>Students will scan the displayed QR code</li>
                <li>Monitor attendance in real-time</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Time Window Info */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Today's Attendance Window</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="text-lg font-semibold text-gray-900">8:00 PM</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Time</p>
              <p className="text-lg font-semibold text-gray-900">10:00 PM</p>
            </div>
          </div>
        </Card>

        {/* Setup Form */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Setup Attendance Session</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="block">Select Block</Label>
              <Select
                value={formData.block}
                onValueChange={(value) => setFormData({ ...formData, block: value })}
              >
                <SelectTrigger id="block">
                  <SelectValue placeholder="Choose block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Block A</SelectItem>
                  <SelectItem value="B">Block B</SelectItem>
                  <SelectItem value="C">Block C</SelectItem>
                  <SelectItem value="D">Block D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="year">Select Year</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => setFormData({ ...formData, year: value })}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Choose year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          size="lg"
          className="w-full h-14"
          onClick={handleGenerateQR}
          disabled={!formData.block || !formData.year}
        >
          <QrCode className="w-5 h-5 mr-2" />
          Generate QR Code
        </Button>
      </div>
    </div>
  );
}
