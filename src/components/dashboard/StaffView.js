import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

import EmbeddedIframe from './EmbeddedIframe'
import Panel from './Panel'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const IconButton = props => (
  <button
    {...props}
    className="btn btn-secondary btn-sm"
    type="button"
  />
)

const ShowHideButton = props => {
  const [ isVisible, setVisible ] = useState(props.isVisible)

  return(
    <IconButton onClick={() => setVisible(!isVisible)}>
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

const ViewControlBlockItem = props => {
  const { title, isVisible, firstItem, lastItem } = props

  const moveDown = () => {
    console.log('moving down!')
  }

  const moveUp = () => {
    console.log('moving up!')
  }

  return(
    <tr>
      <td className="align-middle"><nobr>{title}</nobr></td>
      <td>
        <div className="btn-group" role="group" aria-label={`Actions on view: ${title}`}>
            <ShowHideButton isVisible={isVisible} />
            <MoveUpButton disabled={firstItem} onClick={moveUp} />
            <MoveDownButton disabled={lastItem} onClick={moveDown} />
        </div>
      </td>
    </tr>
  )
}

const ViewControlBlock = props => {
  const { data } = props
  const sortByOrder = (a, b) => {
    return a.order - b.order
  }

  return(
    <>
      <h4 className="my-3">All views</h4>
      <table className="table table-sm">
        <tbody>
          {data.sort(sortByOrder).map((view, index) =>
            <ViewControlBlockItem
              {...view}
              key={view.title}
              firstItem={index === 0}
              lastItem={index === data.length - 1}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

const Sidebar = props => (
  <div className="col-2 order-2" id="sticky-sidebar">
    <div className="sticky-top">
      {props.children}
    </div>
  </div>
)

const StaffDashboard = ({user}) => {
  const panelsData = [
    {
      title: 'Project Updates',
      isVisible: true,
      isSmall: true,
      order: 0,
      editLink: 'https://airtable.com/tblhqR67jrTJ169Cf/viwvQN6OyFyxsPYtq?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Submit Update',
      isVisible: true,
      isSmall: true,
      order: 1,
      editLink: 'https://airtable.com/tblhqR67jrTJ169Cf/viwV5AQuGxE4OfNX0?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shr087J79r2jG6rE2?backgroundColor=red',
    },
    {
      title: 'Artwork Status Board',
      isVisible: false,
      isSmall: false,
      order: 2,
      editLink: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viwiX18oxXONzk8th?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Submissions',
      isVisible: true,
      isSmall: false,
      order: 3,
      editLink: 'https://streetartto.submittable.com/submissions',
      editText: 'Edit in Submittable',
      frameSrc: 'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Artworks',
      isVisible: true,
      isSmall: false,
      order: 4,
      editLink: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viwfmyIqZl3bsj2eo?blocks=hide',
      editText: 'Edit in Airtable',
      frameSrc: 'https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on',
    },
    {
      title: 'Artists',
      isVisible: false,
      isSmall: false,
      order: 5,
      editLink: 'https://www.cognitoforms.com/forms/artistprofile/entries',
      editText: 'Edit in CognitoForms',
      frameSrc: 'https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on',
    },
  ]

  return (
    <Container>
      <div className="row">
        <div className="col-12 mt-4">
          <h1 className="mb-2">StART Staff Dashboard</h1>
        </div>
      </div>

      <div className="row">
        <Container>
          <div className="row">
            <div className="col">
              <Container>
                <Row>
                  {panelsData.map((panel) =>
                    <Panel
                      {...panel}
                      key={panel.title}
                      defaultOpen={panel.isVisible}
                      defaultSmall={panel.isSmall}
                    >
                      <EmbeddedIframe
                        title={panel.title}
                        src={panel.frameSrc}
                      />
                    </Panel>
                  )}
                </Row>
              </Container>
            </div>
            <Sidebar>
              <ViewControlBlock data={panelsData} />
            </Sidebar>
          </div>
        </Container>
      </div>
    </Container>
  )
};

export default StaffDashboard;
