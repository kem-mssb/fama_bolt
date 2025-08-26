# Failure Analysis and Material Analysis Quotation System

A modern, AI-powered web application for generating quotations for failure analysis and material characterization services. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **4-Step Analysis Wizard**: Guided process for creating analysis requests
- **AI-Powered Recommendations**: Intelligent equipment suggestions based on requirements
- **Professional UI**: Built with shadcn/ui components and Tailwind CSS
- **Real-time Form Validation**: Ensure data quality at each step
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Database Integration**: Supabase backend for storing equipment and analysis requests

## Tech Stack

- **Frontend**: Next.js 13+ (App Router), TypeScript, React
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL database, REST API)
- **State Management**: React Context API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Setup

1. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Get your Supabase credentials:
   - Go to [Supabase](https://supabase.com)
   - Create a new project or use an existing one
   - Go to Settings > API
   - Copy your Project URL and anon/public key

### Database Setup

1. Run the migration file in your Supabase SQL editor:
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Copy and run the contents of `supabase/migrations/create_equipment_and_analysis_tables.sql`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd failure-analysis-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── analysis/          # Analysis wizard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── wizard/           # Wizard step components
│   └── StepIndicator.tsx # Progress indicator
├── contexts/             # React Context providers
│   └── AnalysisContext.tsx # Analysis form state management
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # General utilities
└── supabase/
    └── migrations/       # Database migration files
```

## Usage

### Analysis Wizard Flow

1. **Requirements Step**: Describe the problem, select material type and failure type
2. **Parameters Step**: Choose urgency level and budget range
3. **Equipment Step**: View AI recommendations and available equipment (placeholder)
4. **Results Step**: Review quotation and analysis details (placeholder)

### Adding New Equipment

Equipment can be added directly to the Supabase database using the SQL editor or through the Supabase dashboard.

Example equipment entry:
```sql
INSERT INTO equipment (name, category, description, applications, base_duration_hours, base_cost, sample_prep_requirements) 
VALUES (
  'XRD Analysis',
  'Material Analysis',
  'X-Ray Diffraction for crystal structure analysis',
  ARRAY['Phase identification', 'Crystal structure', 'Texture analysis'],
  3,
  450.00,
  'Powdered sample or flat surface required'
);
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.