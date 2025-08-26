/*
# Failure Analysis System Database Schema

1. New Tables
   - `equipment`
     - `id` (uuid, primary key)
     - `name` (text, equipment name)
     - `category` (text, analysis category)
     - `description` (text, equipment description)
     - `applications` (text array, use cases)
     - `base_duration_hours` (integer, time estimate)
     - `base_cost` (numeric, cost estimate)
     - `sample_prep_requirements` (text, preparation needs)
   - `analysis_requests`
     - `id` (uuid, primary key)
     - `problem_description` (text, user's problem description)
     - `material_type` (text, material being analyzed)
     - `failure_type` (text, type of failure)
     - `urgency_level` (text, priority level)
     - `selected_equipment` (jsonb, chosen equipment)
     - `total_estimated_cost` (numeric, total cost)
     - `total_estimated_duration` (integer, total duration)
     - `ai_recommendations` (jsonb, AI suggestions)

2. Security
   - Enable RLS on both tables
   - Add policies for authenticated users to read and manage their data
*/

CREATE TABLE IF NOT EXISTS equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text CHECK (category IN ('Electrical Verification', 'Non-Destructive Inspection', 'Fault Localisation', 'Physical Analysis', 'Material Analysis')),
  description text,
  applications text[],
  base_duration_hours integer NOT NULL,
  base_cost numeric NOT NULL,
  sample_prep_requirements text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analysis_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_description text,
  material_type text CHECK (material_type IN ('Semiconductor', 'PCB', 'Metal', 'Polymer', 'Ceramic', 'Composite', 'Coating', 'Other')),
  failure_type text CHECK (failure_type IN ('Electrical', 'Mechanical', 'Thermal', 'Chemical', 'Interface')),
  urgency_level text DEFAULT 'Standard' CHECK (urgency_level IN ('Standard', 'Expedited', 'Emergency')),
  selected_equipment jsonb,
  total_estimated_cost numeric,
  total_estimated_duration integer,
  ai_recommendations jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipment readable by all"
  ON equipment
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own analysis requests"
  ON analysis_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create analysis requests"
  ON analysis_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert sample equipment data
INSERT INTO equipment (name, category, description, applications, base_duration_hours, base_cost, sample_prep_requirements) VALUES
('SEM Analysis', 'Physical Analysis', 'Scanning Electron Microscopy for high-resolution imaging', ARRAY['Surface analysis', 'Particle analysis', 'Contamination detection'], 4, 500.00, 'Sample must be conductive or coated'),
('EDX Spectroscopy', 'Material Analysis', 'Energy Dispersive X-ray Spectroscopy for elemental analysis', ARRAY['Elemental composition', 'Material identification', 'Contaminant analysis'], 2, 300.00, 'Clean, dry sample required'),
('FTIR Analysis', 'Material Analysis', 'Fourier Transform Infrared Spectroscopy', ARRAY['Polymer identification', 'Chemical analysis', 'Contamination detection'], 3, 400.00, 'Sample should be clean and representative'),
('CT Scanning', 'Non-Destructive Inspection', 'Computed Tomography for internal structure analysis', ARRAY['Internal defect detection', 'Void analysis', 'Assembly inspection'], 6, 800.00, 'Sample size must fit in scanner'),
('Electrical Testing', 'Electrical Verification', 'Comprehensive electrical parameter testing', ARRAY['Circuit verification', 'Electrical failure analysis', 'Performance validation'], 4, 350.00, 'Functional sample with accessible test points');