import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import StaffView from '../components/dashboard/StaffView';
import AdvisoryCommitteeView from '../components/dashboard/AdvisoryCommitteeView';
import CuratorView from '../components/dashboard/CuratorView';
import ArtistView from '../components/dashboard/ArtistView';
import DashboardLayout from './dashboard-layout'

const dashboardViews = {
  'StART Staff': StaffView,
  'Advisory Committee': AdvisoryCommitteeView,
  'Curator': CuratorView,
  'Artist': ArtistView,
}

const Dashboard = () => {
  const { user } = useAuth0();
  const DashboardView = dashboardViews[user['https://streetartoronto.ca/role']]

  if (!DashboardView) {
    return <DashboardLayout><ArtistView user={user} /></DashboardLayout>
  }

  return <DashboardLayout><DashboardView user={user} /></DashboardLayout>
};

export default Dashboard;
