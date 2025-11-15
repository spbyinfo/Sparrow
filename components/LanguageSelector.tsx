import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Check, X, Languages } from 'lucide-react';
import { Button } from './ui/button';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  color: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', color: '#4169e1' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', color: '#ff9933' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', color: '#059669' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', color: '#ffd700' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', color: '#dc143c' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', color: '#ff9933' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', color: '#4169e1' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', color: '#059669' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', color: '#ffd700' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', color: '#dc143c' },
];

export function LanguageSelector({ isOpen, onClose, currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    onLanguageChange(selectedLanguage);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0">
        <DialogTitle className="sr-only">Select Language</DialogTitle>
        <DialogDescription className="sr-only">
          Choose your preferred language for the application
        </DialogDescription>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col max-h-[80vh]">
          {/* Header with icon */}
          <div className="flex-shrink-0 pt-8 pb-6 px-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] flex items-center justify-center relative overflow-hidden shadow-[4px_4px_0px_rgba(255,153,51,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #ff9933 0%, #ffd700 100%)'
              }}>
              <Languages className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
            </div>
            <h2 className="text-lg">
              Choose your language
            </h2>
            <p className="text-muted-foreground mt-2">
              Select your preferred language
            </p>
          </div>

          {/* Language List - Compact & Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-2 scrollbar-hide">
            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 border-2 transition-all ${
                    selectedLanguage === language.code
                      ? 'border-primary bg-primary/5 shadow-[3px_3px_0px_rgba(212,117,111,0.2)]'
                      : 'border-border bg-card hover:bg-muted/30 hover:shadow-[2px_2px_0px_rgba(149,184,166,0.15)]'
                  }`}
                  style={{
                    borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg" 
                      style={{ 
                        backgroundColor: language.color,
                        boxShadow: `0 0 8px ${language.color}40`
                      }}
                    />
                    <div className="text-left">
                      <p className="text-sm">{language.nativeName}</p>
                      {language.code !== 'en' && (
                        <p className="text-xs text-muted-foreground">{language.name}</p>
                      )}
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex-shrink-0 p-6 pt-4">
            <Button
              onClick={handleContinue}
              className="w-full h-11"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
