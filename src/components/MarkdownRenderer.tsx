import React from "react";
import { Button } from "@/components/ui/button";

interface MarkdownRendererProps {
  content: string;
}

interface Block {
  type: 'code' | 'paragraph';
  language?: string;
  text: string;
}

function parseBlocks(raw: string): Block[] {
  const lines = raw.split(/\r?\n/);
  const blocks: Block[] = [];
  let inCode = false;
  let codeLang = '';
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (buffer.length) {
      blocks.push({ type: 'paragraph', text: buffer.join('\n') });
      buffer = [];
    }
  };

  for (const line of lines) {
    const fenceMatch = line.match(/^```(.*)$/);
    if (fenceMatch) {
      if (!inCode) {
        // entering code
        flushParagraph();
        inCode = true;
        codeLang = (fenceMatch[1] || '').trim();
      } else {
        // leaving code
        blocks.push({ type: 'code', language: codeLang, text: buffer.join('\n') });
        buffer = [];
        inCode = false;
        codeLang = '';
      }
      continue;
    }
    buffer.push(line);
  }
  if (buffer.length) {
    if (inCode) {
      blocks.push({ type: 'code', language: codeLang, text: buffer.join('\n') });
    } else {
      blocks.push({ type: 'paragraph', text: buffer.join('\n') });
    }
  }
  return blocks;
}

function renderParagraph(text: string) {
  // very lightweight markdown: headings, lists, blockquote, inline code, bold, links
  const lines = text.split(/\n/);
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  const flushList = () => {
    if (listBuffer.length) {
      elements.push(
        <ul className="list-disc pl-6 space-y-1" key={`ul-${elements.length}`}>
          {listBuffer.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((l) => {
    if (/^\s*[-*]\s+/.test(l)) {
      listBuffer.push(l.replace(/^\s*[-*]\s+/, ''));
      return;
    }
    flushList();
    if (/^#\s+/.test(l)) elements.push(<h1 className="text-xl font-bold" key={`h1-${elements.length}`}>{l.replace(/^#\s+/, '')}</h1>);
    else if (/^##\s+/.test(l)) elements.push(<h2 className="text-lg font-semibold" key={`h2-${elements.length}`}>{l.replace(/^##\s+/, '')}</h2>);
    else if (/^###\s+/.test(l)) elements.push(<h3 className="font-semibold" key={`h3-${elements.length}`}>{l.replace(/^###\s+/, '')}</h3>);
    else if (/^>\s+/.test(l)) elements.push(<blockquote className="border-l-4 pl-3 text-gray-600" key={`bq-${elements.length}`} dangerouslySetInnerHTML={{ __html: inlineMd(l.replace(/^>\s+/, '')) }} />);
    else if (/^\|.+\|$/.test(l)) {
      // naive table row support (single row)
      const cells = l.slice(1, -1).split('|').map((c) => c.trim());
      elements.push(
        <table className="w-full border border-gray-200 text-sm" key={`tbl-${elements.length}`}>
          <tbody>
            <tr>
              {cells.map((c, i) => (
                <td className="border border-gray-200 p-2" key={i} dangerouslySetInnerHTML={{ __html: inlineMd(c) }} />
              ))}
            </tr>
          </tbody>
        </table>
      );
    } else if (l.trim() === '') {
      elements.push(<div className="h-2" key={`sp-${elements.length}`} />);
    } else {
      elements.push(<p className="leading-relaxed" key={`p-${elements.length}`} dangerouslySetInnerHTML={{ __html: inlineMd(l) }} />);
    }
  });
  flushList();
  return <>{elements}</>;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 语言标识符映射到显示名称
const languageNames: { [key: string]: string } = {
  'js': 'JavaScript',
  'javascript': 'JavaScript', 
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'py': 'Python',
  'python': 'Python',
  'html': 'HTML',
  'css': 'CSS',
  'sql': 'SQL',
  'bash': 'Bash',
  'sh': 'Shell',
  'json': 'JSON',
  'xml': 'XML',
  'jsx': 'React JSX',
  'tsx': 'React TSX',
  'vue': 'Vue',
  'php': 'PHP',
  'java': 'Java',
  'cpp': 'C++',
  'c': 'C',
  'go': 'Go',
  'rust': 'Rust',
  'yaml': 'YAML',
  'yml': 'YAML',
  'md': 'Markdown',
  'markdown': 'Markdown'
};

// 为代码添加行号
function addLineNumbers(code: string): string {
  const lines = code.split('\n');
  const lineCount = lines.length;
  const maxDigits = lineCount.toString().length;
  
  return lines.map((line, index) => {
    const lineNum = (index + 1).toString().padStart(maxDigits, ' ');
    return `${lineNum}│ ${line}`;
  }).join('\n');
}

function inlineMd(s: string) {
  // links
  let html = s.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-blue-600 underline">$1</a>');
  // bold/italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1<\/strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1<\/em>');
  // inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1<\/code>');
  return html;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const blocks = parseBlocks(content);
  return (
    <div className="prose prose-sm max-w-none">
      {blocks.map((b, i) => {
        if (b.type === 'code') {
          const languageLabel = b.language ? 
            (languageNames[b.language.toLowerCase()] || b.language.toUpperCase()) : 
            'Code';
          
          // 添加行号（如果代码超过3行）
          const shouldShowLineNumbers = b.text.split('\n').length > 3;
          const displayCode = shouldShowLineNumbers ? addLineNumbers(b.text) : b.text;
          
          return (
            <div key={i} className="relative group my-4">
              {/* 语言标签和复制按钮 */}
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-md">
                <span className="text-xs font-medium text-gray-300">
                  {languageLabel}
                </span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 px-2 text-xs text-gray-300 hover:text-white hover:bg-gray-700" 
                  onClick={() => navigator.clipboard.writeText(b.text)}
                >
                  Copy
                </Button>
              </div>
              
              {/* 代码内容 */}
              <pre className={`bg-gray-900 text-gray-100 p-4 rounded-b-md overflow-auto text-sm ${
                shouldShowLineNumbers ? 'font-mono' : ''
              }`}>
                <code>
                  {displayCode}
                </code>
              </pre>
            </div>
          );
        }
        return <div key={i}>{renderParagraph(b.text)}</div>;
      })}
    </div>
  );
};

export default MarkdownRenderer; 