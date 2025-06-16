import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Send,
  Circle,
  MessageSquare,
  Users,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRealTimeChat } from '../../hooks/useRealTimeChat';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';// Make sure this path is correct

const Messages: React.FC = () => {
  const { user, profile } = useAuth();
  const { onlineUsers, sendMessage, getConversation } = useRealTimeChat();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [collegeUsers, setCollegeUsers] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { seller_id } = useParams();

  const filteredUsers = collegeUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCollegeUsers = async () => {
      if (!profile?.college_name) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, college_name, course, year')
        .eq('college_name', profile.college_name)
        .neq('id', user?.id);

      if (error) {
        console.error('Error fetching college users:', error.message);
      } else {
        setCollegeUsers(data);
        if (seller_id) {
          const target = data.find((u) => u.id === seller_id);
          if (target) setSelectedUser(target);
        }
      }
    };

    fetchCollegeUsers();
  }, [profile?.college_name, seller_id, user?.id]);

  useEffect(() => {
    if (selectedUser) {
      loadConversation();
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversation = async () => {
    if (selectedUser) {
      const conversationMessages = await getConversation(selectedUser.id);
      setMessages(conversationMessages);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      await sendMessage(selectedUser.id, newMessage);
      setNewMessage('');
      setTimeout(loadConversation, 100);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-primary-100">
      <div className="flex h-full">
        {/* Users Sidebar */}
        <div className="w-1/3 border-r border-primary-100 flex flex-col bg-gradient-to-b from-primary-50/50 to-secondary-50/50">
          <div className="p-6 border-b border-primary-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Campus Chat
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Circle className="w-3 h-3 text-accent-500 fill-current" />
                <span>{onlineUsers.length} online</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-6 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No students found from your college</p>
                <p className="text-sm text-gray-400 mt-2">
                  Students will appear here when they register from {profile?.college_name}
                </p>
              </div>
            ) : (
              filteredUsers.map((chatUser) => {
                const isOnline = onlineUsers.some((u) => u.id === chatUser.id);
                return (
                  <div
                    key={chatUser.id}
                    onClick={() => setSelectedUser(chatUser)}
                    className={`p-4 border-b border-primary-50 cursor-pointer transition-all duration-300 hover:bg-white/50 ${
                      selectedUser?.id === chatUser.id ? 'bg-white/80 border-l-4 border-l-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white font-semibold">
                          {chatUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                            isOnline ? 'bg-accent-500' : 'bg-gray-300'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{chatUser.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{chatUser.course} • {chatUser.year}</p>
                        <p className="text-xs text-primary-600 font-medium">{chatUser.college_name}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-6 border-b border-primary-100 bg-gradient-to-r from-primary-50/50 to-secondary-50/50">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white font-semibold">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-accent-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.course} • {selectedUser.year}</p>
                    <p className="text-xs text-primary-600 font-medium">{selectedUser.college_name}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/50 to-primary-50/30">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">Start a conversation</p>
                      <p className="text-gray-400 text-sm">Send a message to {selectedUser.name}</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-6 py-3 rounded-3xl shadow-sm ${
                        message.sender_id === user?.id
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                          : 'bg-white text-gray-900 border border-primary-100'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-end mt-2 ${
                          message.sender_id === user?.id ? 'text-primary-100' : 'text-gray-400'
                        }`}>
                          <span className="text-xs">{formatTime(message.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 border-t border-primary-100 bg-gradient-to-r from-primary-50/50 to-secondary-50/50">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Message ${selectedUser.name}...`}
                      className="w-full px-6 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white/50 to-primary-50/30">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Campus Chat</h3>
                <p className="text-gray-500 max-w-md">
                  Connect with students from {profile?.college_name}. Select a student from the sidebar to start chatting!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

