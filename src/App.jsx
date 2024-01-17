import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import AllPosts from './components/AllPosts'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AllPosts />
    </QueryClientProvider>
  )
}

export default App
