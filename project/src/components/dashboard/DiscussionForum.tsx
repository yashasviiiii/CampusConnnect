/*import { supabase } from '../../lib/supabase';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DiscussionForum: React.FC = () => {
  const { user } = useAuth();

  const [discussions, setDiscussions] = useState<any[]>([]);
  const [userLikes, setUserLikes] = useState<{ [id: string]: boolean }>({});
  const [commentsMap, setCommentsMap] = useState<{ [id: string]: any[] }>({});
  const [commentInputs, setCommentInputs] = useState<{ [id: string]: string }>({});
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newTags, setNewTags] = useState('');

  const fetchAll = async () => {
    const { data: ddata, error: derr } = await supabase
      .from('discussions')
      .select(`
        id, title, content, category, tags,
        likes_count, replies_count, is_answered, created_at,
        profiles (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (derr) console.error(derr);
    else setDiscussions(ddata || []);

    if (user) {
      const { data: ldata } = await supabase
        .from('likes')
        .select('discussion_id')
        .eq('user_id', user.id);

      const likesState = ldata?.reduce((acc, cur) => {
        acc[cur.discussion_id] = true;
        return acc;
      }, {} as any) || {};
      setUserLikes(likesState);

      const { data: cdata } = await supabase
        .from('comments')
        .select(`
          id, content, discussion_id, created_at,
          profiles (
            name
          )
        `)
        .order('created_at', { ascending: true });

      const cmap = cdata?.reduce((acc, cur) => {
        acc[cur.discussion_id] ||= [];
        acc[cur.discussion_id].push(cur);
        return acc;
      }, {} as any) || {};
      setCommentsMap(cmap);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [user]);

  const handleCreate = async () => {
    if (!user) return alert("Login to post");

    await supabase.from('discussions').insert({
      title: newTitle,
      content: newContent,
      author_id: user.id,
      category: newCategory,
      tags: newTags.split(',').map(t => t.trim()),
    });

    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    fetchAll();
  };

  const handleLike = async (id: string, hasLiked: boolean) => {
    if (!user) return alert('Login first!');
    if (hasLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('discussion_id', id);
      setDiscussions(d =>
        d.map(x => (x.id === id ? { ...x, likes_count: x.likes_count - 1 } : x))
      );
    } else {
      await supabase
        .from('likes')
        .insert([{ user_id: user.id, discussion_id: id }]);
      setDiscussions(d =>
        d.map(x => (x.id === id ? { ...x, likes_count: x.likes_count + 1 } : x))
      );
    }
    setUserLikes(s => ({ ...s, [id]: !hasLiked }));
  };

  const handleComment = async (id: string) => {
    const text = commentInputs[id];
    if (!user || !text?.trim()) return;
    await supabase.from('comments').insert({
      discussion_id: id,
      user_id: user.id,
      content: text,
    });
    setCommentInputs(c => ({ ...c, [id]: '' }));
    fetchAll();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Discussion Forum</h2>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={() => setShowNewPostModal(true)}
        >
          <Plus className="mr-1" />
          New Post
        </button>
      </div>

      {showNewPostModal && (
        <div className="p-4 bg-gray-100 rounded-xl space-y-3">
          <input
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-xl"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="w-full px-3 py-2 border rounded-xl"
            rows={4}
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
          />
          <input
            placeholder="Category"
            className="w-full px-3 py-2 border rounded-xl"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <input
            placeholder="Tags (comma separated)"
            className="w-full px-3 py-2 border rounded-xl"
            value={newTags}
            onChange={e => setNewTags(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            onClick={handleCreate}
          >
            Post
          </button>
        </div>
      )}

      {discussions.map(d => (
        <div key={d.id} className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-lg font-bold">{d.title}</h3>
          <p>{d.content}</p>
          <div className="text-sm text-gray-500">
            Posted by {d.profiles?.name || 'Anonymous'} •{' '}
            {new Date(d.created_at).toLocaleString()}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLike(d.id, !!userLikes[d.id])}
              className={
                userLikes[d.id]
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-blue-600'
              }
            >
              <ThumbsUp className="inline-block mr-1" />
              {d.likes_count || 0}
            </button>
            <span className="text-gray-500">
              <MessageSquare className="inline-block mr-1" />
              {d.replies_count || 0}
            </span>
          </div>

          <div className="space-y-2">
            {(commentsMap[d.id] || []).map(c => (
              <div key={c.id} className="bg-gray-100 px-3 py-2 rounded-xl text-sm">
                <strong>{c.profiles?.name || 'Anonymous'}:</strong> {c.content}
              </div>
            ))}
            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 border rounded-xl"
                placeholder="Write a comment..."
                value={commentInputs[d.id] || ''}
                onChange={e =>
                  setCommentInputs(c => ({ ...c, [d.id]: e.target.value }))
                }
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
                onClick={() => handleComment(d.id)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionForum;*/
