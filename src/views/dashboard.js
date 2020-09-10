import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import AdminView from '../components/dashboard/AdminView';
import StaffView from '../components/dashboard/StaffView';
import GuestView from '../components/dashboard/GuestView';
import DefaultLayout from './default-layout'

const dashboardViews = {
  'admin': AdminView,
  'program staff': StaffView,
  'guest': GuestView,
}

const Dashboard = () => {
  const { user } = useAuth0();
  const DashboardView = dashboardViews[user['https://streetartoronto.ca/role']]

  if (!DashboardView) {
    return <DefaultLayout><GuestView user={user} /></DefaultLayout>
  }

  return <DefaultLayout><DashboardView user={user} /></DefaultLayout>
};

export default Dashboard;
