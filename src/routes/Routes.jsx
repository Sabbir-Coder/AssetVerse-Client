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
import Payment from '../pages/Dashboard/HrPages/Payment'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'asset-list',
        element: (
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: 'assets/edit/:id',
        element: (
          <PrivateRoute>
            <UpdateAsset />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-asset',
        element: (
          <PrivateRoute>
            <AddAsset />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-requests',
        element: (
          <PrivateRoute>
            <AllRequests />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-employee-list',
        element: (
          <PrivateRoute>
            <MyEmployeeList />
          </PrivateRoute>
        ),
      },
      {
        path: 'upgrade-package',
        element: (
          <PrivateRoute>
            <UpgradePackage />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment/:packageId',
        element: (
          <PrivateRoute>
            <Payment />
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
