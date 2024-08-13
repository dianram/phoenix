import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { userDefinition } from 'helpers/formatHelpers'

/**
 * The `Welcome` component in JavaScript renders a welcome message to a user on a Vehicle Control
 * Platform, displaying their name and user type.
 * @returns The `Welcome` component is being returned, which displays a welcome message to the user
 * along with information about the Vehicle Control Platform. The component includes the user's name,
 * user type, and a brief description of the platform's features.
 */
const Welcome = ({user}) => {

  return (
    <div className="hero-section my-4">
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <h1>Welcome {user.user_name} to our Vehicle Control Platform</h1>
            <p className='lead'>You are {userDefinition(user.role)}</p>
            <p className="lead">
              We're thrilled to have you here. With our cutting-edge device, the Phoenix Immobilizer, we ensure security and complete control over your car's ignition. Explore the advanced features of our web app and embrace a new era in vehicle management. Thank you for trusting us to keep your vehicle safe!
            </p>
            <div className='d-flex justify-content-around'>
              <i className='mdi mdi-car-connected' style={{ fontSize: '3rem' }}></i>
              <i className='mdi mdi-signal-variant'style={{ fontSize: '2rem' }}></i>
              <i className='mdi mdi-devices' style={{ fontSize: '3rem' }}></i>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Welcome