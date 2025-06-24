import { Button } from "../components/ui/button"
import { Heart, Bell, User } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold text-white">HeartBeat AI</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </a>
          <a href="/visualization" className="text-slate-300 hover:text-white transition-colors">
            Overview
          </a>
          <a href="/analysis" className="text-slate-300 hover:text-white transition-colors">
            Analysis
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">
            Reports
          </a>
          <a href="/settings" className="text-slate-300 hover:text-white transition-colors">
            Settings
          </a>

          <div className="flex items-center gap-3 ml-6">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
              <User className="h-5 w-5 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
