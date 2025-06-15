import { IconType } from 'react-icons';

type GradientType = 'blue' | 'green' | 'purple' | 'orange';

interface StatCardProps {
  name: string;
  value: string;
  icon: IconType;
  change: string;
  gradient?: GradientType;
}

export default function StatCard({ name, value, icon: Icon, change, gradient = 'blue' }: StatCardProps) {
  const getGradientClasses = (gradient: GradientType) => {
    const gradients: Record<GradientType, string> = {
      blue: 'from-blue-500 to-blue-700',
      green: 'from-green-500 to-green-700',
      purple: 'from-purple-500 to-purple-700',
      orange: 'from-orange-500 to-orange-700',
    };
    return gradients[gradient];
  };

  const getIconClasses = (gradient: GradientType) => {
    const colors: Record<GradientType, string> = {
      blue: 'bg-blue-600 text-white',
      green: 'bg-green-600 text-white',
      purple: 'bg-purple-600 text-white',
      orange: 'bg-orange-600 text-white',
    };
    return colors[gradient];
  };

  return (
    <div className={`bg-gradient-to-br ${getGradientClasses(gradient)} rounded-lg shadow p-6 transition-all duration-300 hover:shadow-xl hover:cursor-pointer hover:-translate-y-2`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${getIconClasses(gradient)}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-white/80">{name}</p>
          <p className="text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
} 