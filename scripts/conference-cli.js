#!/usr/bin/env node

// Conference CLI Tool
// Command-line interface for managing conferences

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conferencesDir = path.join(__dirname, '../src/pages/conference');
const conferencesDataFile = path.join(__dirname, '../src/lib/conferences.ts');

class ConferenceCLI {
  constructor() {
    this.conferences = this.loadConferences();
  }

  loadConferences() {
    try {
      const content = fs.readFileSync(conferencesDataFile, 'utf8');
      // Simple regex to extract conference data (in real app, use proper parsing)
      const matches = content.match(/id:\s*['"`]([^'"`]+)['"`]/g);
      return matches ? matches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]) : [];
    } catch (error) {
      console.error('Error loading conferences:', error.message);
      return [];
    }
  }

  async start() {
    console.log('🚀 Conference Management CLI');
    console.log('============================\n');

    while (true) {
      const choice = await this.showMenu();
      await this.handleChoice(choice);
    }
  }

  async showMenu() {
    console.log('\n📋 Available Commands:');
    console.log('1. List all conferences');
    console.log('2. Add new conference');
    console.log('3. Update existing conference');
    console.log('4. Delete conference');
    console.log('5. Generate conference page');
    console.log('6. Generate all conference pages');
    console.log('7. Exit');

    return new Promise((resolve) => {
      rl.question('\nEnter your choice (1-7): ', (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async handleChoice(choice) {
    switch (choice) {
      case '1':
        await this.listConferences();
        break;
      case '2':
        await this.addConference();
        break;
      case '3':
        await this.updateConference();
        break;
      case '4':
        await this.deleteConference();
        break;
      case '5':
        await this.generateConferencePage();
        break;
      case '6':
        await this.generateAllConferencePages();
        break;
      case '7':
        console.log('\n👋 Goodbye!');
        process.exit(0);
        break;
      default:
        console.log('\n❌ Invalid choice. Please try again.');
    }
  }

  async listConferences() {
    console.log('\n📚 Current Conferences:');
    console.log('======================');
    
    if (this.conferences.length === 0) {
      console.log('No conferences found.');
      return;
    }

    this.conferences.forEach((conference, index) => {
      console.log(`${index + 1}. ${conference}`);
    });
  }

  async addConference() {
    console.log('\n➕ Add New Conference');
    console.log('====================');

    const title = await this.askQuestion('Conference title: ');
    const description = await this.askQuestion('Description: ');
    const date = await this.askQuestion('Date (YYYY-MM-DD): ');
    const location = await this.askQuestion('Location: ');
    const category = await this.askQuestion('Category: ');
    const image = await this.askQuestion('Image URL: ');

    const id = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

    console.log(`\n✅ Conference "${title}" will be added with ID: ${id}`);
    console.log('Note: This is a demo. In a real implementation, this would:');
    console.log('- Add to conferences.ts');
    console.log('- Generate conference page');
    console.log('- Update routing');
    console.log('- Update sitemap');
  }

  async updateConference() {
    console.log('\n✏️  Update Conference');
    console.log('====================');

    if (this.conferences.length === 0) {
      console.log('No conferences to update.');
      return;
    }

    const conferenceId = await this.askQuestion('Enter conference ID to update: ');
    
    if (!this.conferences.includes(conferenceId)) {
      console.log('❌ Conference not found.');
      return;
    }

    console.log(`\n✅ Conference "${conferenceId}" will be updated.`);
    console.log('Note: This is a demo. In a real implementation, this would:');
    console.log('- Update conferences.ts');
    console.log('- Regenerate conference page');
    console.log('- Update sitemap');
  }

  async deleteConference() {
    console.log('\n🗑️  Delete Conference');
    console.log('====================');

    if (this.conferences.length === 0) {
      console.log('No conferences to delete.');
      return;
    }

    const conferenceId = await this.askQuestion('Enter conference ID to delete: ');
    
    if (!this.conferences.includes(conferenceId)) {
      console.log('❌ Conference not found.');
      return;
    }

    const confirm = await this.askQuestion(`Are you sure you want to delete "${conferenceId}"? (y/N): `);
    
    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
      console.log(`\n✅ Conference "${conferenceId}" will be deleted.`);
      console.log('Note: This is a demo. In a real implementation, this would:');
      console.log('- Remove from conferences.ts');
      console.log('- Delete conference page');
      console.log('- Update routing');
      console.log('- Update sitemap');
    } else {
      console.log('❌ Deletion cancelled.');
    }
  }

  async generateConferencePage() {
    console.log('\n🔧 Generate Conference Page');
    console.log('===========================');

    if (this.conferences.length === 0) {
      console.log('No conferences to generate pages for.');
      return;
    }

    const conferenceId = await this.askQuestion('Enter conference ID to generate page for: ');
    
    if (!this.conferences.includes(conferenceId)) {
      console.log('❌ Conference not found.');
      return;
    }

    console.log(`\n✅ Conference page for "${conferenceId}" will be generated.`);
    console.log('Note: This is a demo. In a real implementation, this would:');
    console.log('- Create conference page component');
    console.log('- Add to routing');
    console.log('- Update sitemap');
  }

  async generateAllConferencePages() {
    console.log('\n🔧 Generate All Conference Pages');
    console.log('=================================');

    if (this.conferences.length === 0) {
      console.log('No conferences to generate pages for.');
      return;
    }

    console.log(`\n✅ ${this.conferences.length} conference pages will be generated.`);
    console.log('Note: This is a demo. In a real implementation, this would:');
    console.log('- Create all conference page components');
    console.log('- Update routing');
    console.log('- Update sitemap');
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }
}

// Start the CLI
const cli = new ConferenceCLI();
cli.start().catch(console.error);
