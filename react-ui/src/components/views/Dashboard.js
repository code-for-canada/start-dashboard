import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Grid, Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import StaffDashboard from 'components/views/StaffDashboard'
import ReviewerDashboard from 'components/views/ReviewerDashboard'
import CuratorDashboard from 'components/views/CuratorDashboard'
import ArtistDashboard from 'components/views/ArtistDashboard'
import Unauthorized from 'components/views/Unauthorized'
import DashboardLayout from 'components/layouts/DashboardLayout'
import { DASHBOARD_VIEW_ORDER } from 'utils/constants'
import useRoles from 'customHooks/useRoles'
import Loading from 'components/common/Loading'

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
      {...rest}>
      {tab === index && children}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  tab: PropTypes.number,
  index: PropTypes.number
}

const DashboardTabs = ({ availableViews }) => {
  const { action } = useParams()
  const initialTab = action
    ? availableViews.findIndex(view => view.action === action)
    : 0
  const [tab, setTab] = useState(initialTab)
  const [unauthorized, setUnauthorized] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setTab(newValue)
    const newView = availableViews[newValue]
    const actionParam = newView.action
    if (actionParam === 'artist') {
      history.replace(`/dashboard/${actionParam}`)
    } else {
      window.history.replaceState(
        null,
        newView.role,
        `/dashboard/${actionParam}`
      )
    }
  }

  // check if user is authorized to see view
  useEffect(() => {
    if (action) {
      const view = availableViews.find(view => view.action === action)
      if (!view) {
        setUnauthorized(true)
      }
    }
  }, [action, availableViews])

  if (unauthorized) {
    return <Unauthorized />
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="Dashboard views navigation"
            indicatorColor="primary"
            className={classes.tabs}>
            {availableViews.map((view, index) => (
              <Tab
                key={view.role}
                label={view.role}
                id={`tab-${index}`}
                aria-controls={`panel-${index}`}
              />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      {availableViews.map((view, index) => {
        const DashboardView = dashboardViews[view.role]
        return (
          <TabPanel tab={tab} index={index} key={view.role}>
            <DashboardView />
          </TabPanel>
        )
      })}
    </>
  )
}

DashboardTabs.propTypes = {
  availableViews: PropTypes.array
}

const Dashboard = () => {
  const [availableViews, setAvailableViews] = useState()
  const { isLoadingRoles, roles = [] } = useRoles()

  // check which views user has access to
  useEffect(() => {
    if (!isLoadingRoles) {
      const availableViews = DASHBOARD_VIEW_ORDER.filter(view =>
        roles.includes(view.role)
      )
      setAvailableViews(availableViews)
    }
  }, [isLoadingRoles, roles])

  if (!availableViews) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    )
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
      <DashboardTabs availableViews={availableViews} />
    </DashboardLayout>
  )
}

export default Dashboard
