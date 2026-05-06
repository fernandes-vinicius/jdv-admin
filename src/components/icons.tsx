import {
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  CircleCheck,
  ClipboardClock,
  DollarSign,
  EllipsisVertical,
  Eye,
  EyeOff,
  Filter,
  Folder,
  Folders,
  Funnel,
  Handshake,
  HelpCircle,
  Info,
  LayoutDashboard,
  ListTodo,
  Loader2,
  LogOut,
  Mail,
  MailPlus,
  Monitor,
  Moon,
  MoreHorizontal,
  OctagonX,
  PanelLeft,
  Pencil,
  RefreshCcw,
  Settings,
  ShieldUser,
  ShoppingCart,
  Sparkle,
  Sun,
  Swords,
  Target,
  Trash,
  TrendingUp,
  TriangleAlert,
  User,
  UserCheck,
  Users,
  X,
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
export const ArrowUpDownIcon = (props: IconProps) => <ArrowUpDown {...props} />;
export const BarChart3Icon = (props: IconProps) => <BarChart3 {...props} />;
export const BellIcon = (props: IconProps) => <Bell {...props} />;
export const CalendarIcon = (props: IconProps) => <Calendar {...props} />;
export const CheckIcon = (props: IconProps) => <Check {...props} />;
export const CheckCircleIcon = (props: IconProps) => <CheckCircle {...props} />;
export const ChevronDownIcon = (props: IconProps) => <ChevronDown {...props} />;
export const ChevronRightIcon = (props: IconProps) => (
  <ChevronRight {...props} />
);
export const ChevronUpIcon = (props: IconProps) => <ChevronUp {...props} />;
export const ChevronsUpDownIcon = (props: IconProps) => (
  <ChevronsUpDown {...props} />
);
export const CircleCheckIcon = (props: IconProps) => <CircleCheck {...props} />;
export const ClipboardClockIcon = (props: IconProps) => (
  <ClipboardClock {...props} />
);
export const DollarSignIcon = (props: IconProps) => <DollarSign {...props} />;
export const EllipsisVerticalIcon = (props: IconProps) => (
  <EllipsisVertical {...props} />
);
export const EyeIcon = (props: IconProps) => <Eye {...props} />;
export const EyeOffIcon = (props: IconProps) => <EyeOff {...props} />;
export const FilterIcon = (props: IconProps) => <Filter {...props} />;
export const FolderIcon = (props: IconProps) => <Folder {...props} />;
export const FoldersIcon = (props: IconProps) => <Folders {...props} />;
export const FunnelIcon = (props: IconProps) => <Funnel {...props} />;
export const HandshakeIcon = (props: IconProps) => <Handshake {...props} />;
export const HelpCircleIcon = (props: IconProps) => <HelpCircle {...props} />;
export const InfoIcon = (props: IconProps) => <Info {...props} />;
export const LayoutDashboardIcon = (props: IconProps) => (
  <LayoutDashboard {...props} />
);
export const ListTodoIcon = (props: IconProps) => <ListTodo {...props} />;
export const Loader2Icon = (props: IconProps) => <Loader2 {...props} />;
export const LogOutIcon = (props: IconProps) => <LogOut {...props} />;
export const MailIcon = (props: IconProps) => <Mail {...props} />;
export const MailPlusIcon = (props: IconProps) => <MailPlus {...props} />;
export const MonitorIcon = (props: IconProps) => <Monitor {...props} />;
export const MoonIcon = (props: IconProps) => <Moon {...props} />;
export const MoreHorizontalIcon = (props: IconProps) => (
  <MoreHorizontal {...props} />
);
export const OctagonXIcon = (props: IconProps) => <OctagonX {...props} />;
export const PanelLeftIcon = (props: IconProps) => <PanelLeft {...props} />;
export const PencilIcon = (props: IconProps) => <Pencil {...props} />;
export const RefreshCcwIcon = (props: IconProps) => <RefreshCcw {...props} />;
export const SettingsIcon = (props: IconProps) => <Settings {...props} />;
export const ShieldUserIcon = (props: IconProps) => <ShieldUser {...props} />;
export const ShoppingCartIcon = (props: IconProps) => (
  <ShoppingCart {...props} />
);
export const SparkleIcon = (props: IconProps) => <Sparkle {...props} />;
export const SunIcon = (props: IconProps) => <Sun {...props} />;
export const SwordsIcon = (props: IconProps) => <Swords {...props} />;
export const TargetIcon = (props: IconProps) => <Target {...props} />;
export const TrashIcon = (props: IconProps) => <Trash {...props} />;
export const TrendingUpIcon = (props: IconProps) => <TrendingUp {...props} />;
export const TriangleAlertIcon = (props: IconProps) => (
  <TriangleAlert {...props} />
);
export const UserIcon = (props: IconProps) => <User {...props} />;
export const UserCheckIcon = (props: IconProps) => <UserCheck {...props} />;
export const UsersIcon = (props: IconProps) => <Users {...props} />;
export const XIcon = (props: IconProps) => <X {...props} />;
export const XCircleIcon = (props: IconProps) => <XCircle {...props} />;
