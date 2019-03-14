import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol
} from "mdbreact";

class OrgsGrid extends Component {
  render() {
    const { orgs } = this.props;
    return (
      <div>
        <MDBCard>
          <MDBCardBody>
            <MDBTable hover>
              <MDBTableHead color="blue-grey lighten-4">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {orgs.map((orgs, i) => (
                  <tr key={orgs.id}>
                    <td>{i}</td>
                    <td>{orgs.Name}</td>
                    <td>{orgs.Country}</td>
                    <td>Status</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default OrgsGrid;
