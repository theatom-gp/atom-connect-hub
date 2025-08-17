# Conference Registration Page

## Overview
The registration page (`/registration`) provides a comprehensive multi-step form for conference participants to register for the event. It includes participant details, registration type selection with pricing tiers, and accommodation options.

## Features

### Step 1: Participant Details
- **Personal Information**: First name, last name, email (required), phone
- **Professional Details**: Organization/institution, designation/title, country
- **Special Requirements**: Dietary restrictions, accessibility needs
- **Submission Options**: Abstract submission, poster submission checkboxes

### Step 2: Registration Type & Pricing
- **Registration Categories**:
  - Speaker (In Person): $699 - $949
  - Package A (Registration + 2 Nights): $1,049 - $1,299
  - Package B (Registration + 3 Nights): $1,249 - $1,499
  - Virtual (Speaker/Delegate): $349 - $599
  - Delegate/Listener (In-Person): $749 - $1,049
  - Poster/Student: $449 - $749
  - Sponsor: $2,999 - $5,999

- **Pricing Tiers**:
  - Pre Earlybird (on/before May 25, 2025)
  - Earlybird (on/before August 22, 2025)
  - Standard (on/before August 28, 2025)
  - Final Registration (November 01, 2025)

### Accommodation Add-ons
- **Duration Options**: 1, 2, 3, or 4 nights
- **Occupancy Types**: Single, Double, Triple
- **Pricing**: $200 - $1,040 depending on duration and occupancy
- **Special**: Accompanying Person option at $299

### Step 3: Review & Submit
- **Cost Summary**: Registration + accommodation + 3.5% processing fee
- **Policy Agreement**: Links to privacy policy, terms & conditions, and cancellation policy
- **Final Submission**: "Register Now" button

## Technical Implementation

### Components Used
- **UI Components**: Card, Input, Label, RadioGroup, Checkbox, Select, Textarea, Button, Badge, Separator
- **State Management**: React useState hooks for form data and selections
- **Form Validation**: Required field validation before proceeding to next step
- **Toast Notifications**: Success/error messages using the useToast hook

### Key Features
- **Multi-step Navigation**: Progress indicator with step-by-step form completion
- **Real-time Pricing**: Dynamic calculation of total cost including processing fees
- **Responsive Design**: Mobile-friendly layout with proper grid systems
- **Sidebar Summary**: Real-time updates of selected items and total cost
- **Form Persistence**: Form data maintained across step navigation

### File Structure
```
src/pages/Registration.tsx          # Main registration page component
src/App.tsx                        # Updated with registration route
src/components/Navigation.tsx      # Updated with registration link
```

## Usage

### Navigation
- Access via `/registration` route
- Added to main navigation menu
- Direct link available from any page

### Form Flow
1. **Step 1**: Fill in participant details (required fields: name, email)
2. **Step 2**: Select registration type and pricing tier
3. **Step 3**: Review selections and submit

### Validation
- Required fields must be completed before proceeding
- Registration type selection is mandatory
- Accommodation selection is optional

## Styling
- **Color Scheme**: Orange primary (#f97316) with gray/blue accents
- **Typography**: Consistent with app design system
- **Layout**: Card-based design with proper spacing and borders
- **Responsive**: Mobile-first approach with breakpoint-specific layouts

## Future Enhancements
- Payment gateway integration
- Email confirmation system
- Admin dashboard for registrations
- Export functionality for registration data
- Multi-language support
- Accessibility improvements (ARIA labels, keyboard navigation)

## Dependencies
- React 18+
- TypeScript
- Tailwind CSS
- Radix UI components
- React Router DOM
- Custom UI component library
