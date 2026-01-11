import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useI18n } from "../i18n/useI18n";
import type { Locale } from "../i18n/messages";

const LANG_OPTIONS: Array<{ locale: Locale; label: string; flag: string }> = [
  { locale: "en", label: "English", flag: "🇺🇸" },
  { locale: "pt", label: "Português (Brasil)", flag: "🇧🇷" },
  { locale: "es", label: "Español", flag: "🇪🇸" },
  { locale: "fr", label: "Français", flag: "🇫🇷" },
];

function Flag({ flag }: { flag: string }) {
  return <span style={{ fontSize: "1.05rem" }}>{flag}</span>;
}

export function LanguageMenu() {
  const { locale, setLocale } = useI18n();

  const current =
    LANG_OPTIONS.find((l) => l.locale === locale) ?? LANG_OPTIONS[0];

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Change language"
        variant="ghost"
        icon={<Flag flag={current.flag} />}
      />
      <MenuList minW="200px">
        {LANG_OPTIONS.map((opt) => (
          <MenuItem key={opt.locale} onClick={() => setLocale(opt.locale)}>
            <HStack w="100%" justify="space-between">
              <HStack>
                <Flag flag={opt.flag} />
                <Text>{opt.label}</Text>
              </HStack>
              {locale === opt.locale && <Text>✓</Text>}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
