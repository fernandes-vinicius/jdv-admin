import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ChevronsUpDown,
  ClipboardClock,
  DollarSign,
  EllipsisVertical,
  Eye,
  Filter,
  Folder,
  Folders,
  Funnel,
  Handshake,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Mail,
  MailPlus,
  Monitor,
  Moon,
  PanelLeft,
  RefreshCcw,
  Settings,
  ShieldUser,
  ShoppingCart,
  Sparkle,
  Sun,
  Target,
  TrendingUp,
  TriangleAlert,
  User,
  Users,
  XCircle,
} from "lucide-react";

import type { ComponentType, RefAttributes } from "react";
import type { SVGAttributes } from "@/types";

type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

interface IconProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type IconComponentType = ComponentType<IconProps>;

export const ArrowRightIcon = (props: IconProps) => <ArrowRight {...props} />;
export const BarChart3Icon = (props: IconProps) => <BarChart3 {...props} />;
export const BellIcon = (props: IconProps) => <Bell {...props} />;
export const CalendarIcon = (props: IconProps) => <Calendar {...props} />;
export const CheckCircleIcon = (props: IconProps) => <CheckCircle {...props} />;
export const ChevronsUpDownIcon = (props: IconProps) => (
  <ChevronsUpDown {...props} />
);
export const ClipboardClockIcon = (props: IconProps) => (
  <ClipboardClock {...props} />
);
export const DollarSignIcon = (props: IconProps) => <DollarSign {...props} />;
export const EllipsisVerticalIcon = (props: IconProps) => (
  <EllipsisVertical {...props} />
);
export const EyeIcon = (props: IconProps) => <Eye {...props} />;
export const FilterIcon = (props: IconProps) => <Filter {...props} />;
export const FolderIcon = (props: IconProps) => <Folder {...props} />;
export const FoldersIcon = (props: IconProps) => <Folders {...props} />;
export const FunnelIcon = (props: IconProps) => <Funnel {...props} />;
export const HandshakeIcon = (props: IconProps) => <Handshake {...props} />;
export const HelpCircleIcon = (props: IconProps) => <HelpCircle {...props} />;
export const LayoutDashboardIcon = (props: IconProps) => (
  <LayoutDashboard {...props} />
);
export const ListTodoIcon = (props: IconProps) => <ListTodo {...props} />;
export const LogOutIcon = (props: IconProps) => <LogOut {...props} />;
export const MailIcon = (props: IconProps) => <Mail {...props} />;
export const MailPlusIcon = (props: IconProps) => <MailPlus {...props} />;
export const MonitorIcon = (props: IconProps) => <Monitor {...props} />;
export const MoonIcon = (props: IconProps) => <Moon {...props} />;
export const PanelLeftIcon = (props: IconProps) => <PanelLeft {...props} />;
export const RefreshCcwIcon = (props: IconProps) => <RefreshCcw {...props} />;
export const SettingsIcon = (props: IconProps) => <Settings {...props} />;
export const ShieldUserIcon = (props: IconProps) => <ShieldUser {...props} />;
export const ShoppingCartIcon = (props: IconProps) => (
  <ShoppingCart {...props} />
);
export const SparkleIcon = (props: IconProps) => <Sparkle {...props} />;
export const SunIcon = (props: IconProps) => <Sun {...props} />;
export const TargetIcon = (props: IconProps) => <Target {...props} />;
export const TrendingUpIcon = (props: IconProps) => <TrendingUp {...props} />;
export const TriangleAlertIcon = (props: IconProps) => (
  <TriangleAlert {...props} />
);
export const UserIcon = (props: IconProps) => <User {...props} />;
export const UsersIcon = (props: IconProps) => <Users {...props} />;
export const XCircleIcon = (props: IconProps) => <XCircle {...props} />;
