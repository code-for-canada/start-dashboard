import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import AdminDashboard from '../components/dashboard/admin';
import StaffDashboard from '../components/dashboard/staff';
import GuestDashboard from '../components/dashboard/guest';

const dashboardViews = {
  'admin': AdminDashboard,
  'program staff': StaffDashboard,
  'guest': GuestDashboard,
}

const Dashboard = () => {
  const { user } = useAuth0();
  const DashboardView = dashboardViews[user['https://streetartoronto.ca/role']]

  if (!DashboardView) {
    return <GuestDashboard user={user} />
  }

  return <DashboardView user={user} />
};

export default Dashboard;
