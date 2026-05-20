import AppRoutes from "./AppRoutes";
import "./style.css"
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContextProvider } from "./features/auth/posts/post.context.jsx";


function App() {

  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
