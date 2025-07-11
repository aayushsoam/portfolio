
import * as LucideIcons from 'lucide-react';

export const getIconComponent = (iconName: string) => {
  // Create a mapping of icon names to components
  const iconMap: Record<string, any> = {
    'Figma': LucideIcons.Figma,
    'FileCode': LucideIcons.FileCode,
    'FileType': LucideIcons.FileType,
    'Wind': LucideIcons.Wind,
    'Braces': LucideIcons.Braces,
    'Zap': LucideIcons.Zap,
    'Code': LucideIcons.Code,
    'LayoutTemplate': LucideIcons.LayoutTemplate,
  };

  return iconMap[iconName] || LucideIcons.Code; // Default to Code icon if not found
};
