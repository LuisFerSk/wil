import { ProviderProps } from "interfaces"
import { AuthState } from "provider/Auth"

const Providers = (props: ProviderProps): JSX.Element => {
  const { children } = props;

  return (
    <AuthState>
      {children}
    </AuthState>
  )
}

export default Providers
