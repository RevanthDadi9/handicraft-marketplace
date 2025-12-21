import { Badge } from "./ui/badge"
import { CheckCircle2, Clock, CreditCard, Send, Package, Truck, Sparkles } from "lucide-react"

const statuses = [
    { id: 'REQUESTED', label: 'Requested', icon: Send },
    { id: 'ACCEPTED', label: 'Accepted', icon: CheckCircle2 },
    { id: 'IN_PROGRESS', label: 'Crafting', icon: Clock },
    { id: 'READY', label: 'Ready', icon: Package },
    { id: 'DELIVERED', label: 'Delivered', icon: Truck },
    { id: 'COMPLETED', label: 'Legacy', icon: Sparkles },
]

export function OrderStatusStepper({ currentStatus }: { currentStatus: string }) {
    const currentIndex = statuses.findIndex(s => s.id === currentStatus)

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative max-w-4xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-[1px] bg-primary -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
                    style={{ width: `${currentIndex >= 0 ? (currentIndex / (statuses.length - 1)) * 100 : 0}%` }}
                />

                {statuses.map((s, i) => {
                    const Icon = s.icon
                    const isActive = i <= currentIndex
                    const isCurrent = i === currentIndex

                    return (
                        <div key={s.id} className="relative z-10 flex flex-col items-center">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                                ${isActive ? 'bg-primary text-black' : 'bg-[#1a1a1a] border border-white/10 text-white/20'}
                                ${isCurrent ? 'ring-8 ring-primary/10 scale-110 shadow-[0_0_20px_rgba(255,215,0,0.2)]' : ''}
                            `}>
                                <Icon size={18} />
                            </div>
                            <span className={`text-[9px] mt-4 font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? 'text-primary' : 'text-white/20'}`}>
                                {s.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
