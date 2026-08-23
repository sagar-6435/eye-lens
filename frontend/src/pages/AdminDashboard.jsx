import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../components/PopupContext';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', originalPrice: '', adminId: '', image: '', images: [] });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/signin');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Products
      const prodRes = await fetch('/api/products');
      const prodData = await prodRes.json();
      setProducts(prodData);

      // Fetch Orders
      const ordRes = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      const ordData = await ordRes.json();
      setOrders(ordData);

      // Fetch Categories
      const catRes = await fetch('/api/categories');
      const catData = await catRes.json();
      setCategories(catData);
    } catch (error) {
      console.error('Error fetching admin data', error);
    }
    setLoading(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/signin');
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });
        if (response.ok) {
          setProducts(products.filter(p => p._id !== id));
          showPopup('Product deleted successfully');
        } else {
          showPopup('Failed to delete product', 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ name: newCategoryName })
      });
      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data]);
        setNewCategoryName('');
        showPopup('Category added successfully');
      } else {
        const errorData = await response.json();
        showPopup(errorData.message || 'Failed to add category', 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });
        if (response.ok) {
          setCategories(categories.filter(c => c._id !== id));
          showPopup('Category deleted successfully');
        } else {
          showPopup('Failed to delete category', 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = newProduct.image;
      let finalImagesUrls = newProduct.images || [];

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
          body: formData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        } else {
          showPopup('Failed to upload main image', 'error');
          setUploading(false);
          return;
        }
      }
      
      if (imageFiles && imageFiles.length > 0) {
        const formData = new FormData();
        Array.from(imageFiles).forEach(file => {
          formData.append('images', file);
        });
        
        const uploadRes = await fetch('/api/upload/multiple', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
          body: formData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          const urls = uploadData.urls;
          finalImagesUrls = [...finalImagesUrls, ...urls];
        } else {
          showPopup('Failed to upload extra images', 'error');
          setUploading(false);
          return;
        }
      }

      const productPayload = { ...newProduct, image: finalImageUrl, images: finalImagesUrls };
      const url = isEditing ? `/api/products/${isEditing}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(productPayload)
      });

      if (response.ok) {
        const data = await response.json();
        if (isEditing) {
          setProducts(products.map(p => p._id === data._id ? data : p));
        } else {
          setProducts([...products, data]);
        }
        setShowAddModal(false);
        setIsEditing(null);
        setNewProduct({ name: '', category: '', price: '', originalPrice: '', adminId: '', image: '', images: [] });
        setImageFile(null);
        setImageFiles([]);
        showPopup(`Product ${isEditing ? 'updated' : 'added'} successfully`);
      } else {
        showPopup(`Failed to ${isEditing ? 'update' : 'add'} product`, 'error');
      }
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  const openEditModal = (product) => {
    setIsEditing(product._id);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || '',
      adminId: product.adminId || '',
      image: product.image,
      images: product.images || []
    });
    setShowAddModal(true);
  };

  if (loading) {
    return <div className="pt-24 text-center text-text-secondary">Loading dashboard...</div>;
  }

  return (
    <div className="pt-8 pb-24 px-4 w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">Manage your store operations</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-background rounded-xl text-sm font-bold shadow-md hover:bg-primary-hover transition-all"
          >
            View Website
          </button>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-background-secondary border border-border-primary rounded-xl text-sm font-medium hover:bg-border-primary transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 bg-background-secondary p-1 rounded-xl border border-border-primary inline-flex">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'orders' 
              ? 'bg-primary text-background shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'products' 
              ? 'bg-primary text-background shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'categories' 
              ? 'bg-primary text-background shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Categories
        </button>
      </div>

      {/* Content */}
      <div className="bg-background-secondary rounded-3xl p-6 border border-border-primary shadow-sm">
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-text-secondary">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-primary text-sm text-text-secondary">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} className="border-b border-border-primary/50 last:border-0">
                        <td className="py-4 text-sm font-mono text-text-secondary">{order._id.substring(18)}</td>
                        <td className="py-4 text-sm">{order.customerEmail || 'Guest'}</td>
                        <td className="py-4 text-sm font-semibold">₹{order.totalAmount}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Products Inventory</h2>
              <button onClick={() => {
                setIsEditing(null);
                setNewProduct({ name: '', category: '', price: '', originalPrice: '', adminId: '', image: '', images: [] });
                setShowAddModal(true);
              }} className="px-4 py-2 bg-primary text-background rounded-xl text-sm font-bold shadow-md hover:bg-primary-hover transition-colors">
                + Add Product
              </button>
            </div>
            
            {products.length === 0 ? (
              <p className="text-text-secondary">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map(product => (
                  <div key={product._id} className="border border-border-primary rounded-xl p-3 bg-background flex flex-col">
                    <div className="h-32 w-full rounded-lg overflow-hidden bg-background-secondary mb-3">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-sm truncate flex-1">{product.name}</h3>
                      {product.adminId && (
                        <span className="text-[10px] font-mono bg-background-secondary border border-border-primary px-1.5 py-0.5 rounded text-text-secondary ml-2 shrink-0">
                          {product.adminId}
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-xs">{product.category}</p>
                    <div className="mt-auto pt-3 flex justify-between items-center">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-xs text-text-secondary line-through">{product.originalPrice}</span>
                        )}
                        <span className="font-bold text-sm text-accent">{product.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(product)} className="text-xs text-blue-500 font-medium hover:underline">Edit</button>
                        <button onClick={() => handleDeleteProduct(product._id)} className="text-xs text-red-500 font-medium hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Manage Categories</h2>
            </div>
            
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-8">
              <input 
                type="text" 
                placeholder="New Category Name (e.g. Kids)" 
                required 
                className="flex-1 bg-background-secondary border border-border-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary" 
                value={newCategoryName} 
                onChange={e => setNewCategoryName(e.target.value)} 
              />
              <button type="submit" className="px-6 py-3 bg-primary text-background rounded-xl font-semibold shadow-md hover:bg-primary-hover transition-colors">
                Add Category
              </button>
            </form>

            {categories.length === 0 ? (
              <p className="text-text-secondary">No categories found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category._id} className="border border-border-primary rounded-xl p-4 bg-background flex justify-between items-center shadow-sm">
                    <span className="font-semibold">{category.name}</span>
                    <button onClick={() => handleDeleteCategory(category._id)} className="text-xs text-red-500 font-medium hover:underline">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="bg-background w-full max-w-md rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input type="text" placeholder="Product Name" required className="w-full bg-background-secondary border border-border-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              
              <select 
                required 
                className="w-full bg-background-secondary border border-border-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary appearance-none"
                value={newProduct.category} 
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="" disabled>Select Category</option>
                {categories.map(c => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <input type="text" placeholder="Internal Admin ID (e.g. SKU-123)" className="w-full bg-background-secondary border border-border-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={newProduct.adminId} onChange={e => setNewProduct({...newProduct, adminId: e.target.value})} />

              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Sale Price (e.g. ₹99)" required className="flex-1 bg-background-secondary border border-border-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input type="text" placeholder="Orig. Price (Optional)" className="flex-1 bg-background-secondary border border-border-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary">
                  {isEditing ? 'New Main Image (Optional)' : 'Main Product Image'}
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setImageFile(e.target.files[0])} 
                  className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-background hover:file:bg-primary-hover transition-all" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary">
                  {isEditing ? 'New Extra Images (Optional, up to 4)' : 'Extra Images (Optional, up to 4)'}
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={e => {
                    if (e.target.files.length > 4) {
                      showPopup('You can only upload up to 4 extra images', 'error');
                      e.target.value = null;
                      setImageFiles([]);
                    } else {
                      setImageFiles(e.target.files);
                    }
                  }} 
                  className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-background-secondary file:text-text-primary hover:file:bg-border-primary transition-all border border-border-primary rounded-xl p-1" 
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => {
                  setShowAddModal(false);
                  setIsEditing(null);
                }} className="flex-1 py-3 bg-background-secondary border border-border-primary rounded-xl font-semibold hover:bg-border-primary transition-colors">Cancel</button>
                <button type="submit" disabled={uploading} className="flex-1 py-3 bg-primary text-background rounded-xl font-semibold shadow-md hover:bg-primary-hover transition-colors disabled:opacity-50">
                  {uploading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
