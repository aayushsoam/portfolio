
import { useState } from 'react';
import { useSkills } from '@/hooks/useSkills';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const SkillsAdmin = () => {
  const { data: skills, isLoading } = useSkills();
  const queryClient = useQueryClient();
  const [newSkill, setNewSkill] = useState({
    name: '',
    icon_name: '',
    color: 'bg-blue-500',
    percentage: 0
  });

  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.icon_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('skills')
        .insert([newSkill]);

      if (error) throw error;

      toast.success('Skill added successfully');
      setNewSkill({ name: '', icon_name: '', color: 'bg-blue-500', percentage: 0 });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

      toast.success('Skill deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };

  if (isLoading) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Skill
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React"
              />
            </div>
            <div>
              <Label htmlFor="icon_name">Icon Name</Label>
              <Input
                id="icon_name"
                value={newSkill.icon_name}
                onChange={(e) => setNewSkill({ ...newSkill, icon_name: e.target.value })}
                placeholder="e.g., Code"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Color Class</Label>
              <Input
                id="color"
                value={newSkill.color}
                onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
                placeholder="e.g., bg-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="percentage">Percentage</Label>
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                value={newSkill.percentage}
                onChange={(e) => setNewSkill({ ...newSkill, percentage: parseInt(e.target.value) || 0 })}
                placeholder="0-100"
              />
            </div>
          </div>
          <Button onClick={handleAddSkill} className="w-full">
            Add Skill
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skills?.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`${skill.color} p-2 rounded text-white text-xs`}>
                    {skill.icon_name}
                  </div>
                  <div>
                    <h3 className="font-medium">{skill.name}</h3>
                    <p className="text-sm text-gray-500">{skill.percentage}% proficiency</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteSkill(skill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsAdmin;
