import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import StaffDashboard from 'components/views/StaffDashboard'
import ReviewerDashboard from 'components/views/ReviewerDashboard'
import CuratorDashboard from 'components/views/CuratorDashboard'
import ArtistDashboard from 'components/views/ArtistDashboard'
import DashboardLayout from 'components/layouts/DashboardLayout'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const dashboardViews = {
  'StART Staff': StaffDashboard,
  'Advisory Committee': ReviewerDashboard,
  Curator: CuratorDashboard,
  Artist: ArtistDashboard
}

const TabPanel = ({ children, tab, index, ...rest }) => {
  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...rest}
    >
      {tab === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

const Dashboard = () => {
  const { user } = useAuth0()
  const [tab, setTab] = useState(0)
  const roles = user['https://streetartoronto.ca/role']

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <DashboardLayout>
      <Tabs value={tab} onChange={handleChange} aria-label="Dashboard views navigation">
      {
        roles.map((role, index) => {
          return (
            <Tab key={role} label={role} id={`tab-${index}`} aria-controls={`panel-${index}`} />
          )
        })
      }
      </Tabs>
      {
        roles.map((role, index)=> {
          const DashboardView = dashboardViews[role]
          return (
            <TabPanel tab={tab} index={index} key={role}>
              <DashboardView />
            </TabPanel>
          )
        })
      }
    </DashboardLayout>
  )
}

export default Dashboard
