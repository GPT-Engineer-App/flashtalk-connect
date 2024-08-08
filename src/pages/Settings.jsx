import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoAnswer, setAutoAnswer] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch
            id="darkMode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="autoAnswer">Auto-answer Calls</Label>
          <Switch
            id="autoAnswer"
            checked={autoAnswer}
            onCheckedChange={setAutoAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
