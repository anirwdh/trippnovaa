import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../Components/AdminLogin';
import AdminHeader from '../Components/AdminHeader';

function BlogUpload() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, isInitialized } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [activeTab, setActiveTab] = useState('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    featuredImage: null,
    status: 'draft',
    author: 'Admin',
    publishDate: ''
  });

  // Mock blog data
  const blogs = [
    {
      id: 1,
      title: 'Ultimate Guide to Manali: A Himalayan Paradise',
      excerpt: 'Discover the best places to visit, activities to do, and tips for planning your perfect Manali adventure.',
      content: 'Manali, nestled in the heart of the Himalayas, is one of India\'s most popular hill stations...',
      category: 'Destinations',
      tags: ['Manali', 'Himalayas', 'Adventure', 'Hill Station'],
      author: 'Admin',
      publishDate: '2024-05-15',
      status: 'published',
      views: 1250,
      featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    },
    {
      id: 2,
      title: '10 Must-Visit Beaches in Goa for 2024',
      excerpt: 'From pristine white sands to vibrant party beaches, here are the top beaches you shouldn\'t miss in Goa.',
      content: 'Goa, known for its stunning coastline and vibrant culture, offers some of the best beaches in India...',
      category: 'Destinations',
      tags: ['Goa', 'Beaches', 'Travel', 'Vacation'],
      author: 'Admin',
      publishDate: '2024-05-10',
      status: 'published',
      views: 890,
      featuredImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800'
    },
    {
      id: 3,
      title: 'Budget Travel Tips for Backpackers in India',
      excerpt: 'Learn how to explore India on a budget with these essential tips and tricks for backpackers.',
      content: 'India is a backpacker\'s paradise, offering incredible experiences at affordable prices...',
      category: 'Travel Tips',
      tags: ['Budget Travel', 'Backpacking', 'Tips', 'India'],
      author: 'Admin',
      publishDate: '2024-05-08',
      status: 'draft',
      views: 0,
      featuredImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800'
    },
    {
      id: 4,
      title: 'Best Time to Visit Kashmir: A Seasonal Guide',
      excerpt: 'Plan your Kashmir trip perfectly with our comprehensive seasonal guide covering weather, activities, and more.',
      content: 'Kashmir, often called the Paradise on Earth, offers different experiences throughout the year...',
      category: 'Travel Tips',
      tags: ['Kashmir', 'Seasonal', 'Planning', 'Weather'],
      author: 'Admin',
      publishDate: '2024-05-05',
      status: 'published',
      views: 2100,
      featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    }
  ];

  const categories = ['Destinations', 'Travel Tips', 'Adventure', 'Culture', 'Food', 'Photography'];
  const tags = ['Manali', 'Goa', 'Kashmir', 'Adventure', 'Beaches', 'Himalayas', 'Budget Travel', 'Tips', 'Culture', 'Food'];

  // Handle login close
  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  // Show login modal only if not logged in and context is initialized
  useEffect(() => {
    if (isInitialized && !isAdminLoggedIn) {
      setShowLoginModal(true);
    } else if (isAdminLoggedIn) {
      setShowLoginModal(false);
    }
  }, [isAdminLoggedIn, isInitialized]);

  // Filter blogs based on search and status
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: [],
      featuredImage: null,
      status: 'draft',
      author: 'Admin',
      publishDate: ''
    });
    setShowBlogModal(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      tags: blog.tags,
      featuredImage: blog.featuredImage,
      status: blog.status,
      author: blog.author,
      publishDate: blog.publishDate
    });
    setShowBlogModal(true);
  };

  const handleSaveBlog = () => {
    // In real app, this would save to database
    console.log('Saving blog:', blogForm);
    setShowBlogModal(false);
    setEditingBlog(null);
  };

  const toggleBlogStatus = (blogId, newStatus) => {
    // In real app, this would update the database
    console.log(`Updating blog ${blogId} status to ${newStatus}`);
  };

  const deleteBlog = (blogId) => {
    // In real app, this would delete from database
    console.log(`Deleting blog ${blogId}`);
  };

  const addTag = (tag) => {
    if (!blogForm.tags.includes(tag)) {
      setBlogForm({ ...blogForm, tags: [...blogForm.tags, tag] });
    }
  };

  const removeTag = (tagToRemove) => {
    setBlogForm({ ...blogForm, tags: blogForm.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <>
      {/* Show Admin Login Modal if not logged in */}
      {showLoginModal && (
        <AdminLogin 
          isOpen={showLoginModal} 
          onClose={handleLoginClose}
        />
      )}

      {/* Show Blog Management Dashboard after successful login */}
      {isAdminLoggedIn && (
        <AdminHeader>
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-4 sm:mb-6 lg:mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto space-x-2 sm:space-x-4 lg:space-x-8 px-3 sm:px-4 lg:px-6">
                  {[
                    { id: 'create', label: 'Create Blog', icon: '✏️' },
                    { id: 'manage', label: 'Manage Blogs', icon: '📋' },
                    { id: 'categories', label: 'Categories', icon: '🏷️' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 sm:py-3 lg:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-1 sm:mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-3 sm:p-4 lg:p-6">
                {activeTab === 'create' && (
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Create New Blog Post</h2>
                    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                        <input
                          type="text"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter blog title..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                        <textarea
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          rows={3}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Brief description of the blog..."
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                          >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={blogForm.status}
                            onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blogForm.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-purple-600 hover:text-purple-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tags.filter(tag => !blogForm.tags.includes(tag)).map(tag => (
                            <button
                              key={tag}
                              onClick={() => addTag(tag)}
                              className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.files[0] })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          rows={12}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Write your blog content here..."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                        <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
                          Save as Draft
                        </button>
                        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base">
                          Publish Blog
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'manage' && (
                  <div>
                    {/* Search and Filter */}
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Search blogs by title, excerpt, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div className="sm:w-48">
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Blogs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredBlogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                          <div className="aspect-w-16 aspect-h-9">
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                {blog.category}
                              </span>
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                blog.status === 'published' 
                                  ? 'text-green-600 bg-green-100' 
                                  : 'text-yellow-600 bg-yellow-100'
                              }`}>
                                {blog.status}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {blog.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span>By {blog.author}</span>
                              <span>{blog.views} views</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditBlog(blog)}
                                className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 rounded text-sm font-medium hover:bg-blue-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => toggleBlogStatus(blog.id, blog.status === 'published' ? 'draft' : 'published')}
                                className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
                                  blog.status === 'published'
                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                }`}
                              >
                                {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                              </button>
                              <button
                                onClick={() => deleteBlog(blog.id)}
                                className="px-3 py-2 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categories.map((category, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                            <span className="text-sm text-gray-500">
                              {blogs.filter(blog => blog.category === category).length} blogs
                            </span>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium hover:bg-blue-200">
                              Edit
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <span className="text-4xl mb-2 block">➕</span>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Category</h3>
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            Create Category
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AdminHeader>
      )}
    </>
  );
}

export default BlogUpload; 