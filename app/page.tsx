import Portfolio from './portfolio';

export const metadata = {
  title: 'Muhammad Anas - Full Stack Developer & AI Enthusiast',
  description: 'Professional portfolio of Muhammad Anas, a BS Computer Science student specializing in full-stack development, computer vision, and UI/UX design.',
  keywords: ['Developer', 'React', 'Full Stack', 'Computer Vision', 'Python'],
  openGraph: {
    title: 'Muhammad Anas - Full Stack Developer',
    description: 'Explore my projects, skills, and experience in web development and AI.',
    type: 'website',
  },
};

export default function Home() {
  return <Portfolio />;
}
