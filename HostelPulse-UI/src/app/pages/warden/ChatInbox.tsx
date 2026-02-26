import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { mockMessages } from '../../data/mockData';
import { Search, Send, User } from 'lucide-react';
import { toast } from 'sonner';

export function ChatInbox() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Group messages by student
  const conversations = mockMessages.reduce((acc, msg) => {
    const studentId = msg.senderRole === 'student' ? msg.senderId : msg.receiverId;
    if (!acc[studentId]) {
      acc[studentId] = [];
    }
    acc[studentId].push(msg);
    return acc;
  }, {} as Record<string, typeof mockMessages>);

  const conversationList = Object.entries(conversations).map(([studentId, messages]) => {
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter(m => m.senderRole === 'student' && m.status === 'sent').length;
    
    return {
      studentId,
      studentName: messages.find(m => m.senderRole === 'student')?.senderName || 'Unknown Student',
      lastMessage: lastMessage.content,
      lastMessageTime: lastMessage.timestamp,
      unreadCount,
      messages,
    };
  }).filter(conv =>
    searchQuery === '' ||
    conv.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversationList.find(c => c.studentId === selectedConversation);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    toast.success('Message sent');
    setNewMessage('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Chat Inbox</h1>
        <p className="text-gray-500 mt-1">Communicate with students</p>
      </div>

      <Card className="h-[600px] flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversationList.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No conversations found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {conversationList.map((conv) => (
                  <div
                    key={conv.studentId}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conv.studentId ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conv.studentId)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{conv.studentName}</h4>
                          {conv.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(conv.lastMessageTime).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentConversation.studentName}</h3>
                    <p className="text-sm text-gray-500">Student</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {currentConversation.messages.map((message) => {
                  const isWarden = message.senderRole === 'warden';

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isWarden ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isWarden
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {!isWarden && (
                          <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isWarden ? 'text-blue-100' : 'text-gray-400'
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

              {/* Input */}
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
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
