import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import StaffDashboard from 'components/views/StaffDashboard'
import ReviewerDashboard from 'components/views/ReviewerDashboard'
import CuratorDashboard from 'components/views/CuratorDashboard'
import ArtistDashboard from 'components/views/ArtistDashboard'
import DashboardLayout from 'components/layouts/DashboardLayout'

const dashboardViews = {
  'StART Staff': StaffDashboard,
  'Advisory Committee': ReviewerDashboard,
  Curator: CuratorDashboard,
  Artist: ArtistDashboard
}

const Dashboard = () => {
  const { user } = useAuth0()
  const DashboardView =
    dashboardViews[user['https://streetartoronto.ca/role']] || ArtistDashboard

  return (
    <DashboardLayout>
      <DashboardView />
    </DashboardLayout>
  )
}

export default Dashboard
