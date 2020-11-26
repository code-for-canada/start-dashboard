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
import useUtilityClasses from 'customHooks/useUtilityClasses'
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

const Dashboard = () => {
  const { action } = useParams()
  const utilClasses = useUtilityClasses()
  const history = useHistory()
  const [tab, setTab] = useState(0)
  const [availableViews, setAvailableViews] = useState([])
  const [unauthorized, setUnauthorized] = useState(false)
  const classes = useStyles()
  const { isLoadingRoles, roles = [] } = useRoles()

  const handleChange = (event, newValue) => {
    const action = availableViews[newValue].action
    history.replace(`/dashboard/${action}`)
  }

  // check which views user has access to
  useEffect(() => {
    if (!isLoadingRoles) {
      const availableViews = DASHBOARD_VIEW_ORDER.filter(view =>
        roles.includes(view.role)
      )
      setAvailableViews(availableViews)
    }
  }, [isLoadingRoles, roles])

  // go to correct tab based on action
  useEffect(() => {
    if (action && !isLoadingRoles) {
      const newTab = availableViews.findIndex(view => view.action === action)

      if (newTab !== -1 && tab !== newTab) {
        setTab(newTab)
      }
    }
  }, [action, availableViews, tab, isLoadingRoles])

  // check if user is authorized to see view
  useEffect(() => {
    if (action && !isLoadingRoles) {
      const view = availableViews.find(view => view.action === action)
      if (!view) {
        setUnauthorized(true)
      }
    }
  }, [action, availableViews, isLoadingRoles])

  if (unauthorized) {
    return <Unauthorized />
  }

  if (roles.length === 1) {
    const DashboardView = dashboardViews[roles[0]]
    return (
      <DashboardLayout>
        {isLoadingRoles && <Loading />}
        <DashboardView />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {isLoadingRoles && <Loading />}
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
                className={tab === index ? utilClasses.bgWhite : ''}
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
    </DashboardLayout>
  )
}

export default Dashboard
