import React, { useState } from 'react'
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

const IconButton = props => {
  const { onClick, disabled, children } = props

  return (
    <>
      <style type="text/css">
        {`
        #panel-control-block svg {
          width: 0.8em;
        }
        `}
      </style>
      <button
        onClick={onClick}
        disabled={disabled}
        className="btn btn-secondary btn-light"
        type="button">
        {children}
      </button>
    </>
  )
}

const ShowHideButton = props => {
  const { isVisible } = props

  return (
    <IconButton {...props}>
      {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  )
}

const MoveUpButton = props => (
  <IconButton {...props}>
    <KeyboardArrowUpIcon />
  </IconButton>
)

const MoveDownButton = props => (
  <IconButton {...props}>
    <KeyboardArrowDownIcon />
  </IconButton>
)

const PanelControlBlockItem = props => {
  const {
    title,
    index,
    isVisible,
    isFirstItem,
    isLastItem,
    toggleVisibility,
    moveUp,
    moveDown
  } = props

  return (
    <>
      <style type="text/css">
        {`
        .btn-group-micro > .btn {
          padding: 0.1rem 0.25rem;
        }
        `}
      </style>
      <tr>
        <td className="align-middle">
          <nobr>{title}</nobr>
        </td>
        <td>
          <div
            className="btn-group btn-group-micro"
            role="group"
            aria-label={`Actions on view: ${title}`}>
            <ShowHideButton
              isVisible={isVisible}
              onClick={() => toggleVisibility(index)}
            />
            <MoveUpButton
              disabled={isFirstItem}
              onClick={() => moveUp(index)}
            />
            <MoveDownButton
              disabled={isLastItem}
              onClick={() => moveDown(index)}
            />
          </div>
        </td>
      </tr>
    </>
  )
}

const PanelControlBlock = props => {
  const { panels } = props

  return (
    <div id="panel-control-block">
      <h4 className="my-3">All views</h4>
      <table className="table table-sm small">
        <tbody>
          {panels.map((panel, index) => (
            <PanelControlBlockItem
              {...props}
              {...panel}
              index={index}
              key={panel.id}
              isFirstItem={index === 0}
              isLastItem={index === panels.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ConfigDrawer = props => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(open)
  }

  return (
    <>
      <button className="btn btn-light btn-block" onClick={toggleDrawer(true)}>
        <SettingsIcon />
      </button>
      <Drawer anchor="right" open={open}>
        <div className="mx-3 pt-2">
          <button
            className="btn btn-light"
            type="button"
            onClick={toggleDrawer(false)}>
            <CloseIcon />
          </button>
          {props.children}
        </div>
      </Drawer>
    </>
  )
}

const StaffDashboard = ({ user }) => {
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
