import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'

import EmbeddedIframe from './EmbeddedIframe'
import Panel from './Panel'
import Drawer from '@material-ui/core/Drawer'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import CloseIcon from '@material-ui/icons/Close'
import SettingsIcon from '@material-ui/icons/Settings'
import usePanelState from './usePanelState'
import { PANELS_DATA } from '../../utils/constants'

const StaffDashboard = () => {
  const {
    panels,
    toggleVisibility,
    toggleSize,
    moveUp,
    moveDown
  } = usePanelState(PANELS_DATA)

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h1 className="mb-2">StART Staff Dashboard</h1>
        </Col>
        <Col xs={1}>
          <ConfigDrawer>
            <PanelControlBlock
              panels={panels}
              moveUp={moveUp}
              moveDown={moveDown}
              toggleVisibility={toggleVisibility}
            />
          </ConfigDrawer>
        </Col>
      </Row>

      <Row>
        <Container fluid>
          <Row>
            <Col>
              <Container fluid className="px-0">
                <Row>
                  {panels.map((panel, index) => (
                    <Panel
                      {...panel}
                      key={panel.id}
                      index={index}
                      toggleVisibility={toggleVisibility}
                      toggleSize={toggleSize}>
                      <EmbeddedIframe title={panel.id} src={panel.frameSrc} />
                    </Panel>
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  )
}

export default StaffDashboard
