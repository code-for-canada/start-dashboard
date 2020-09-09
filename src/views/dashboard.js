import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import AdminView from '../components/dashboard/AdminView';
import StaffView from '../components/dashboard/StaffView';
import GuestView from '../components/dashboard/GuestView';

const dashboardViews = {
  'admin': AdminView,
  'program staff': StaffView,
  'guest': GuestView,
}

const Dashboard = () => {
  const { user } = useAuth0();
  const DashboardView = dashboardViews[user['https://streetartoronto.ca/role']]

  if (!DashboardView) {
    return <GuestView user={user} />
  }

  return <DashboardView user={user} />
};

export default Dashboard;
