import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={language === "en" ? "bg-primary text-white" : ""}
        data-testid="button-lang-en"
      >
        <span className="text-lg">🇺🇸</span>
      </Button>
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className={language === "es" ? "bg-primary text-white" : ""}
        data-testid="button-lang-es"
      >
        <span className="text-lg">🇲🇽</span>
      </Button>
    </div>
  );
}
