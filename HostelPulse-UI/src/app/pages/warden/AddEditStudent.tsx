import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

export function AddEditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(isEdit ? 'Student updated successfully!' : 'Student added successfully!');
    navigate('/warden/students');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{isEdit ? 'Edit' : 'Add'} Student</h1>
        <p className="text-gray-500 mt-1">Enter student information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" placeholder="CS2024001" required />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="student@example.com" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+91 98765 43210" required />
            </div>
            <div>
              <Label htmlFor="room">Room Number</Label>
              <Input id="room" placeholder="101" required />
            </div>
            <div>
              <Label htmlFor="block">Block</Label>
              <Input id="block" placeholder="A" required />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" min="1" max="4" placeholder="2" required />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input id="course" placeholder="B.Tech Computer Science" required />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/warden/students')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
