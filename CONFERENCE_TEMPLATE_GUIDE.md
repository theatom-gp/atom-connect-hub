# Conference Template Usage Guide

## 🎯 **What is Conference Template?**

The `ConferenceTemplate` is a **reusable component** that automatically generates beautiful, SEO-optimized conference pages from data. It eliminates the need to create individual conference pages manually.

## 🚀 **How to Use Conference Template**

### **1. Basic Usage (Automatic)**
```typescript
// ConferenceTemplate is automatically used by ConferenceRouter
// No manual setup needed - just add conference data to conferences.ts
```

### **2. Manual Usage (Custom Content)**
```typescript
import ConferenceTemplate from '@/components/conference/ConferenceTemplate';
import { Conference } from '@/lib/conferences';

const MyCustomConference = () => {
  const conference: Conference = {
    id: 'my-conference',
    title: 'My Custom Conference',
    description: 'This is a custom conference with special content',
    date: '2025-12-01',
    location: 'New York',
    category: 'Technology',
    image: '/path/to/image.jpg',
    keywords: 'tech, innovation, future'
  };

  return (
    <ConferenceTemplate conference={conference}>
      {/* Add custom content here */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Special Announcement</h2>
          <p className="text-lg">This conference has special features!</p>
        </div>
      </section>
    </ConferenceTemplate>
  );
};
```

### **3. Advanced Usage (Multiple Custom Sections)**
```typescript
import ConferenceTemplate from '@/components/conference/ConferenceTemplate';

const AdvancedConference = () => {
  const conference = getConferenceData();

  return (
    <ConferenceTemplate conference={conference}>
      {/* Custom Workshop Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Workshops</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">AI Workshop</h3>
              <p>Learn the latest in AI technology</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Blockchain Workshop</h3>
              <p>Understand blockchain fundamentals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Sponsors Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white/10 p-4 rounded">Sponsor 1</div>
            <div className="bg-white/10 p-4 rounded">Sponsor 2</div>
            <div className="bg-white/10 p-4 rounded">Sponsor 3</div>
            <div className="bg-white/10 p-4 rounded">Sponsor 4</div>
          </div>
        </div>
      </section>
    </ConferenceTemplate>
  );
};
```

## 🎨 **Template Features**

### **Automatic Features:**
- ✅ **Hero Section** with countdown timer
- ✅ **Conference Details** (date, location, price, etc.)
- ✅ **Speakers Section** (if speakers data provided)
- ✅ **SEO Optimization** with structured data
- ✅ **Responsive Design** for all devices
- ✅ **Animations** with Framer Motion
- ✅ **Call-to-Action** buttons

### **Customizable Areas:**
- 🎯 **Custom Content** between sections
- 🎯 **Additional Sections** for special content
- 🎯 **Styling** through CSS classes
- 🎯 **Layout** modifications

## 📊 **Template Structure**

```
ConferenceTemplate
├── SEO Component (automatic)
├── Hero Section (automatic)
│   ├── Background Image
│   ├── Title & Description
│   ├── Countdown Timer
│   └── CTA Buttons
├── Conference Details (automatic)
│   ├── Date, Location, Price
│   └── Conference Image
├── Speakers Section (automatic if data provided)
├── CUSTOM CONTENT (your custom sections)
└── CTA Section (automatic)
```

## 🔧 **Configuration Options**

### **Conference Data Structure:**
```typescript
interface Conference {
  id: string;                    // Unique identifier
  title: string;                 // Conference title
  description: string;           // Conference description
  date: string;                  // Conference date (YYYY-MM-DD)
  location: string;              // Conference location
  category: string;              // Conference category
  image: string;                 // Hero image URL
  keywords: string;              // SEO keywords
  price?: number;                // Optional price
  duration?: string;             // Optional duration
  attendees?: string;            // Expected attendees
  speakers?: Array<{             // Optional speakers
    name: string;
    title: string;
    organization: string;
    image: string;
  }>;
}
```

## 🎯 **Use Cases**

### **1. Standard Conference Page**
```typescript
// Just add to conferences.ts - everything else is automatic
{
  id: 'tech-summit-2025',
  title: 'Tech Summit 2025',
  description: 'The biggest tech conference of the year',
  date: '2025-06-15',
  location: 'San Francisco',
  category: 'Technology',
  image: '/images/tech-summit.jpg',
  keywords: 'technology, innovation, AI, blockchain'
}
```

### **2. Conference with Custom Content**
```typescript
// Use ConferenceTemplate with custom sections
<ConferenceTemplate conference={conference}>
  <CustomWorkshopSection />
  <CustomSponsorSection />
  <CustomScheduleSection />
</ConferenceTemplate>
```

### **3. Conference with Special Features**
```typescript
// Override default behavior with custom implementation
const SpecialConference = () => {
  return (
    <div>
      <CustomHeroSection />
      <ConferenceTemplate conference={conference}>
        <CustomContent />
      </ConferenceTemplate>
    </div>
  );
};
```

## 🚀 **Best Practices**

### **1. Data Consistency**
- Always provide complete conference data
- Use consistent image sizes (1200x630 recommended)
- Include relevant keywords for SEO

### **2. Custom Content**
- Keep custom sections focused and relevant
- Use consistent styling with the template
- Test on mobile devices

### **3. Performance**
- Optimize images before adding
- Use lazy loading for heavy content
- Minimize custom JavaScript

## 🔍 **Examples in Action**

### **Example 1: AI Summit**
```typescript
// conferences.ts
{
  id: 'ai-summit-2025',
  title: 'AI Innovation Summit 2025',
  description: 'Explore the future of artificial intelligence',
  date: '2025-11-15',
  location: 'New York',
  category: 'AI & Technology',
  image: '/images/ai-summit.jpg',
  keywords: 'AI, machine learning, artificial intelligence, innovation',
  price: 299,
  duration: '3 days',
  attendees: '1000+',
  speakers: [
    {
      name: 'Dr. Jane Smith',
      title: 'AI Research Director',
      organization: 'Tech Corp',
      image: '/images/speaker1.jpg'
    }
  ]
}
```

### **Example 2: Healthcare Conference with Custom Content**
```typescript
// Custom conference page
const HealthcareConference = () => {
  const conference = getHealthcareConferenceData();

  return (
    <ConferenceTemplate conference={conference}>
      {/* Custom Medical Equipment Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Medical Equipment Showcase</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">MRI Technology</h3>
              <p>Latest advances in MRI imaging</p>
            </div>
            {/* More equipment items */}
          </div>
        </div>
      </section>
    </ConferenceTemplate>
  );
};
```

## 🎉 **Benefits**

1. **Consistency** - All conferences look professional
2. **Efficiency** - No need to create individual pages
3. **SEO** - Automatic optimization for search engines
4. **Maintenance** - Update template once, affects all conferences
5. **Scalability** - Add unlimited conferences easily
6. **Customization** - Add unique content when needed

## 🚀 **Getting Started**

1. **Add Conference Data** to `conferences.ts`
2. **Access via URL** `/conference/your-conference-id`
3. **Customize if needed** using ConferenceTemplate component
4. **Manage via Admin** at `/admin/conferences`

The template handles everything automatically - you just need to provide the data! 🎯
