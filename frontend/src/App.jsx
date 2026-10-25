import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import Jobss from './components/admin/Jobss'
import PostJob from './components/admin/PostJob'
import UpdatePostJob from './components/admin/UpdatePostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/signup',
        element: <Signup />
    },

    {
        path: '/jobs',
        element: <Jobs />
    },

    {
        path: '/browse',
        element: <Browse />
    },

    {
        path: '/profile',
        element: <Profile />
    },

    {
        path: '/description/:id',
        element: <JobDescription />
    },

    {
        path: "/admin/companies",
        element: (
            <ProtectedRoute>
                <Companies />
            </ProtectedRoute>
        )
    },

    {
        path: "/admin/companies/create",
        element: (
            <ProtectedRoute>
                <CreateCompany />
            </ProtectedRoute>
        )
    },

    {
        path: "/admin/companies/:id",
        element: (
            <ProtectedRoute>
                <CompanySetup />
            </ProtectedRoute>
        )
    },

    {
        path: "/admin/jobs",
        element: (
            <ProtectedRoute>
                <Jobss />
            </ProtectedRoute>
        )
    },

    {
        path: "/admin/jobs/create",
        element: (
            <ProtectedRoute>
                <PostJob />
            </ProtectedRoute>
        )
    },

    {
        path: "/admin/jobs/:id",
        element: (
            <ProtectedRoute>
                <UpdatePostJob />
            </ProtectedRoute>
        )
    },

    {
        path: "/admin/jobs/:id/applicants",
        element: (
            <ProtectedRoute>
                <Applicants />
            </ProtectedRoute>
        )
    }

])


function App() {

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default App