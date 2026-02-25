// components/contact/ContactAvailabilityBadge.tsx
import { ContactAvailability } from '@/types/contactType';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Sun,
  Moon,
  CalendarDays
} from 'lucide-react';


interface ContactAvailabilityBadgeProps {
  availability: ContactAvailability;
  timeInterval?: { from: string; to: string };
}

export function ContactAvailabilityBadge({ availability, timeInterval }: ContactAvailabilityBadgeProps) {
  const getAvailabilityConfig = () => {
    switch (availability) {
      case 'alltime':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          label: 'Always Available'
        };
      case 'weekdays':
        return {
          icon: Calendar,
          color: 'text-blue-400',
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          label: 'Weekdays'
        };
      case 'weekends':
        return {
          icon: Sun,
          color: 'text-amber-400',
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/30',
          label: 'Weekends'
        };
      case 'monthly':
        return {
          icon: CalendarDays,
          color: 'text-purple-400',
          bg: 'bg-purple-500/20',
          border: 'border-purple-500/30',
          label: 'Monthly'
        };
      case 'annually':
        return {
          icon: CalendarDays,
          color: 'text-indigo-400',
          bg: 'bg-indigo-500/20',
          border: 'border-indigo-500/30',
          label: 'Annually'
        };
      case 'unavailable':
      default:
        return {
          icon: XCircle,
          color: 'text-gray-400',
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          label: 'Unavailable'
        };
    }
  };

  const config = getAvailabilityConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2 py-1 ${config.bg} ${config.border} rounded-full border`}
    >
      <Icon className={`w-3 h-3 ${config.color}`} />
      <span className={`text-xs ${config.color}`}>{config.label}</span>
      {timeInterval && (
        <span className="text-xs text-gray-400 ml-1">
          {timeInterval.from} - {timeInterval.to}
        </span>
      )}
    </motion.div>
  );
}