/*import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // ← FIXED LINE
import { Heart, MapPin, Clock, Sparkles, ShoppingBag } from 'lucide-react';


const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    condition: '',
    category: '',
    location: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          seller:profiles!seller_id(name, college_name)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'like-new':
        return 'bg-green-100 text-green-700';
      case 'excellent':
        return 'bg-blue-100 text-blue-700';
      case 'good':
        return 'bg-yellow-100 text-yellow-700';
      case 'fair':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your create item logic here
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-full ${viewMode === 'grid' ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-full ${viewMode === 'list' ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            List
          </button>
          <button
            onClick={() => setShowNewItemModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-full shadow-md hover:from-accent-600 hover:to-warm-600"
          >
            + List Item
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredItems.map((item: any) => (
            <div key={item.id} className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-accent-100 ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <div className={`w-full bg-gradient-to-br from-accent-100 to-warm-100 ${viewMode === 'list' ? 'h-32 rounded-l-3xl' : 'h-48 rounded-t-3xl'} flex items-center justify-center`}>
                  <ShoppingBag className="w-12 h-12 text-accent-400" />
                </div>
              </div>
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-coral-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-accent-600">${item.price}</span>
                  {item.original_price && <span className="text-sm text-gray-500 line-through">${item.original_price}</span>}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-accent-400 to-warm-400 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">{item.seller.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.seller.name}</p>
                      <p className="text-xs text-gray-500">{item.seller.college_name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-accent-500 to-warm-500 text-white px-4 py-3 rounded-2xl hover:from-accent-600 hover:to-warm-600 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105">
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNewItemModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-warm-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-warm-600 bg-clip-text text-transparent">List an Item</h2>
            </div>
            <form onSubmit={handleCreateItem} className="space-y-6">*/
              {/* Form Fields Here */}
              /*<div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewItemModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-2xl hover:from-accent-600 hover:to-warm-600 transition-all duration-300 shadow-lg"
                >
                  List Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;*/


