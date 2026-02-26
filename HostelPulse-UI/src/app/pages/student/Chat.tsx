import { useState } from 'react';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../context/AuthContext';
import { mockMessages } from '../../data/mockData';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `M${Date.now()}`,
      senderId: user!.id,
      senderName: user!.name,
      senderRole: user!.role,
      receiverId: 'frontdesk',
      content: newMessage,
      timestamp: new Date().toISOString(),
      status: 'sent' as const,
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AppHeader title="Front Desk Chat" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isMe = message.senderId === user!.id;

          return (
            <div
              key={message.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  isMe
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {!isMe && (
                  <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
                )}
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isMe ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Response time: Usually within 1 hour during office hours
        </p>
      </div>
    </div>
  );
}
