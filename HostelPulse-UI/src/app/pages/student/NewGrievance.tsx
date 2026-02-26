import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { toast } from 'sonner';
import { Upload, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

const categories = [
  {
    value: 'maintenance',
    label: 'Maintenance',
    subcategories: ['Electrical', 'Plumbing', 'Furniture', 'Cleanliness'],
  },
  {
    value: 'food',
    label: 'Food',
    subcategories: ['Quality', 'Quantity', 'Hygiene', 'Timing'],
  },
  {
    value: 'safety',
    label: 'Safety & Security',
    subcategories: ['Fire Safety', 'Entry/Exit', 'Lighting', 'Emergency'],
  },
  {
    value: 'internet',
    label: 'Internet & Utilities',
    subcategories: ['WiFi', 'Water', 'Electricity', 'Backup'],
  },
  {
    value: 'other',
    label: 'Other',
    subcategories: ['General Query', 'Complaint', 'Suggestion'],
  },
];

export function NewGrievance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showUrgentConfirm, setShowUrgentConfirm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'emergency',
    description: '',
  });

  const selectedCategory = categories.find(c => c.value === formData.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show confirmation for high priority
    if ((formData.priority === 'high' || formData.priority === 'emergency') && !showUrgentConfirm) {
      setShowUrgentConfirm(true);
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Grievance submitted successfully! We will address it soon.');
    navigate('/student/requests/grievances');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader title="Report Grievance" onBack={() => navigate('/student/requests/grievances')} />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
            required
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategory && (
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select
              value={formData.subcategory}
              onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
              required
            >
              <SelectTrigger id="subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory.subcategories.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label>Priority</Label>
          <RadioGroup
            value={formData.priority}
            onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
            className="grid grid-cols-2 gap-3 mt-2"
          >
            <div>
              <RadioGroupItem value="low" id="low" className="peer sr-only" />
              <Label
                htmlFor="low"
                className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-3 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50"
              >
                Low
              </Label>
            </div>
            <div>
              <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
              <Label
                htmlFor="medium"
                className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-3 cursor-pointer peer-data-[state=checked]:border-yellow-600 peer-data-[state=checked]:bg-yellow-50"
              >
                Medium
              </Label>
            </div>
            <div>
              <RadioGroupItem value="high" id="high" className="peer sr-only" />
              <Label
                htmlFor="high"
                className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-3 cursor-pointer peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-orange-50"
              >
                High
              </Label>
            </div>
            <div>
              <RadioGroupItem value="emergency" id="emergency" className="peer sr-only" />
              <Label
                htmlFor="emergency"
                className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-3 cursor-pointer peer-data-[state=checked]:border-red-600 peer-data-[state=checked]:bg-red-50"
              >
                Emergency
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Please provide detailed information about the issue"
            rows={5}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Be specific about location, timing, and other relevant details</p>
        </div>

        <div>
          <Label>Photo (Optional)</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Take photo or upload</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG (max 5MB)</p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  toast.success(`Photo "${e.target.files[0].name}" added`);
                }
              }}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-0 md:bg-transparent">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/student/requests/grievances')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || !formData.category || !formData.subcategory || !formData.description}
            >
              {loading ? 'Submitting...' : 'Submit Grievance'}
            </Button>
          </div>
        </div>
      </form>

      {/* Urgent Confirmation Dialog */}
      <AlertDialog open={showUrgentConfirm} onOpenChange={setShowUrgentConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <AlertDialogTitle className="text-center">Confirm Priority Level</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You've marked this as {formData.priority === 'emergency' ? 'Emergency' : 'High'} priority.
              This will notify staff immediately. Is this correct?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Change Priority</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Yes, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
