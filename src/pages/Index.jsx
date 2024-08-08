import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { db } from '../lib/firebase';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const onlineUsersList = Object.entries(data)
          .filter(([_, user]) => user.online)
          .map(([id, user]) => ({ id, ...user }));
        setOnlineUsers(onlineUsersList);
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Here you would implement the actual login logic
      console.log('Logging in with', email, password);
      
      // Update user's online status in Firebase
      const userRef = ref(db, `users/${email.replace('.', ',')}`);
      await set(userRef, {
        email,
        online: true,
      });

      toast({
        title: "Login Successful",
        description: "Welcome to your family tree!",
      });
      navigate('/family-tree');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Family Tree App</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Online Users</h2>
          <ul>
            {onlineUsers.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