/*import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Heart, MapPin, Clock, Sparkles, ShoppingBag } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

const Marketplace = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    condition: '',
    category: '',
    location: '',
    image: null as File | null,
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`*, seller:profiles!seller_id(name, college_name)`)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'like-new':
        return 'bg-green-100 text-green-700';
      case 'excellent':
        return 'bg-blue-100 text-blue-700';
      case 'good':
        return 'bg-yellow-100 text-yellow-700';
      case 'fair':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNewItem((prev) => ({ ...prev, image: file || null }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image) return alert('Image is required');
    if (!session?.user?.id) return alert('You must be logged in to list an item');

    try {
      const fileExt = newItem.image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('marketplace-images')
        .upload(fileName, newItem.image);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('marketplace-images')
        .getPublicUrl(fileName);

      const { error } = await supabase.from('marketplace_items').insert({
        ...newItem,
        price: parseFloat(newItem.price),
        original_price: parseFloat(newItem.original_price),
        image_url: urlData.publicUrl,
        is_available: true,
        seller_id: session.user.id,
      });

      if (error) throw error;

      setShowNewItemModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to list item.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="flex space-x-2">
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-full ${viewMode === 'grid' ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Grid</button>
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full ${viewMode === 'list' ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-700'}`}>List</button>
          <button onClick={() => setShowNewItemModal(true)} className="px-4 py-2 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-full shadow-md">+ List Item</button>
        </div>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredItems.map((item) => (
            <div key={item.id} className={`bg-white/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-accent-100 ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <div className={`w-full ${viewMode === 'list' ? 'h-32 rounded-l-3xl' : 'h-48 rounded-t-3xl'} flex items-center justify-center`}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="object-cover w-full h-full rounded-3xl" />
                  ) : (
                    <div className="bg-gradient-to-br from-accent-100 to-warm-100 w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-accent-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getConditionColor(item.condition)}`}>{item.condition}</span>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-coral-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-accent-600">${item.price}</span>
                  {item.original_price && <span className="text-sm text-gray-500 line-through">${item.original_price}</span>}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                {item.seller && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gradient-to-br from-accent-400 to-warm-400 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{item.seller.name?.[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.seller.name}</p>
                        <p className="text-xs text-gray-500">{item.seller.college_name}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{item.location}</div>
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{new Date(item.created_at).toLocaleDateString()}</div>
                </div>
                <button className="w-full bg-gradient-to-r from-accent-500 to-warm-500 text-white px-4 py-3 rounded-2xl font-semibold hover:scale-105">Contact Seller</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNewItemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-warm-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-warm-600 bg-clip-text text-transparent">List an Item</h2>
            </div>
            <form onSubmit={handleCreateItem} className="space-y-4">
              <input name="title" value={newItem.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded-xl" required />
              <textarea name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded-xl" required />
              <input name="price" type="number" value={newItem.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded-xl" required />
              <input name="original_price" type="number" value={newItem.original_price} onChange={handleChange} placeholder="Original Price" className="w-full border p-2 rounded-xl" />
              <select name="condition" value={newItem.condition} onChange={handleChange} className="w-full border p-2 rounded-xl" required>
                <option value="">Condition</option>
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
              <input name="category" value={newItem.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded-xl" />
              <input name="location" value={newItem.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded-xl" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setShowNewItemModal(false)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-2xl shadow-lg">List Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;*/
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Heart, MapPin, Clock, Sparkles, ShoppingBag } from 'lucide-react';
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const session = useSession();
  const navigate = useNavigate();

  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    condition: '',
    category: '',
    location: '',
    email: '',
    phone_number: '',
    image: null as File | null,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`*, seller:profiles(name, college_name)`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSold = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('marketplace_items')
        .update({ is_available: false })
        .eq('id', itemId);

      if (error) throw error;

      fetchItems();
    } catch (err) {
      console.error('Error marking item as sold:', err);
      alert('Failed to mark item as sold');
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'like-new':
        return 'bg-green-100 text-green-700';
      case 'excellent':
        return 'bg-blue-100 text-blue-700';
      case 'good':
        return 'bg-yellow-100 text-yellow-700';
      case 'fair':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNewItem((prev) => ({ ...prev, image: file || null }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image) return alert('Image is required');
    if (!session?.user?.id) return alert('You must be logged in to list an item');

    try {
      const fileExt = newItem.image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('marketplace-images')
        .upload(fileName, newItem.image);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('marketplace-images')
        .getPublicUrl(fileName);

      const { error } = await supabase.from('marketplace_items').insert({
        ...newItem,
        price: parseFloat(newItem.price),
        original_price: parseFloat(newItem.original_price),
        image_url: urlData.publicUrl,
        is_available: true,
        seller_id: session.user.id,
      });

      if (error) throw error;

      setShowNewItemModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to list item.');
    }
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#dfffe0' }}>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="flex space-x-2">
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-full ${viewMode === 'grid' ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Grid</button>
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full ${viewMode === 'list' ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-700'}`}>List</button>
          <button onClick={() => setShowNewItemModal(true)} className="px-4 py-2 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-full shadow-md">+ List Item</button>
        </div>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredItems.map((item) => (
            <div key={item.id} className={`bg-white/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-accent-100 ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <div className={`w-full ${viewMode === 'list' ? 'h-32 rounded-l-3xl' : 'h-48 rounded-t-3xl'} flex items-center justify-center`}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="object-cover w-full h-full rounded-3xl" />
                  ) : (
                    <div className="bg-gradient-to-br from-accent-100 to-warm-100 w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-accent-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getConditionColor(item.condition)}`}>{item.condition}</span>

  {item.seller_id === session?.user?.id && item.is_available && (
    <button
      onClick={() => handleMarkAsSold(item.id)}
      className="text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded-full transition"
    >
      Mark as Sold
    </button>
  )}

  {!item.is_available && (
    <span className="text-xs font-semibold text-red-500 px-3 py-1">Sold</span>
  )}
</div>

                <h3 className="text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-accent-600">${item.price}</span>
                  {item.original_price && <span className="text-sm text-gray-500 line-through">${item.original_price}</span>}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                {item.seller && (
                  <div className="mb-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-8 w-8 bg-gradient-to-br from-accent-400 to-warm-400 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{item.seller.name?.[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.seller.name}</p>
                        <p className="text-xs text-gray-500">{item.seller.college_name}</p>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {item.email}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {item.phone_number}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{item.location}</div>
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{new Date(item.created_at).toLocaleDateString()}</div>
                </div>

                {!item.is_available && (
                  <div className="mt-2 text-xs font-semibold text-red-500">Sold</div>
                )}

                {item.seller_id === session?.user?.id && item.is_available && (
                  <button
                    onClick={() => handleMarkAsSold(item.id)}
                    className="mt-2 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-full transition"
                  >
                    Mark as Sold
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal code remains unchanged */}
      {showNewItemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-warm-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-warm-600 bg-clip-text text-transparent">List an Item</h2>
            </div>
            <form onSubmit={handleCreateItem} className="space-y-4">
              <input name="title" value={newItem.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded-xl" required />
              <textarea name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded-xl" required />
              <input name="price" type="number" value={newItem.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded-xl" required />
              <input name="original_price" type="number" value={newItem.original_price} onChange={handleChange} placeholder="Original Price" className="w-full border p-2 rounded-xl" />
              <select name="condition" value={newItem.condition} onChange={handleChange} className="w-full border p-2 rounded-xl" required>
                <option value="">Condition</option>
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
              <input name="category" value={newItem.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded-xl" />
              <input name="location" value={newItem.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded-xl" />
              <input name="email" type="email" value={newItem.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded-xl" required />
              <input name="phone_number" value={newItem.phone_number} onChange={handleChange} placeholder="Phone Number" className="w-full border p-2 rounded-xl" required />
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setShowNewItemModal(false)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-2xl shadow-lg">List Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;

