import { NavLink } from "react-router-dom"
import { Home, Calendar, Gift, MessageCircle, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserProfile } from "../profile/UserProfile"

const navigation = [
  { name: "Home", to: "/", icon: Home },
  { name: "Calendar", to: "/calendar", icon: Calendar },
  { name: "Gifts", to: "/gifts", icon: Gift },
  { name: "Chat", to: "/chat", icon: MessageCircle },
]

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-[280px] bg-white/80 backdrop-blur-xl border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-xl font-semibold">Family Hub</h1>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t">
          <UserProfile />
        </div>
      </div>
    </div>
  )
}