
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Star } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import AdminHeader from '@/components/AdminHeader.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let filterStr = '';
      if (categoryFilter !== 'All') {
        filterStr = `category = "${categoryFilter}"`;
      }
      if (searchTerm) {
        const searchFilter = `title ~ "${searchTerm}"`;
        filterStr = filterStr ? `${filterStr} && ${searchFilter}` : searchFilter;
      }

      const records = await pb.collection('posts').getFullList({
        sort: '-created',
        filter: filterStr,
        $autoCancel: false
      });
      setPosts(records);
    } catch (error) {
      toast.error('Failed to fetch posts');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPosts();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, categoryFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await pb.collection('posts').delete(id, { $autoCancel: false });
        toast.success('Post deleted successfully');
        fetchPosts();
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const toggleFeatured = async (post) => {
    try {
      await pb.collection('posts').update(post.id, {
        featured: !post.featured
      }, { $autoCancel: false });
      toast.success(`Post ${post.featured ? 'unfeatured' : 'featured'} successfully`);
      fetchPosts();
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - MBC Pulse</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Admin dashboard - not indexed" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 admin-container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Posts</h1>
            <Link to="/admin/posts/new">
              <Button>
                <Plus size={16} className="mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>

          <div className="admin-card mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="IPL">IPL</SelectItem>
                  <SelectItem value="Match Prediction">Match Prediction</SelectItem>
                  <SelectItem value="Teams">Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="admin-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Loading posts...
                      </TableCell>
                    </TableRow>
                  ) : posts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No posts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium max-w-[300px] truncate">
                          {post.title}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {post.category}
                          </span>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          {new Date(post.publishDate || post.created).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{post.views || 0}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFeatured(post)}
                              title={post.featured ? "Unfeature" : "Feature"}
                              className={post.featured ? "text-yellow-500" : "text-muted-foreground"}
                            >
                              <Star size={16} fill={post.featured ? "currentColor" : "none"} />
                            </Button>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" title="View">
                                <Eye size={16} />
                              </Button>
                            </Link>
                            <Link to={`/admin/posts/${post.id}/edit`}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit size={16} />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(post.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
