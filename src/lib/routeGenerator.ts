// Dynamic Route Generator
// Automatically generates routes based on conference data

import { Conference } from './conferences';
import { conferenceManager } from './conferenceManager';

export interface RouteConfig {
  path: string;
  component: string;
  exact?: boolean;
  meta?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export class RouteGenerator {
  private static instance: RouteGenerator;
  private routes: RouteConfig[] = [];

  private constructor() {
    this.generateRoutes();
  }

  public static getInstance(): RouteGenerator {
    if (!RouteGenerator.instance) {
      RouteGenerator.instance = new RouteGenerator();
    }
    return RouteGenerator.instance;
  }

  // Generate all routes
  private generateRoutes(): void {
    const conferences = conferenceManager.getAllConferences();
    
    // Generate conference routes
    conferences.forEach(conference => {
      this.routes.push({
        path: `/conference/${conference.id}`,
        component: 'ConferenceRouter',
        exact: true,
        meta: {
          title: conference.title,
          description: conference.description,
          keywords: conference.keywords
        }
      });
    });
  }

  // Get all routes
  public getAllRoutes(): RouteConfig[] {
    return this.routes;
  }

  // Get conference routes only
  public getConferenceRoutes(): RouteConfig[] {
    return this.routes.filter(route => route.path.startsWith('/conference/'));
  }

  // Get route by path
  public getRouteByPath(path: string): RouteConfig | undefined {
    return this.routes.find(route => route.path === path);
  }

  // Add new route
  public addRoute(route: RouteConfig): void {
    this.routes.push(route);
  }

  // Remove route
  public removeRoute(path: string): void {
    this.routes = this.routes.filter(route => route.path !== path);
  }

  // Update route
  public updateRoute(path: string, updates: Partial<RouteConfig>): void {
    const index = this.routes.findIndex(route => route.path === path);
    if (index !== -1) {
      this.routes[index] = { ...this.routes[index], ...updates };
    }
  }

  // Regenerate all routes
  public regenerateRoutes(): void {
    this.routes = [];
    this.generateRoutes();
  }

  // Get route metadata
  public getRouteMetadata(path: string): RouteConfig['meta'] | undefined {
    const route = this.getRouteByPath(path);
    return route?.meta;
  }

  // Check if route exists
  public routeExists(path: string): boolean {
    return this.routes.some(route => route.path === path);
  }

  // Get all paths
  public getAllPaths(): string[] {
    return this.routes.map(route => route.path);
  }

  // Generate route configuration for App.tsx
  public generateAppRoutes(): string {
    const conferenceRoutes = this.getConferenceRoutes();
    
    return conferenceRoutes.map(route => {
      return `  <Route path="${route.path}" element={<ConferenceRouter />} />`;
    }).join('\n');
  }

  // Generate sitemap entries
  public generateSitemapEntries(): string {
    const conferenceRoutes = this.getConferenceRoutes();
    const baseUrl = 'https://www.theatomconferences.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    return conferenceRoutes.map(route => {
      const meta = route.meta;
      return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }).join('\n');
  }
}

// Export singleton instance
export const routeGenerator = RouteGenerator.getInstance();
