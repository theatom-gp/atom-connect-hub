// Conference Management System
// Handles dynamic conference creation, updates, and deletion

import { Conference } from './conferences';

export interface ConferenceFormData {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  location: string;
  category: string;
  image: string;
  keywords: string;
  price?: number;
  duration?: string;
  attendees?: string;
  speakers?: Array<{
    name: string;
    title: string;
    organization: string;
    image: string;
  }>;
}

export class ConferenceManager {
  private static instance: ConferenceManager;
  private conferences: Conference[] = [];

  private constructor() {
    this.loadConferences();
  }

  public static getInstance(): ConferenceManager {
    if (!ConferenceManager.instance) {
      ConferenceManager.instance = new ConferenceManager();
    }
    return ConferenceManager.instance;
  }

  // Load conferences from data source
  private loadConferences(): void {
    // In a real app, this would load from Firebase/database
    this.conferences = require('./conferences').conferences;
  }

  // Get all conferences
  public getAllConferences(): Conference[] {
    return this.conferences;
  }

  // Get conference by ID
  public getConferenceById(id: string): Conference | undefined {
    return this.conferences.find(conf => conf.id === id);
  }

  // Get conferences by category
  public getConferencesByCategory(category: string): Conference[] {
    return this.conferences.filter(conf => conf.category === category);
  }

  // Get upcoming conferences
  public getUpcomingConferences(): Conference[] {
    const now = new Date();
    return this.conferences
      .filter(conf => new Date(conf.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // Get past conferences
  public getPastConferences(): Conference[] {
    const now = new Date();
    return this.conferences
      .filter(conf => new Date(conf.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Search conferences
  public searchConferences(query: string): Conference[] {
    const lowercaseQuery = query.toLowerCase();
    return this.conferences.filter(conf =>
      conf.title.toLowerCase().includes(lowercaseQuery) ||
      conf.description.toLowerCase().includes(lowercaseQuery) ||
      conf.category.toLowerCase().includes(lowercaseQuery) ||
      conf.keywords.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Add new conference
  public async addConference(conferenceData: ConferenceFormData): Promise<Conference> {
    const newConference: Conference = {
      id: conferenceData.id,
      title: conferenceData.title,
      description: conferenceData.description,
      date: conferenceData.date,
      venue: conferenceData.venue,
      location: conferenceData.location,
      category: conferenceData.category,
      image: conferenceData.image,
      keywords: conferenceData.keywords,
      price: conferenceData.price,
      duration: conferenceData.duration,
      attendees: conferenceData.attendees,
      speakers: conferenceData.speakers
    };

    this.conferences.push(newConference);
    
    // In a real app, save to database
    await this.saveToDatabase(newConference);
    
    return newConference;
  }

  // Update existing conference
  public async updateConference(id: string, updates: Partial<ConferenceFormData>): Promise<Conference | null> {
    const index = this.conferences.findIndex(conf => conf.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedConference = { ...this.conferences[index], ...updates };
    this.conferences[index] = updatedConference;
    
    // In a real app, update in database
    await this.updateInDatabase(id, updates);
    
    return updatedConference;
  }

  // Delete conference
  public async deleteConference(id: string): Promise<boolean> {
    const index = this.conferences.findIndex(conf => conf.id === id);
    
    if (index === -1) {
      return false;
    }

    this.conferences.splice(index, 1);
    
    // In a real app, delete from database
    await this.deleteFromDatabase(id);
    
    return true;
  }

  // Generate conference ID from title
  public generateConferenceId(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Validate conference data
  public validateConferenceData(data: ConferenceFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (!data.date || isNaN(Date.parse(data.date))) {
      errors.push('Valid date is required');
    }

    if (!data.venue || data.venue.trim().length === 0) {
      errors.push('Venue is required');
    }

    if (!data.location || data.location.trim().length === 0) {
      errors.push('Location is required');
    }

    if (!data.category || data.category.trim().length === 0) {
      errors.push('Category is required');
    }

    if (!data.image || data.image.trim().length === 0) {
      errors.push('Image is required');
    }

    if (data.price && data.price < 0) {
      errors.push('Price must be positive');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Private methods for database operations (mock implementations)
  private async saveToDatabase(conference: Conference): Promise<void> {
    // Mock database save
    console.log('Saving conference to database:', conference);
    // In real app: await admin.firestore().collection('conferences').doc(conference.id).set(conference);
  }

  private async updateInDatabase(id: string, updates: Partial<ConferenceFormData>): Promise<void> {
    // Mock database update
    console.log('Updating conference in database:', id, updates);
    // In real app: await admin.firestore().collection('conferences').doc(id).update(updates);
  }

  private async deleteFromDatabase(id: string): Promise<void> {
    // Mock database delete
    console.log('Deleting conference from database:', id);
    // In real app: await admin.firestore().collection('conferences').doc(id).delete();
  }
}

// Export singleton instance
export const conferenceManager = ConferenceManager.getInstance();
