import { Link } from 'react-router-dom';
import { getPrevNext } from '@/data/blogPosts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PrevNextProps {
  currentId: string;
}

export const PrevNext = ({ currentId }: PrevNextProps) => {
  const { prev, next } = getPrevNext(currentId);

  if (!prev && !next) return null;

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
      {prev ? (
        <Link to={prev.path} className="group block p-4 border border-border rounded-lg hover:border-primary/40 transition-colors">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            Previous
          </div>
          <div className="font-medium group-hover:text-primary transition-colors line-clamp-2">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link to={next.path} className="group block p-4 border border-border rounded-lg hover:border-primary/40 transition-colors text-right">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1 justify-end">
            Next
            <ArrowRight className="h-3 w-3" />
          </div>
          <div className="font-medium group-hover:text-primary transition-colors line-clamp-2">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}; 