import { ProviderProps } from "interfaces"
import { AuthState } from "provider/Auth"

export default function Providers(props: ProviderProps) {
  const { children } = props;

  return (
    <AuthState>
      {children}
    </AuthState>
  )
}
