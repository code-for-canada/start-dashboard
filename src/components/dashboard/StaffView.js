import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import EmbeddedIframe from './EmbeddedIframe'
import Panel from './Panel'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import usePanelState from './usePanelState'

const IconButton = props => {
  const { onClick, disabled, children } = props

  return(
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn btn-secondary btn-sm"
      type="button"
    >
      {children}
    </button>
  )
}

const ShowHideButton = props => {
  const { isVisible } = props

  return(
    <IconButton {...props}>
      {isVisible
        ? <VisibilityIcon />
        : <VisibilityOffIcon />
      }
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
    moveDown,
  } = props

  return(
    <tr>
      <td className="align-middle"><nobr>{title}</nobr></td>
      <td>
        <div className="btn-group" role="group" aria-label={`Actions on view: ${title}`}>
            <ShowHideButton isVisible={isVisible} onClick={() => toggleVisibility(index)} />
            <MoveUpButton disabled={isFirstItem} onClick={() => moveUp(index)} />
            <MoveDownButton disabled={isLastItem} onClick={() => moveDown(index)} />
        </div>
      </td>
    </tr>
  )
}

const PanelControlBlock = props => {
  const { panels } = props

  return(
    <>
      <h4 className="my-3">All views</h4>
      <table className="table table-sm">
        <tbody>
          {panels.map((panel, index) =>
            <PanelControlBlockItem
              {...props}
              {...panel}
              index={index}
              key={panel.title}
              isFirstItem={index === 0}
              isLastItem={index === panels.length - 1}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

const Sidebar = props => (
  <Col xs={2} className="order-2" id="sticky-sidebar">
    <div className="sticky-top">
      {props.children}
    </div>
  </Col>
)

const StaffDashboard = ({user}) => {
  const defaultPanels = [
    {
      title: 'Project Updates',
      isVisible: true,
      isSmall: true,
      editLink: 'https://airtable.com/tblhqR67jrTJ169Cf/viwvQN6OyFyxsPYtq?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Submit Update',
      isVisible: true,
      isSmall: true,
      editLink: 'https://airtable.com/tblhqR67jrTJ169Cf/viwV5AQuGxE4OfNX0?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shr087J79r2jG6rE2?backgroundColor=red',
    },
    {
      title: 'Artwork Status Board',
      isVisible: false,
      isSmall: false,
      editLink: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viwiX18oxXONzk8th?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Submissions',
      isVisible: true,
      isSmall: false,
      editLink: 'https://streetartto.submittable.com/submissions',
      editText: 'Edit in Submittable',
      frameSrc: 'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Artworks',
      isVisible: true,
      isSmall: false,
      editLink: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viwfmyIqZl3bsj2eo?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Artists',
      isVisible: false,
      isSmall: false,
      editLink: 'https://www.cognitoforms.com/forms/artistprofile/entries',
      editText: 'Edit in CognitoForms',
      frameSrc: 'https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on',
    },
  ]

  const {panels, toggleVisibility, moveUp, moveDown} = usePanelState(defaultPanels)

  return (
    <Container>
      <Row>
        <Col className="mt-4">
          <h1 className="mb-2">StART Staff Dashboard</h1>
        </Col>
      </Row>

      <Row>
        <Container>
          <Row>
            <Col>
              <Container>
                <Row>
                  {panels.map((panel, index) =>
                    <Panel
                      {...panel}
                      key={panel.title}
                      index={index}
                      isVisible={panel.isVisible}
                      defaultSmall={panel.isSmall}
                      toggleVisibility={toggleVisibility}
                    >
                      <EmbeddedIframe
                        title={panel.title}
                        src={panel.frameSrc}
                      />
                    </Panel>
                  )}
                </Row>
              </Container>
            </Col>
            <Sidebar>
              <PanelControlBlock
                panels={panels}
                moveUp={moveUp}
                moveDown={moveDown}
                toggleVisibility={toggleVisibility}
              />
            </Sidebar>
          </Row>
        </Container>
      </Row>
    </Container>
  )
};

export default StaffDashboard;
