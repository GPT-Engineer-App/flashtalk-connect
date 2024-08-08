import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2 } from 'lucide-react';

const FamilyTree = () => {
  const [generations, setGenerations] = useState([
    { id: 1, name: "Great Great Grandparent", members: [] },
    { id: 2, name: "Great Grandparent", members: [] },
    { id: 3, name: "Grandparent", members: [] },
    { id: 4, name: "Parent", members: [] },
    { id: 5, name: "Self", members: [] },
    { id: 6, name: "Child", members: [] },
    { id: 7, name: "Grandchild", members: [] },
  ]);

  const addMember = (generationId) => {
    setGenerations(generations.map(gen => {
      if (gen.id === generationId) {
        return {
          ...gen,
          members: [...gen.members, { id: Date.now(), name: "" }]
        };
      }
      return gen;
    }));
  };

  const updateMember = (generationId, memberId, newName) => {
    setGenerations(generations.map(gen => {
      if (gen.id === generationId) {
        return {
          ...gen,
          members: gen.members.map(member => 
            member.id === memberId ? { ...member, name: newName } : member
          )
        };
      }
      return gen;
    }));
  };

  const removeMember = (generationId, memberId) => {
    setGenerations(generations.map(gen => {
      if (gen.id === generationId) {
        return {
          ...gen,
          members: gen.members.filter(member => member.id !== memberId)
        };
      }
      return gen;
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Family Tree</h1>
      <div className="space-y-6">
        {generations.map((generation) => (
          <Card key={generation.id} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{generation.name}</h2>
            <div className="space-y-2">
              {generation.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Input
                    value={member.name}
                    onChange={(e) => updateMember(generation.id, member.id, e.target.value)}
                    placeholder="Enter name"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeMember(generation.id, member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => addMember(generation.id)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyTree;
