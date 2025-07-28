import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@/components/auth/SignInButton';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuthState } from '@/lib/clerk';
import { Sparkles, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const { isSignedIn, isLoading } = useAuthState();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              GPT-5AI
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/tools" className="text-sm font-medium hover:text-primary transition-colors">
              Tools
            </Link>
            <Link to="/use-cases" className="text-sm font-medium hover:text-primary transition-colors">
              Use Cases
            </Link>
            
            {/* Blog Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
                  Blog
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/blog">All Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog/what-is-gpt-5">What is GPT-5?</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog/gpt-5-vs-claude-3">GPT-5 vs Claude 3</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog/gpt-5-vs-gemini">GPT-5 vs Gemini</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog/gpt-5-release-tracker">Release Tracker</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog/gpt-5-for-business">For Business</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : isSignedIn ? (
              <UserMenu />
            ) : (
              <SignInButton variant="outline" size="sm" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};