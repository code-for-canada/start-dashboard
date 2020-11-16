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
  // const mergeBy = (key, arr1, arr2) => {
  //   return arr1.map(item1 => ({
  //     ...item1,
  //     ...arr2.find(item2 => (item2[key] === item1[key]) && item2)
  //   }))
  // }

  const addConfigToDefaultPanels = () => {
    return PANELS_DATA.map(panel => {
      const panelConfig = panels.find(config => config.id === panel.id)
      return {
        ...panel,
        isVisible: panelConfig ? panelConfig.isVisible : panel.isVisible,
        isSmall: panelConfig ? panelConfig.isSmall : panel.isSmall
      }
    })
  }

  const orderPanels = panelsWithConfig => {
    panels.forEach((config, configIndex) => {
      const panel = panelsWithConfig.find(p => p.id === config.id)
      if (panel) {
        const panelIndex = panelsWithConfig.indexOf(panel)
        panelsWithConfig.splice(panelIndex, 1)
        panelsWithConfig.splice(configIndex, 0, panel)
      }
    })

    return panelsWithConfig
  }

  const panelsWithConfig = addConfigToDefaultPanels()
  const orderedPanels = orderPanels(panelsWithConfig)

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
                  {orderedPanels.map((panel, index) => (
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