import { supabase } from '../../lib/supabase';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DiscussionForum: React.FC = () => {
  const { user } = useAuth();

  const [discussions, setDiscussions] = useState<any[]>([]);
  const [userLikes, setUserLikes] = useState<{ [id: string]: boolean }>({});
  const [commentsMap, setCommentsMap] = useState<{ [id: string]: any[] }>({});
  const [commentInputs, setCommentInputs] = useState<{ [id: string]: string }>({});
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newTags, setNewTags] = useState('');

  const fetchAll = async () => {
    const { data: ddata, error: derr } = await supabase
      .from('discussions')
      .select(`
        id, title, content, category, tags,
        likes_count, replies_count, is_answered, created_at,
        profiles (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (derr) {
      console.error('Error fetching discussions:', derr);
    } else {
      setDiscussions(ddata || []);
    }

    if (user?.id) {
      const { data: ldata } = await supabase
        .from('likes')
        .select('discussion_id')
        .eq('user_id', user.id);

      const likesState = ldata?.reduce((acc, cur) => {
        acc[cur.discussion_id] = true;
        return acc;
      }, {} as any) || {};
      setUserLikes(likesState);

      const { data: cdata } = await supabase
        .from('comments')
        .select(`
          id, content, discussion_id, created_at,
          profiles (
            name
          )
        `)
        .order('created_at', { ascending: true });

      const cmap = cdata?.reduce((acc, cur) => {
        acc[cur.discussion_id] ||= [];
        acc[cur.discussion_id].push(cur);
        return acc;
      }, {} as any) || {};
      setCommentsMap(cmap);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [user?.id]);

  const handleCreate = async () => {
    if (!user?.id) return alert("Please login to post");

    const { error } = await supabase.from('discussions').insert([
      {
        title: newTitle,
        content: newContent,
        author_id: user.id,
        category: newCategory,
        tags: newTags.split(',').map(t => t.trim()),
      }
    ]);

    if (error) {
      alert("Error creating post: " + error.message);
      return;
    }

    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    fetchAll();
  };

  const handleLike = async (id: string, hasLiked: boolean) => {
    if (!user?.id) return alert('Please login first!');

    if (hasLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('discussion_id', id);

      setDiscussions(d =>
        d.map(x => (x.id === id ? { ...x, likes_count: x.likes_count - 1 } : x))
      );
    } else {
      await supabase.from('likes').insert([
        { user_id: user.id, discussion_id: id }
      ]);

      setDiscussions(d =>
        d.map(x => (x.id === id ? { ...x, likes_count: x.likes_count + 1 } : x))
      );
    }

    setUserLikes(s => ({ ...s, [id]: !hasLiked }));
  };

  const handleComment = async (id: string) => {
    const text = commentInputs[id];
    if (!user?.id || !text?.trim()) return;

    const { error } = await supabase.from('comments').insert([
      {
        discussion_id: id,
        user_id: user.id,
        content: text,
      }
    ]);

    if (error) {
      alert("Comment failed: " + error.message);
      return;
    }

    setCommentInputs(c => ({ ...c, [id]: '' }));
    fetchAll();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f5f3ff] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#6b4c9a]">Discussion Forum</h2>
        <button
          className="flex items-center bg-[#b39ddb] hover:bg-[#9575cd] text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => setShowNewPostModal(true)}
        >
          <Plus className="mr-2" size={18} />
          New Post
        </button>
      </div>

      {showNewPostModal && (
        <div className="bg-white p-4 rounded-lg shadow-inner mb-6 space-y-3 border border-[#dcd6f7]">
          <input
            className="w-full p-2 border border-[#ccc] rounded"
            placeholder="Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border border-[#ccc] rounded"
            rows={3}
            placeholder="Content"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
          />
          <input
            className="w-full p-2 border border-[#ccc] rounded"
            placeholder="Category"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <input
            className="w-full p-2 border border-[#ccc] rounded"
            placeholder="Tags (comma separated)"
            value={newTags}
            onChange={e => setNewTags(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className="bg-[#9575cd] hover:bg-[#7e57c2] text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      )}

      {discussions.map(d => (
        <div
          key={d.id}
          className="bg-white p-4 mb-6 rounded-lg shadow border border-[#dcd6f7]"
        >
          <div className="text-xl font-semibold mb-1 text-[#4a3c73]">{d.title}</div>
          <div className="mb-2 text-gray-700">{d.content}</div>
          <div className="text-sm text-gray-500 mb-2">
            Posted by {d.profiles?.name || 'Anonymous'} •{' '}
            {new Date(d.created_at).toLocaleString()}
          </div>

          <div className="flex items-center gap-6 text-sm font-medium mb-4">
            <button
              onClick={() => handleLike(d.id, !!userLikes[d.id])}
              className={`flex items-center gap-1 transition ${
                userLikes[d.id]
                  ? 'text-[#6b4c9a]'
                  : 'hover:text-[#6b4c9a]'
              }`}
            >
              <ThumbsUp size={18} />
              {d.likes_count || 0}
            </button>
            <div className="flex items-center gap-1 text-gray-600">
              <MessageSquare size={18} />
              {commentsMap[d.id]?.length || 0}
            </div>
          </div>

          <div className="space-y-2">
            {(commentsMap[d.id] || []).map(c => (
              <div
                key={c.id}
                className="bg-[#e6e0f8] px-4 py-2 rounded text-sm"
              >
                <strong>{c.profiles?.name || 'Anonymous'}:</strong> {c.content}
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <input
                className="flex-1 px-3 py-2 border border-[#ccc] rounded"
                placeholder="Write a comment..."
                value={commentInputs[d.id] || ''}
                onChange={e =>
                  setCommentInputs(c => ({ ...c, [d.id]: e.target.value }))
                }
              />
              <button
                className="px-4 py-2 bg-[#b39ddb] hover:bg-[#9575cd] text-white rounded"
                onClick={() => handleComment(d.id)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionForum;



