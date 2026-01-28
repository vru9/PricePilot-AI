import { Search, Bell, RefreshCw } from 'lucide-react'

interface HeaderProps {
  totalProducts: number
  pendingSuggestions: number
}

export default function Header({ totalProducts, pendingSuggestions }: HeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-900 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Seller Dashboard</h2>
        <div className="hidden md:flex items-center gap-3 ml-4">
          <span className="px-3 py-1.5 bg-zinc-900 rounded-full text-zinc-400 text-sm font-medium border border-zinc-800">
            {totalProducts} Products
          </span>
          {pendingSuggestions > 0 && (
            <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              {pendingSuggestions} AI Suggestions
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-64 pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>
        
        {/* Refresh */}
        <button className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-xl transition-all">
          <RefreshCw className="w-5 h-5" />
        </button>
        
        {/* Notifications */}
        <button className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-xl transition-all relative">
          <Bell className="w-5 h-5" />
          {pendingSuggestions > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-black"></span>
          )}
        </button>
      </div>
    </header>
  )
}
