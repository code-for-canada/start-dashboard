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
  const { name, isVisible, firstItem, lastItem } = props

  const moveDown = () => {
    console.log('moving down!')
  }

  const moveUp = () => {
    console.log('moving up!')
  }

  return(
    <tr>
      <td className="align-middle"><nobr>{name}</nobr></td>
      <td>
        <div className="btn-group" role="group" aria-label={`Actions on view: ${name}`}>
            <ShowHideButton isVisible={isVisible} />
            <MoveUpButton disabled={firstItem} onClick={moveUp} />
            <MoveDownButton disabled={lastItem} onClick={moveDown} />
        </div>
      </td>
    </tr>
  )
}

const ViewControlBlock = () => {
  const initialData = [
    {
      name: 'Project Updates',
      isVisible: true,
      order: 0,
    },
    {
      name: 'Submit Update',
      isVisible: true,
      order: 1,
    },
    {
      name: 'Artwork Status Board',
      isVisible: false,
      order: 2,
    },
    {
      name: 'Submissions',
      isVisible: true,
      order: 3,
    },
    {
      name: 'Artworks',
      isVisible: true,
      order: 4,
    },
    {
      name: 'Artists',
      isVisible: false,
      order: 5,
    },
  ]

  return(
    <>
      <h4 className="my-3">All views</h4>
      <table className="table table-sm">
        <tbody>
          {initialData.map((view, index) => <ViewControlBlockItem {...view} key={view.name} firstItem={index === 0} lastItem={index === initialData.length - 1} />)}
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
                  <Panel title='Progress Updates' defaultOpen={true} defaultSmall={true} editLink="https://airtable.com/tblhqR67jrTJ169Cf/viwvQN6OyFyxsPYtq?blocks=hide" editText="Edit in Airtable">
                    <EmbeddedIframe title="Artwork Progress Updates" src="https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on" />
                  </Panel>

                  <Panel title='Submit Update' defaultOpen={true} defaultSmall={true} editLink="https://airtable.com/tblhqR67jrTJ169Cf/viwV5AQuGxE4OfNX0?blocks=hide" editText="Edit in Airtable">
                    <EmbeddedIframe title="Artwork Progress Update Form" src="https://airtable.com/embed/shr087J79r2jG6rE2?backgroundColor=red" />
                  </Panel>

                  <Panel title='Artwork Status Board' defaultOpen={true} defaultSmall={false} editLink="https://airtable.com/tbl5ApSEOzPpe4fwp/viwiX18oxXONzk8th?blocks=hide" editText="Edit in Airtable">
                    <EmbeddedIframe title="Artwork Status Board" src="https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on" />
                  </Panel>

                  <Panel title='Submissions' defaultOpen={true} defaultSmall={false} editLink="https://streetartto.submittable.com/submissions" editText="Edit in Submittable">
                    <EmbeddedIframe title="Submissions" src="https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on" />
                  </Panel>

                  <Panel title='Artworks' defaultOpen={true} defaultSmall={false} editLink="https://airtable.com/tbl5ApSEOzPpe4fwp/viwfmyIqZl3bsj2eo?blocks=hide" editText="Edit in Airtable">
                    <EmbeddedIframe title="Artworks" src="https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on" />
                  </Panel>

                  <Panel title='Artists' defaultOpen={true} defaultSmall={false} editLink="https://www.cognitoforms.com/forms/artistprofile/entries" editText="Edit in CognitoForms">
                    <EmbeddedIframe title="Artists" src="https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on" />
                  </Panel>
                </Row>
              </Container>
            </div>
            <Sidebar>
              <ViewControlBlock />
            </Sidebar>
          </div>
        </Container>
      </div>
    </Container>
  )
};

export default StaffDashboard;
