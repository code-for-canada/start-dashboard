import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import EmbeddedIframe from './EmbeddedIframe'
import Panel from './Panel'
import ConfigDrawer from 'components/ConfigDrawer'
import PanelControlBlock from 'components/PanelControlBlock'
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

  // Array 2 objects merged into array 1 objects based on provided key.
  // Index order from array 1 is preserved.
  const mergeBy = (key, arr1, arr2) => {
    return arr1.map(item1 => ({
      ...item1,
      ...arr2.find(item2 => (item2[key] === item1[key]) && item2)
    }))
  }

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
                  {mergeBy('id', panels, PANELS_DATA).map((panel, index) => (
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
