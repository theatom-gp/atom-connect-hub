import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Search, Calendar, MapPin, Users } from 'lucide-react';
import { conferenceManager, ConferenceFormData } from '@/lib/conferenceManager';
import { Conference } from '@/lib/conferences';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const ConferenceAdmin = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingConference, setIsAddingConference] = useState(false);
  const [editingConference, setEditingConference] = useState<Conference | null>(null);
  const [formData, setFormData] = useState<ConferenceFormData>({
    id: '',
    title: '',
    description: '',
    date: '',
    venue: '',
    location: '',
    category: '',
    image: '',
    keywords: '',
    price: 0,
    duration: '3 days',
    attendees: '500+',
    speakers: []
  });

  const categories = [
    'AI & Technology',
    'Healthcare',
    'Finance',
    'Science',
    'Engineering',
    'Education',
    'Business',
    'Other'
  ];

  useEffect(() => {
    loadConferences();
  }, []);

  const loadConferences = () => {
    const allConferences = conferenceManager.getAllConferences();
    setConferences(allConferences);
  };

  const filteredConferences = conferences.filter(conference => {
    const matchesSearch = conference.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conference.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || conference.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddConference = async () => {
    const validation = conferenceManager.validateConferenceData(formData);
    
    if (!validation.isValid) {
      alert('Please fix the following errors:\n' + validation.errors.join('\n'));
      return;
    }

    try {
      const newConference = await conferenceManager.addConference(formData);
      setConferences([...conferences, newConference]);
      setIsAddingConference(false);
      resetForm();
      alert('Conference added successfully!');
    } catch (error) {
      alert('Error adding conference: ' + error);
    }
  };

  const handleUpdateConference = async () => {
    if (!editingConference) return;

    const validation = conferenceManager.validateConferenceData(formData);
    
    if (!validation.isValid) {
      alert('Please fix the following errors:\n' + validation.errors.join('\n'));
      return;
    }

    try {
      const updatedConference = await conferenceManager.updateConference(editingConference.id, formData);
      if (updatedConference) {
        setConferences(conferences.map(conf => 
          conf.id === editingConference.id ? updatedConference : conf
        ));
        setEditingConference(null);
        resetForm();
        alert('Conference updated successfully!');
      }
    } catch (error) {
      alert('Error updating conference: ' + error);
    }
  };

  const handleDeleteConference = async (id: string) => {
    if (!confirm('Are you sure you want to delete this conference?')) return;

    try {
      const success = await conferenceManager.deleteConference(id);
      if (success) {
        setConferences(conferences.filter(conf => conf.id !== id));
        alert('Conference deleted successfully!');
      }
    } catch (error) {
      alert('Error deleting conference: ' + error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      date: '',
      venue: '',
      location: '',
      category: '',
      image: '',
      keywords: '',
      price: 0,
      duration: '3 days',
      attendees: '500+',
      speakers: []
    });
  };

  const startEditing = (conference: Conference) => {
    setEditingConference(conference);
    setFormData({
      id: conference.id,
      title: conference.title,
      description: conference.description,
      date: conference.date,
      venue: (conference as any).venue || '',
      location: conference.location,
      category: conference.category,
      image: conference.image,
      keywords: conference.keywords,
      price: conference.price || 0,
      duration: conference.duration || '3 days',
      attendees: conference.attendees || '500+',
      speakers: conference.speakers || []
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Conference Management</h1>
            <p className="text-gray-600">Manage your conference portfolio</p>
          </div>
          <Button onClick={() => setIsAddingConference(true)} className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Conference
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">Search Conferences</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Filter by Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conferences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConferences.map((conference, index) => (
            <motion.div
              key={conference.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{conference.title}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {conference.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditing(conference)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteConference(conference.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {conference.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(conference.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{conference.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{conference.attendees || '500+'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Conference Modal */}
        {(isAddingConference || editingConference) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingConference ? 'Edit Conference' : 'Add New Conference'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Conference title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Conference description"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Conference venue"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image">Image URL *</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Image URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="3 days"
                    />
                  </div>
                  <div>
                    <Label htmlFor="attendees">Expected Attendees</Label>
                    <Input
                      id="attendees"
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                      placeholder="500+"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingConference(false);
                      setEditingConference(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editingConference ? handleUpdateConference : handleAddConference}
                    className="bg-primary"
                  >
                    {editingConference ? 'Update Conference' : 'Add Conference'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ConferenceAdmin;
