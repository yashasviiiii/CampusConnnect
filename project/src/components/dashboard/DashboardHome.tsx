import React, { useEffect, useState } from 'react';
import { ArrowRight, Megaphone } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLocation } from 'react-router-dom';

interface HeardPost {
  id: number;
  content: string;
  created_at: string;
}

const DashboardHome: React.FC = () => {
  const [posts, setPosts] = useState<HeardPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchPosts();
  }, [location.pathname]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('heard_in_campus')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts([
        // Hardcoded posts to always show something
        {
          id: -3,
          content: 'Anyone else lost in the CS lab again?',
          created_at: new Date().toISOString(),
        },
        {
          id: -2,
          content: 'Canteen momos got spicy today 💀',
          created_at: new Date().toISOString(),
        },
        {
          id: -1,
          content: 'Looking for a chill group for ML project…',
          created_at: new Date().toISOString(),
        },
        ...data,
      ]);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);

    const createdAt = new Date().toISOString();

    const { data, error } = await supabase
      .from('heard_in_campus')
      .insert([
        {
          content: newPost,
          created_at: createdAt,
        },
      ])
      .select();

    if (!error && data && data.length > 0) {
      const newEntry = data[0];
      setPosts((prev) => [newEntry, ...prev]);
      setNewPost('');
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-10">
      {/* Cute Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-extrabold mb-2">Welcome to CampusConnect 🎓</h1>
        <p className="text-sm font-medium">See what your peers are buzzing about today in "Heard in Campus"</p>
      </div>

      {/* Posts Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Megaphone className="h-6 w-6 text-purple-600 mr-2" /> Heard in Campus
          </h2>
          <button
            onClick={fetchPosts}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Refresh <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No posts yet. Be the first to share!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-800">{post.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* New Post Input - BOTTOM */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something anonymously..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handlePost}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
