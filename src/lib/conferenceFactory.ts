// Conference Factory
// Generates conference pages automatically from data

import { Conference } from './conferences';
import { conferenceManager } from './conferenceManager';

export interface ConferencePageConfig {
  conference: Conference;
  customContent?: React.ReactNode;
  additionalSections?: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
}

export class ConferenceFactory {
  private static instance: ConferenceFactory;

  private constructor() {}

  public static getInstance(): ConferenceFactory {
    if (!ConferenceFactory.instance) {
      ConferenceFactory.instance = new ConferenceFactory();
    }
    return ConferenceFactory.instance;
  }

  // Generate conference page component
  public generateConferencePage(config: ConferencePageConfig) {
    const { conference, customContent, additionalSections } = config;
    
    return {
      id: conference.id,
      title: conference.title,
      description: conference.description,
      date: conference.date,
      location: conference.location,
      category: conference.category,
      image: conference.image,
      keywords: conference.keywords,
      price: conference.price,
      duration: conference.duration,
      attendees: conference.attendees,
      speakers: conference.speakers,
      customContent,
      additionalSections
    };
  }

  // Generate all conference pages
  public generateAllConferencePages() {
    const conferences = conferenceManager.getAllConferences();
    return conferences.map(conference => this.generateConferencePage({ conference }));
  }

  // Generate conference page from ID
  public generateConferencePageById(id: string) {
    const conference = conferenceManager.getConferenceById(id);
    if (!conference) {
      throw new Error(`Conference with ID ${id} not found`);
    }
    return this.generateConferencePage({ conference });
  }

  // Generate conference page with custom content
  public generateConferencePageWithCustomContent(
    id: string, 
    customContent: React.ReactNode,
    additionalSections?: Array<{
      id: string;
      title: string;
      content: React.ReactNode;
    }>
  ) {
    const conference = conferenceManager.getConferenceById(id);
    if (!conference) {
      throw new Error(`Conference with ID ${id} not found`);
    }
    return this.generateConferencePage({ 
      conference, 
      customContent, 
      additionalSections 
    });
  }

  // Generate conference page template
  public generateConferencePageTemplate(conference: Conference) {
    return `
import React from 'react';
import ConferenceTemplate from '@/components/conference/ConferenceTemplate';
import { Conference } from '@/lib/conferences';

const ${this.convertToComponentName(conference.title)} = () => {
  const conference: Conference = ${JSON.stringify(conference, null, 2)};

  return (
    <ConferenceTemplate conference={conference}>
      {/* Add custom content here */}
    </ConferenceTemplate>
  );
};

export default ${this.convertToComponentName(conference.title)};
    `.trim();
  }

  // Convert conference title to component name
  private convertToComponentName(title: string): string {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  // Generate conference page file
  public generateConferencePageFile(conference: Conference): string {
    const componentName = this.convertToComponentName(conference.title);
    const fileName = `${componentName}.tsx`;
    const filePath = `src/pages/conference/${fileName}`;
    
    return filePath;
  }

  // Generate all conference page files
  public generateAllConferencePageFiles(): Array<{ fileName: string; filePath: string; content: string }> {
    const conferences = conferenceManager.getAllConferences();
    return conferences.map(conference => ({
      fileName: this.convertToComponentName(conference.title) + '.tsx',
      filePath: this.generateConferencePageFile(conference),
      content: this.generateConferencePageTemplate(conference)
    }));
  }

  // Validate conference page configuration
  public validateConferencePageConfig(config: ConferencePageConfig): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.conference) {
      errors.push('Conference data is required');
    }

    if (config.conference && !config.conference.id) {
      errors.push('Conference ID is required');
    }

    if (config.conference && !config.conference.title) {
      errors.push('Conference title is required');
    }

    if (config.additionalSections) {
      config.additionalSections.forEach((section, index) => {
        if (!section.id) {
          errors.push(`Additional section ${index + 1} is missing ID`);
        }
        if (!section.title) {
          errors.push(`Additional section ${index + 1} is missing title`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const conferenceFactory = ConferenceFactory.getInstance();
