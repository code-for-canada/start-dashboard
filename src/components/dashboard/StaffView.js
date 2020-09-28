import React from "react";
import { Container, Row } from "react-bootstrap";

import EmbeddedIframe from './EmbeddedIframe'
import Panel from './Panel'

const ViewControlBlock = () => (
  <>
    <h4 className="my-3">All views</h4>
    <ul>
      <li>Project Updates <a href="#">hide</a></li>
      <li>Submit Update</li>
      <li>Artwork Status Board</li>
      <li>Submissions</li>
      <li>Artworks</li>
      <li>Artists</li>
    </ul>
  </>
)

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
