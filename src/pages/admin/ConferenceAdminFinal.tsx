import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Search, Calendar, MapPin, Users, Shield } from 'lucide-react';
import { Conference } from '@/lib/conferences';

// Mock data for testing
const mockConferences: Conference[] = [
  {
    id: 'ai-summit-2025',
    title: 'AI Innovation Summit 2025',
    description: 'Explore the future of artificial intelligence and machine learning',
    date: '2025-11-15',
    venue: 'Convention Center',
    location: 'New York, USA',
    category: 'AI & Technology',
    image: '/src/assets/aisummit/bg.avif',
    keywords: 'AI, machine learning, artificial intelligence, innovation',
    price: 299,
    duration: '3 days',
    attendees: '1000+',
    speakers: [
      {
        name: 'Dr. Jane Smith',
        title: 'AI Research Director',
        organization: 'Tech Corp',
        image: '/src/assets/aisummit/speaker-1.jpg'
      }
    ]
  },
  {
    id: 'healthcare-revolution-2025',
    title: 'Global Healthcare Revolution 2025',
    description: 'Advancing healthcare through technology and innovation',
    date: '2025-12-10',
    venue: 'Medical Center',
    location: 'London, UK',
    category: 'Healthcare',
    image: '/src/assets/globalhealthcarerevolution/bg.jpg',
    keywords: 'healthcare, medical technology, innovation',
    price: 199,
    duration: '2 days',
    attendees: '800+'
  }
];

const ConferenceAdminFinal = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingConference, setIsAddingConference] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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
    attendees: '500+'
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
    // Load mock data
    setConferences(mockConferences);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@atomconferences.com' && password === 'AtomAdmin2025!') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const filteredConferences = conferences.filter(conference => {
    const matchesSearch = conference.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conference.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || conference.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddConference = () => {
    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    const newConference: Conference = {
      id: formData.id || formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      venue: formData.venue,
      location: formData.location,
      category: formData.category,
      image: formData.image,
      keywords: formData.keywords,
      price: formData.price,
      duration: formData.duration,
      attendees: formData.attendees
    };

    setConferences([...conferences, newConference]);
    setIsAddingConference(false);
    resetForm();
    alert('Conference added successfully!');
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
      attendees: '500+'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-gray-600">Enter your credentials to access the admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@atomconferences.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials:</h4>
              <p className="text-sm text-blue-700">
                <strong>Email:</strong> admin@atomconferences.com<br />
                <strong>Password:</strong> AtomAdmin2025!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Authenticated
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="py-8">
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

          {/* Add Conference Modal */}
          {isAddingConference && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Add New Conference</CardTitle>
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

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingConference(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddConference}
                      className="bg-primary"
                    >
                      Add Conference
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceAdminFinal;
