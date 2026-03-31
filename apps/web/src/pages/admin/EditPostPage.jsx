
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import AdminHeader from '@/components/AdminHeader.jsx';
import TiptapEditor from '@/components/TiptapEditor.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Cricket',
    excerpt: '',
    content: '',
    author: '',
    tags: '',
    publishDate: '',
    featured: false,
    metaTitle: '',
    metaDescription: ''
  });
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('posts').getOne(id, { $autoCancel: false });
        setFormData({
          title: record.title || '',
          slug: record.slug || '',
          category: record.category || 'Cricket',
          excerpt: record.excerpt || '',
          content: record.content || '',
          author: record.author || '',
          tags: record.tags || '',
          publishDate: record.publishDate ? record.publishDate.split(' ')[0] : '',
          featured: record.featured || false,
          metaTitle: record.metaTitle || '',
          metaDescription: record.metaDescription || ''
        });
        if (record.coverImage) {
          setCurrentImage(pb.files.getUrl(record, record.coverImage));
        }
      } catch (error) {
        toast.error('Failed to load post');
        navigate('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      data.append('readTime', calculateReadTime(formData.content));
      
      if (coverImage) {
        data.append('coverImage', coverImage);
      }

      await pb.collection('posts').update(id, data, { $autoCancel: false });
      toast.success('Post updated successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Edit Post - MBC Pulse Admin</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Edit blog post - not indexed" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 admin-container">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="mr-4">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Edit Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content *</Label>
                  <TiptapEditor
                    content={formData.content}
                    onChange={(content) => setFormData({...formData, content})}
                  />
                </div>
              </div>

              <div className="admin-card space-y-6">
                <h3 className="text-lg font-semibold">SEO Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="admin-card space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-base">Featured Post</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cricket">Cricket</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="IPL">IPL</SelectItem>
                      <SelectItem value="Match Prediction">Match Prediction</SelectItem>
                      <SelectItem value="Teams">Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  {currentImage && (
                    <div className="mb-2">
                      <img src={currentImage} alt="Current cover" className="w-full h-32 object-cover rounded-md" />
                    </div>
                  )}
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Save size={16} className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Update Post'}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default EditPostPage;
