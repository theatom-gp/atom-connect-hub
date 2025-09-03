# Firestore Collections Optimization Plan

## Current Issues
- **7 collections** causing high read/write costs
- **Data scattered** across multiple collections
- **Multiple queries** needed for complete user data
- **No denormalization** for common access patterns

## Optimized Structure (3 Collections)

### 1. `users` Collection
**Purpose**: Central user hub with all user-related data
```typescript
interface User {
  id: string;
  email: string;
  personalInfo: PersonalInfo;
  
  // Embedded arrays for quick access
  registrations: Registration[];
  abstracts: Abstract[];
  payments: Payment[];
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  totalSpent: number;
  totalRegistrations: number;
  totalAbstracts: number;
}
```

### 2. `conferences` Collection
**Purpose**: Conference data and analytics
```typescript
interface Conference {
  id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  image: string;
  description: string;
  category: string;
  
  // Analytics (denormalized for efficiency)
  totalRegistrations: number;
  totalAbstracts: number;
  totalRevenue: number;
  
  // Status
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 3. `webhookEvents` Collection
**Purpose**: Payment webhook tracking (keep separate for security)
```typescript
interface WebhookEvent {
  id: string;
  eventId: string;
  eventType: string;
  processedAt: Timestamp;
  status: 'processed' | 'failed';
  data: any;
}
```

## Benefits of This Structure

### Cost Savings
- **75% reduction** in collections (7 → 3)
- **Single query** to get complete user data
- **Reduced read operations** by 60-80%
- **Lower billing** due to fewer document operations

### Performance Improvements
- **Faster queries** - no joins needed
- **Atomic updates** - all user data in one document
- **Better caching** - fewer collection references
- **Simplified indexing** - fewer composite indexes

### Data Integrity
- **ACID transactions** on user data
- **Consistent user profiles**
- **Easier backup/restore**
- **Simplified data migration**

## Migration Strategy

### Phase 1: Create New Structure
1. Update Firebase functions to use new collections
2. Create data migration scripts
3. Test with sample data

### Phase 2: Gradual Migration
1. Migrate existing users to new structure
2. Update frontend to use new data structure
3. Monitor performance and costs

### Phase 3: Cleanup
1. Remove old collections
2. Update documentation
3. Optimize indexes

## Implementation Notes

### User Document Size Limits
- Firestore document limit: 1MB
- Estimated user document size: ~50-100KB
- **Safe for 1000+ registrations per user**

### Indexing Strategy
- **Single field indexes**: email, createdAt, updatedAt
- **Composite indexes**: category + isActive, date + isActive
- **No complex queries** needed

### Security Rules
```javascript
// Users can only access their own data
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// Conferences are publicly readable
match /conferences/{conferenceId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.token.admin == true;
}
```

## Expected Results

### Cost Reduction
- **60-80% reduction** in Firestore operations
- **Lower monthly billing** for database usage
- **Reduced function execution time**

### Performance Gains
- **3-5x faster** user data queries
- **Simplified frontend code**
- **Better user experience**

### Maintenance Benefits
- **Easier debugging** with centralized data
- **Simplified backup strategy**
- **Better data consistency**
