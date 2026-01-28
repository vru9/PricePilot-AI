import { 
  LayoutDashboard, 
  Package, 
  Sparkles, 
  Settings, 
  TrendingUp,
  BarChart3,
  Bell,
  HelpCircle
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-zinc-900 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">PriceOptim</h1>
            <span className="text-zinc-600 text-xs">AI Price Optimizer</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Package} label="Products" />
          <NavItem icon={Sparkles} label="AI Suggestions" badge="3" />
          <NavItem icon={BarChart3} label="Analytics" />
        </div>
        
        <div className="mt-8">
          <span className="px-3 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
            Settings
          </span>
          <div className="mt-3 space-y-1">
            <NavItem icon={Bell} label="Notifications" />
            <NavItem icon={Settings} label="Settings" />
            <NavItem icon={HelpCircle} label="Help & Support" />
          </div>
        </div>
      </nav>
      
      {/* User Section */}
      <div className="p-4 border-t border-zinc-900">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-900 cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">John Doe</p>
            <p className="text-zinc-600 text-xs truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  badge?: string
}

function NavItem({ icon: Icon, label, active, badge }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
          : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
      {badge && (
        <span className="ml-auto px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded-full">
          {badge}
        </span>
      )}
    </button>
  )
}
