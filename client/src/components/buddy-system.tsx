
import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface BuddyPair {
  mentorId: number;
  menteeId: number;
  taskType: string;
  status: string;
}

export default function BuddySystem() {
  const [buddyPairs, setBuddyPairs] = useState<BuddyPair[]>([]);

  useEffect(() => {
    fetch('/api/buddy-pairs')
      .then(res => res.json())
      .then(data => setBuddyPairs(data));
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Buddy System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buddyPairs.map((pair, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Mentor #{pair.mentorId}</p>
                <p className="text-sm text-gray-500">{pair.taskType}</p>
              </div>
              <Avatar>
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Buddy #{pair.menteeId}</p>
                <p className="text-sm text-gray-500">{pair.status}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
