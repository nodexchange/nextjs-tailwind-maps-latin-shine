import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { parse } from 'cookie';

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies.cms_session;

  if (!session) {
    return {
      redirect: {
        destination: '/cms/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = Buffer.from(session, 'base64').toString('utf8');
    const [username] = decoded.split(':');
    if (username !== process.env.CMS_USERNAME) {
      return {
        redirect: {
          destination: '/cms/login',
          permanent: false,
        },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/cms/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const ARTICLE_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'author', label: 'Author', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true },
  { name: 'short', label: 'Short Description', type: 'textarea', required: true },
  { name: 'text', label: 'Full Text', type: 'textarea', required: true },
  { name: 'href', label: 'URL Slug', type: 'text', required: true },
  { name: 'img', label: 'Image', type: 'image', required: true },
  { name: 'button', label: 'Button Text', type: 'text', required: false },
  { name: 'buttonUrl', label: 'Button URL', type: 'text', required: false },
];

const EVENT_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'author', label: 'Author', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true },
  { name: 'price', label: 'Price', type: 'text', required: true },
  { name: 'short', label: 'Short Description', type: 'textarea', required: true },
  { name: 'text', label: 'Full Text', type: 'textarea', required: true },
  { name: 'href', label: 'URL Slug', type: 'text', required: true },
  { name: 'img', label: 'Image', type: 'image', required: true },
  { name: 'button', label: 'Button Text', type: 'text', required: false },
  { name: 'buttonUrl', label: 'Button URL', type: 'text', required: false },
];

const CONTENT_SECTIONS = [
  {
    key: 'hero',
    title: 'Hero Section',
    description: 'Homepage banner - the first thing visitors see',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', hint: 'Use _ for line breaks' },
      { name: 'logoText', label: 'Logo Text', type: 'text', hint: 'Use _ for line breaks' },
      { name: 'logoWhite', label: 'Button Text', type: 'text' },
      { name: 'comment', label: 'Announcement Banner', type: 'text', hint: 'Use __ for line breaks' },
    ],
  },
  {
    key: 'main',
    title: 'Main Section',
    description: 'Homepage - below the news section',
    fields: [
      { name: 'top', label: 'Top Heading', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'text', label: 'Secondary Heading', type: 'text' },
      { name: 'final', label: 'Final Text', type: 'textarea' },
    ],
  },
  {
    key: 'locationCopy',
    title: 'Venue Location',
    description: 'Location page - venue details',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'street', label: 'Venue Name', type: 'text' },
      { name: 'body1', label: 'Address Line 1', type: 'text' },
      { name: 'body2', label: 'Address Line 2', type: 'text' },
      { name: 'body3', label: 'Postcode', type: 'text' },
      { name: 'body4', label: 'County', type: 'text' },
      { name: 'maps', label: 'Google Maps URL', type: 'text' },
      { name: 'description', label: 'Schedule Description', type: 'text' },
      { name: 'detailsText', label: 'Details Link Text', type: 'text' },
      { name: 'detailsHref', label: 'Details Link URL', type: 'text' },
      { name: 'byCarText', label: 'By Car Directions', type: 'textarea' },
      { name: 'byTrainText', label: 'By Train Directions', type: 'textarea' },
    ],
  },
  {
    key: 'instructors',
    title: 'Instructors',
    description: 'Instructors page - teacher bios',
    fields: [
      { name: 'main:', label: 'Section Title', type: 'text' },
      { name: 'first', label: 'Introduction', type: 'textarea' },
      { name: 'second', label: 'Martin Bio', type: 'textarea' },
      { name: 'third', label: 'Alyssa Bio', type: 'textarea' },
    ],
  },
  {
    key: 'about',
    title: 'About Bachata',
    description: 'About section - What is Bachata',
    fields: [
      { name: 'main:', label: 'Section Title', type: 'text' },
      { name: 'first', label: 'First Paragraph', type: 'textarea' },
      { name: 'second', label: 'Second Paragraph', type: 'textarea' },
      { name: 'third', label: 'Link Label', type: 'text' },
      { name: 'link', label: 'Link URL', type: 'text' },
    ],
  },
  {
    key: 'footer',
    title: 'Footer',
    description: 'Site-wide footer text',
    fields: [
      { name: 'line1', label: 'Line 1', type: 'text' },
      { name: 'line2', label: 'Line 2', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
];

// Image Picker Modal Component
function ImagePickerModal({ isOpen, onClose, onSelect, images, onUpload, uploading }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Select or Upload Image</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="p-6 border-b border-gray-700">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload New Image'}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {images.uploads?.length > 0 && (
            <>
              <h4 className="text-white font-medium mb-3">Uploaded Images</h4>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                {images.uploads.map(img => (
                  <button
                    key={img.path}
                    onClick={() => onSelect(img.path)}
                    className="aspect-square bg-gray-700 rounded overflow-hidden hover:ring-2 hover:ring-amber-500 transition-all"
                  >
                    <img src={img.path} alt={img.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {images.images?.length > 0 && (
            <>
              <h4 className="text-white font-medium mb-3">Existing Images</h4>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {images.images.map(img => (
                  <button
                    key={img.path}
                    onClick={() => onSelect(img.path)}
                    className="aspect-square bg-gray-700 rounded overflow-hidden hover:ring-2 hover:ring-amber-500 transition-all"
                  >
                    <img src={img.path} alt={img.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {!images.uploads?.length && !images.images?.length && (
            <p className="text-gray-400 text-center py-8">No images found. Upload one to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Image Field Component
function ImageField({ name, value, onChange, required }) {
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState({ uploads: [], images: [] });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/cms/images');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange({ target: { name, value: data.path } });
        setShowPicker(false);
        fetchImages();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = (path) => {
    onChange({ target: { name, value: path } });
    setShowPicker(false);
  };

  const openPicker = () => {
    fetchImages();
    setShowPicker(true);
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder="/uploads/image.jpg or /images/image.jpg"
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="button"
            onClick={openPicker}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors whitespace-nowrap"
          >
            Browse
          </button>
        </div>
        {value && (
          <div className="flex items-center gap-3">
            <img src={value} alt="Preview" className="h-20 w-20 object-cover rounded border border-gray-600" />
            <span className="text-gray-400 text-sm truncate">{value}</span>
          </div>
        )}
      </div>

      <ImagePickerModal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        onSelect={handleSelect}
        images={images}
        onUpload={handleUpload}
        uploading={uploading}
      />
    </>
  );
}

export default function CMSDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('news');
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [articlesRes, eventsRes, contentRes] = await Promise.all([
        fetch('/api/cms/articles'),
        fetch('/api/cms/events'),
        fetch('/api/cms/content'),
      ]);

      if (articlesRes.status === 401 || eventsRes.status === 401 || contentRes.status === 401) {
        router.push('/cms/login');
        return;
      }

      const articlesData = await articlesRes.json();
      const eventsData = await eventsRes.json();
      const contentData = await contentRes.json();

      setArticles(articlesData.articles || []);
      setEvents(eventsData.events || []);
      setSiteContent(contentData || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'cms_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/cms/login');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingItem(null);
    const fields = activeTab === 'news' ? ARTICLE_FIELDS : EVENT_FIELDS;
    const initialData = {};
    fields.forEach(f => {
      initialData[f.name] = f.type === 'date' ? new Date().toISOString().split('T')[0] : '';
    });
    setFormData(initialData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const endpoint = activeTab === 'news' ? '/api/cms/articles' : '/api/cms/events';
      const method = isAdding ? 'POST' : 'PUT';
      const body = activeTab === 'news'
        ? { article: formData }
        : { event: formData };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage('Saved successfully!');
        handleCancel();
        fetchData();
      } else {
        const data = await res.json();
        setMessage(data.error || 'Save failed');
      }
    } catch (error) {
      setMessage('An error occurred while saving');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = activeTab === 'news' ? '/api/cms/articles' : '/api/cms/events';
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id }),
      });

      if (res.ok) {
        setMessage('Deleted successfully!');
        fetchData();
      } else {
        const data = await res.json();
        setMessage(data.error || 'Delete failed');
      }
    } catch (error) {
      setMessage('An error occurred while deleting');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContentChange = (sectionKey, fieldName, value) => {
    setSiteContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [fieldName]: value,
      },
    }));
  };

  const handleSaveSection = async (sectionKey) => {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionKey,
          content: siteContent[sectionKey],
        }),
      });

      if (res.ok) {
        setMessage(`${sectionKey} saved successfully!`);
      } else {
        const data = await res.json();
        setMessage(data.error || 'Save failed');
      }
    } catch (error) {
      setMessage('An error occurred while saving');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const currentFields = activeTab === 'news' ? ARTICLE_FIELDS : EVENT_FIELDS;
  const currentItems = activeTab === 'news' ? articles : events;

  const renderField = (field) => {
    if (field.type === 'image') {
      return (
        <ImageField
          name={field.name}
          value={formData[field.name] || ''}
          onChange={handleChange}
          required={field.required}
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <textarea
          name={field.name}
          value={formData[field.name] || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-amber-500"
        />
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name] || ''}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-amber-500"
      />
    );
  };

  return (
    <>
      <Head>
        <title>CMS Dashboard - Latin Shine</title>
      </Head>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Latin Shine CMS</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Message */}
          {message && (
            <div className={`mb-4 px-4 py-2 rounded ${
              message.includes('success')
                ? 'bg-green-500/20 border border-green-500 text-green-300'
                : 'bg-red-500/20 border border-red-500 text-red-300'
            }`}>
              {message}
            </div>
          )}

          {/* Tabs */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab('news'); handleCancel(); }}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  activeTab === 'news'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                News
              </button>
              <button
                onClick={() => { setActiveTab('events'); handleCancel(); }}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  activeTab === 'events'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => { setActiveTab('content'); handleCancel(); }}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Site Content
              </button>
            </div>
            {(activeTab === 'news' || activeTab === 'events') && (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
              >
                + Add New
              </button>
            )}
          </div>

          {/* Site Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-gray-400 text-center py-8">Loading...</div>
              ) : (
                CONTENT_SECTIONS.map(section => (
                  <div key={section.key} className="bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750 transition-colors"
                    >
                      <div className="text-left">
                        <h3 className="text-white font-medium">{section.title}</h3>
                        <p className="text-gray-400 text-sm">{section.description}</p>
                      </div>
                      <span className="text-gray-400 text-xl">
                        {expandedSections[section.key] ? '−' : '+'}
                      </span>
                    </button>

                    {expandedSections[section.key] && (
                      <div className="px-6 pb-6 border-t border-gray-700">
                        <div className="grid grid-cols-1 gap-4 mt-4">
                          {section.fields.map(field => (
                            <div key={field.name}>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                {field.label}
                                {field.hint && (
                                  <span className="text-gray-500 font-normal ml-2">({field.hint})</span>
                                )}
                              </label>
                              {field.type === 'textarea' ? (
                                <textarea
                                  value={siteContent[section.key]?.[field.name] || ''}
                                  onChange={(e) => handleContentChange(section.key, field.name, e.target.value)}
                                  rows={4}
                                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-amber-500"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={siteContent[section.key]?.[field.name] || ''}
                                  onChange={(e) => handleContentChange(section.key, field.name, e.target.value)}
                                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-amber-500"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => handleSaveSection(section.key)}
                          disabled={saving}
                          className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium transition-colors disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : `Save ${section.title}`}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* News/Events Edit/Add Form */}
          {(activeTab === 'news' || activeTab === 'events') && (editingItem || isAdding) && (
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-white mb-4">
                {isAdding ? `Add New ${activeTab === 'news' ? 'Article' : 'Event'}` : 'Edit Item'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFields.map(field => (
                  <div key={field.name} className={field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* News/Events List */}
          {(activeTab === 'news' || activeTab === 'events') && (
            loading ? (
              <div className="text-gray-400 text-center py-8">Loading...</div>
            ) : (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {currentItems.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No items found</div>
                ) : (
                  <div className="divide-y divide-gray-700">
                    {currentItems.map(item => (
                      <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-750">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {item.img && (
                            <img src={item.img} alt="" className="w-12 h-12 object-cover rounded" />
                          )}
                          <div className="min-w-0">
                            <h3 className="text-white font-medium truncate">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.date} - {item.category}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
