import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export const GitHubLogin = () => {
  const { signInWithGithub } = useAuth();

  const handleGitHubLogin = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  return (
    <Button
      onClick={handleGitHubLogin}
      className="w-full flex items-center justify-center gap-2 bg-[#24292F] hover:bg-[#24292F]/90 text-white"
    >
      <Github className="w-5 h-5" />
      Continue with GitHub
    </Button>
  );
}; 