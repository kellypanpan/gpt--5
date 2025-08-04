import React, { useState } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useLanguageSwitcher, useTranslation } from '../hooks/useTranslation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';
import type { SupportedLanguage } from '../lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'flag-only';
  className?: string;
  showFlag?: boolean;
  showName?: boolean;
  align?: 'start' | 'center' | 'end';
}

export function LanguageSwitcher({
  variant = 'default',
  className,
  showFlag = true,
  showName = true,
  align = 'end'
}: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const {
    currentLanguage,
    currentLanguageInfo,
    availableLanguages,
    switchLanguage,
    isChanging
  } = useLanguageSwitcher();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSwitch = async (language: SupportedLanguage) => {
    try {
      await switchLanguage(language);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch language:', error);
    }
  };

  const renderTriggerContent = () => {
    switch (variant) {
      case 'flag-only':
        return (
          <span className="text-lg" role="img" aria-label={currentLanguageInfo.nativeName}>
            {currentLanguageInfo.flag}
          </span>
        );
      
      case 'compact':
        return (
          <div className="flex items-center gap-1">
            {showFlag && (
              <span className="text-sm" role="img" aria-label={currentLanguageInfo.nativeName}>
                {currentLanguageInfo.flag}
              </span>
            )}
            <span className="text-sm font-medium">
              {currentLanguage.toUpperCase()}
            </span>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-muted-foreground" />
            {showFlag && (
              <span role="img" aria-label={currentLanguageInfo.nativeName}>
                {currentLanguageInfo.flag}
              </span>
            )}
            {showName && (
              <span className="text-sm font-medium">
                {currentLanguageInfo.nativeName}
              </span>
            )}
          </div>
        );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === 'flag-only' ? 'sm' : 'default'}
          className={cn(
            'h-auto p-2',
            variant === 'flag-only' && 'w-auto px-2',
            variant === 'compact' && 'h-8 px-2',
            isChanging && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={isChanging}
          aria-label={t('changeLanguage', { 
            defaultValue: 'Change language' 
          })}
        >
          {renderTriggerContent()}
          {variant !== 'flag-only' && (
            <ChevronDown 
              size={14} 
              className={cn(
                'ml-1 transition-transform duration-200',
                isOpen && 'rotate-180'
              )} 
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align={align} 
        className="min-w-[160px]"
        sideOffset={5}
      >
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageSwitch(language.code)}
            className={cn(
              'flex items-center gap-3 cursor-pointer',
              language.isCurrent && 'bg-accent'
            )}
            disabled={isChanging}
          >
            <span 
              className="text-base" 
              role="img" 
              aria-label={language.nativeName}
            >
              {language.flag}
            </span>
            
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-sm font-medium">
                {language.nativeName}
              </span>
              <span className="text-xs text-muted-foreground">
                {language.name}
              </span>
            </div>
            
            {language.isCurrent && (
              <Check size={14} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 简化版本的语言切换器（用于移动端等）
export function CompactLanguageSwitcher({ className }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="compact"
      className={className}
      showFlag={true}
      showName={false}
    />
  );
}

// 仅显示旗帜的语言切换器
export function FlagOnlyLanguageSwitcher({ className }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="flag-only"
      className={className}
    />
  );
}

export default LanguageSwitcher;