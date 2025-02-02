import { Ionicons } from '@expo/vector-icons';

const CustomIcon = ({ name, size, color }: { name: string; size: number; color: string }) => {
  return <Ionicons name={name as any} size={size} color={color} />;
};

export default CustomIcon; 