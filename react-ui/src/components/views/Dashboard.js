import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Tabs, Tab, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import StaffDashboard from 'components/views/StaffDashboard'
import ReviewerDashboard from 'components/views/ReviewerDashboard'
import CuratorDashboard from 'components/views/CuratorDashboard'
import ArtistDashboard from 'components/views/ArtistDashboard'
import Unauthorized from 'components/views/Unauthorized'
import DashboardLayout from 'components/layouts/DashboardLayout'
import { DASHBOARD_VIEW_ORDER } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'
import useRoles from 'customHooks/useRoles'

const dashboardViews = {
  'StART Staff': StaffDashboard,
  'Advisory Committee': ReviewerDashboard,
  Curator: CuratorDashboard,
  Artist: ArtistDashboard
}

const useStyles = makeStyles(theme => ({
  tabs: {
    borderBottom: `1px solid #cccccc`
  }
}))

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
        children
      )}
    </div>
  );
}

const Dashboard = () => {
  const { action } = useParams()
  const utilClasses = useUtilityClasses()
  const history = useHistory()
  const [tab, setTab] = useState(0)
  const [unauthorized, setUnauthorized] = useState(true)
  const classes = useStyles()
  const { roles = [] } = useRoles()
  const availableViews = DASHBOARD_VIEW_ORDER.filter(view => roles.includes(view.role))

  const handleChange = (event, newValue) => {
    const action = availableViews[newValue].action
    history.push(`/dashboard/${action}`)
  };

  useEffect(() => {
    if (action) {
      const view = DASHBOARD_VIEW_ORDER.find(view => view.action === action)
      if (roles.includes(view.role)) {
        setUnauthorized(false)
      }
      const newTab = availableViews.findIndex(view => view.action === action)
      if (tab !== newTab) {
        setTab(newTab)
      }
    } else {
      setUnauthorized(false)
    }

  }, [action, availableViews])


  if (unauthorized) {
    return <Unauthorized />
  }

  if (roles.length === 1) {
    const DashboardView = dashboardViews[roles[0]]
    return (
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="Dashboard views navigation"
            indicatorColor="primary"
            className={classes.tabs}>
          {
            availableViews.map((view, index) => {
              return (
                <Tab
                  key={view.role}
                  label={view.role}
                  id={`tab-${index}`}
                  aria-controls={`panel-${index}`}
                  className={tab === index ? utilClasses.bgWhite : ''}
                />
              )
            })
          }
          </Tabs>
        </Grid>
      </Grid>
        {
          availableViews.map((view, index)=> {
            const DashboardView = dashboardViews[view.role]
            return (
              <TabPanel tab={tab} index={index} key={view.role}>
                <DashboardView />
              </TabPanel>
            )
            return null
          })
        }
    </DashboardLayout>
  )
}

export default Dashboard
