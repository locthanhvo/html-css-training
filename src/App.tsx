import UserPage from '@pages/User'
import { UserProvider } from '@contexts'

function App() {
  return (
    <UserProvider>
      <UserPage />
    </UserProvider>
  )
}

export default App
