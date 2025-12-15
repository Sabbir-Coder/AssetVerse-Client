import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Profile from '../pages/Dashboard/Common/Profile'
import MainLayout from '../layouts/MainLayout'
import { createBrowserRouter } from 'react-router'
import SignUpHr from '../pages/SignUp/SignUpHr'
import SignUpEmployee from '../pages/SignUp/SignUpEmployee'
import AssetList from '../pages/Dashboard/HrPages/AssetList'
import AddAsset from '../pages/Dashboard/HrPages/AddAsset'
import AllRequests from '../pages/Dashboard/HrPages/AllRequests'
import MyEmployeeList from '../pages/Dashboard/HrPages/MyEmployeeList'
import MyAssets from '../pages/Dashboard/Employee/MyAsset'
import RequestAsset from '../pages/Dashboard/Employee/RequestAsset'
import MyTeam from '../pages/Dashboard/Employee/MyTeam'
import UpgradePackage from '../pages/Dashboard/HrPages/UpgradePackage'
import UpdateAsset from '../pages/Dashboard/HrPages/UpdateAsset'
import Dashboard from '../pages/Dashboard/Common/Dashboard'
import PaymentSuccess from '../pages/Dashboard/HrPages/PaymentSuccess'
import PaymentCancel from '../pages/Dashboard/HrPages/PaymentCancel'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import HrRoutes from './HrRoutes'




export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  { path: '/join-employee', element: <SignUpEmployee /> },
  { path: '/join-hr', element: <SignUpHr /> },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // HR Routes Here
      {
        index: true,
        element: (
          <PrivateRoute>
            <HrRoutes>
              <Dashboard />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'asset-list',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <AssetList />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'assets/edit/:id',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <UpdateAsset />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-asset',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <AddAsset />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-requests',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <AllRequests />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-employee-list',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <MyEmployeeList />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'upgrade-package',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <UpgradePackage />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-success',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <PaymentSuccess />
            </HrRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-cancelled',
        element: (
          <PrivateRoute>
            <HrRoutes>
              <PaymentCancel />
            </HrRoutes>
          </PrivateRoute>
        ),
      },


      // Employee Routes Here
      {
        path: 'my-assets',
        element: (
          <PrivateRoute>
            <MyAssets />
          </PrivateRoute>
        ),
      },
      {
        path: 'request-asset',
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-team',
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },


      // Profile Route
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

    ],
  },
])
