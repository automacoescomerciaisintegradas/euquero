import {
  Heart,
  Zap,
  BarChart3,
  Menu,
  X,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  Bot,
  Video,
  Play,
  ExternalLink,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Zap,
  BarChart3,
  Menu,
  X,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  Bot,
  Video,
  Play,
  ExternalLink,
  CheckCircle,
};

const Icon = ({ name, size = 24, className = "" }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;
