import { User, Briefcase } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface AuthToggleProps {
  value: 'user' | 'provider'
  onValueChange: (value: 'user' | 'provider') => void
}

export const AuthToggle = ({ value, onValueChange }: AuthToggleProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Tipo de Conta</Label>
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <RadioGroupItem value="user" id="user" />
          <Label htmlFor="user" className="flex items-center cursor-pointer flex-1">
            <User className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Usuário</p>
              <p className="text-sm text-gray-600">Preciso contratar serviços</p>
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <RadioGroupItem value="provider" id="provider" />
          <Label htmlFor="provider" className="flex items-center cursor-pointer flex-1">
            <Briefcase className="w-5 h-5 mr-3 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Prestador de Serviço</p>
              <p className="text-sm text-gray-600">Quero oferecer serviços</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
} 