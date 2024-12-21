import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SignIn } from './components/auth/SignIn'
import { SignUp } from './components/auth/SignUp'
import { PrivateRoute } from './components/auth/PrivateRoute'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './components/Dashboard'
import { CalendarPage } from './components/calendar/CalendarPage'
import { GiftLists } from './components/gifts/GiftLists'
import { ChatWindow } from './components/chat/ChatWindow'

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="gifts" element={<GiftLists />} />
              <Route path="chat" element={<ChatWindow />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}