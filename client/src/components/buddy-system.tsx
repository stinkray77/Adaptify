
import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface BuddyPair {
  mentorId: number;
  menteeId: number;
  mentorName: string;
  menteeName: string;
  taskType: string;
  status: string;
  proficiencyLevel: string;
}

export default function BuddySystem() {
  const [buddyPairs] = useState<BuddyPair[]>([
    {
      mentorId: 1,
      menteeId: 2,
      mentorName: "Alice Chen",
      menteeName: "Bob Smith",
      taskType: "JavaScript Development",
      status: "active",
      proficiencyLevel: "Expert-Beginner"
    },
    {
      mentorId: 3,
      menteeId: 4,
      mentorName: "David Wang",
      menteeName: "Emma Davis",
      taskType: "Python Programming",
      status: "active",
      proficiencyLevel: "Advanced-Intermediate"
    },
    {
      mentorId: 5,
      menteeId: 6,
      mentorName: "Frank Liu",
      menteeName: "Grace Kim",
      taskType: "React Development",
      status: "active",
      proficiencyLevel: "Expert-Novice"
    }
  ]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Smart Buddy System</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-4">
              Our intelligent buddy system pairs experienced mentors with learners based on their proficiency levels
              and task types. The algorithm analyzes metrics such as:
            </p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li>• Task completion time</li>
              <li>• Error rates during task execution</li>
              <li>• Technical expertise in specific areas</li>
              <li>• Task urgency and priority levels</li>
            </ul>
            <p className="text-gray-600 italic">
              Employees with high proficiency (fast completion, low errors) are paired with those needing additional support
              in matching task domains.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buddyPairs.map((pair, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{pair.mentorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{pair.mentorName}</p>
                    <p className="text-sm text-emerald-600">Mentor</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{pair.menteeName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{pair.menteeName}</p>
                    <p className="text-sm text-blue-600">Mentee</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-gray-900">{pair.taskType}</p>
                  <p className="text-sm text-gray-500">Level: {pair.proficiencyLevel}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
