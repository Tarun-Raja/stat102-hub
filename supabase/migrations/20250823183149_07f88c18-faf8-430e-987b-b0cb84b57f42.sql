-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  link TEXT,
  pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create materials table
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  module TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create user profiles table for role management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Student' CHECK (role IN ('Student', 'Professor', 'Class Representative')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email subscribers table
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Announcements policies
CREATE POLICY "Anyone can view announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Only professors and class reps can create announcements" ON public.announcements 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('Professor', 'Class Representative')
  )
);
CREATE POLICY "Only creators and professors can update announcements" ON public.announcements 
FOR UPDATE USING (
  created_by = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'Professor'
  )
);
CREATE POLICY "Only creators and professors can delete announcements" ON public.announcements 
FOR DELETE USING (
  created_by = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'Professor'
  )
);

-- Materials policies
CREATE POLICY "Anyone can view materials" ON public.materials FOR SELECT USING (true);
CREATE POLICY "Only professors and class reps can create materials" ON public.materials 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('Professor', 'Class Representative')
  )
);
CREATE POLICY "Only creators and professors can delete materials" ON public.materials 
FOR DELETE USING (
  created_by = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'Professor'
  )
);

-- Profile policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles 
FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles 
FOR UPDATE USING (user_id = auth.uid());

-- Email subscribers policies  
CREATE POLICY "Anyone can subscribe" ON public.email_subscribers FOR INSERT USING (true);
CREATE POLICY "Only professors can view subscribers" ON public.email_subscribers 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'Professor'
  )
);

-- Create storage buckets for course materials
INSERT INTO storage.buckets (id, name, public) VALUES ('course-materials', 'course-materials', true);

-- Storage policies for course materials
CREATE POLICY "Anyone can view course materials" ON storage.objects 
FOR SELECT USING (bucket_id = 'course-materials');

CREATE POLICY "Only professors and class reps can upload materials" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'course-materials' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('Professor', 'Class Representative')
  )
);

CREATE POLICY "Only creators and professors can delete materials" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'course-materials' AND
  (owner = auth.uid() OR 
   EXISTS (
     SELECT 1 FROM public.profiles 
     WHERE user_id = auth.uid() 
     AND role = 'Professor'
   ))
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();