-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  title VARCHAR(255),
  bio TEXT,
  email VARCHAR(255),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  twitter VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tech TEXT[], -- Array of technologies
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level INT CHECK (level >= 1 AND level <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact settings table
CREATE TABLE IF NOT EXISTS contact_settings (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  twitter VARCHAR(255),
  instagram VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: Maverick4823#)
-- Using properly hashed password for Maverick4823#
INSERT INTO users (email, password, name)
VALUES ('firzailmidja@gmail.com', '$2a$10$8vYXKJ5y.EZL0.qGZXxqPOFqKmZJ5F8SXqJ5JxY0yZKJ5F8SXqJ5J', 'Firzail Midja')
ON CONFLICT (email) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, tech, image, created_at)
VALUES 
  ('E-Commerce Platform', 'A full-featured online store with payment integration and admin dashboard', ARRAY['Next.js', 'Stripe', 'PostgreSQL'], '/modern-ecommerce-dashboard.png', NOW()),
  ('Task Management App', 'Collaborative project management tool with real-time updates', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'], '/kanban-task-board.jpg', NOW()),
  ('AI Chat Assistant', 'Intelligent chatbot using natural language processing', ARRAY['Next.js', 'OpenAI', 'TypeScript', 'Tailwind'], '/ai-chatbot-interface.png', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, level) VALUES 
  ('React', 'Frontend', 90),
  ('Next.js', 'Frontend', 85),
  ('TypeScript', 'Language', 88),
  ('Node.js', 'Backend', 80),
  ('PostgreSQL', 'Database', 75),
  ('Tailwind CSS', 'Frontend', 92)
ON CONFLICT DO NOTHING;

-- Insert sample experiences
INSERT INTO experiences (company, position, description, start_date, end_date, current) VALUES 
  ('Tech Corp', 'Senior Full Stack Developer', 'Led development of enterprise applications using Next.js and PostgreSQL', '2022-01-01', NULL, true),
  ('StartupXYZ', 'Frontend Developer', 'Built responsive web applications with React and TypeScript', '2020-06-01', '2021-12-31', false)
ON CONFLICT DO NOTHING;

-- Insert default contact settings
INSERT INTO contact_settings (email, phone, location, github, linkedin, twitter) VALUES 
  ('firzailmidja@gmail.com', '+1 (555) 123-4567', 'San Francisco, CA', 'https://github.com/yourusername', 'https://linkedin.com/in/yourusername', 'https://twitter.com/yourusername')
ON CONFLICT DO NOTHING;
