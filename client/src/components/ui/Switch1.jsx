import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo({isFree , setIsFree}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch  checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
      <Label htmlFor="airplane-mode">Is this video is FREE</Label>
       
    </div>
  )
}
