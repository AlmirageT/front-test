import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getPostsApi } from './store/actions/postsAction'
import { FormattedMessage, injectIntl } from 'react-intl'

import './App.css'

const App = ({dataPosts, getPostsApi, intl}) => {
  useEffect(() => {
    getPostsApi()
    // eslint-disable-next-line
  }, [])
  

  return (
    <Fragment key={Math.random()}>
      {dataPosts.lenght > 0 ?
        dataPosts.map((elemento, index) => (
          <Container key={Math.random()}>
            <Row key={Math.random()}>
                <Col key={Math.random()}>
                    <Card key={Math.random()} className="m-auto" >
                        <Card.Header style={{ textAlign: 'center' }}><h2>{elemento.title}</h2></Card.Header>
                        <Card.Body className='fit-img'>
                          <div dangerouslySetInnerHTML={{__html: elemento.body}}/>
                        </Card.Body>
                    </Card>
                    <br/>
                </Col>
            </Row>
          </Container>
        ))
        : <Container>
          <Row>
            <Col>
              <FormattedMessage id="noData"/>
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  );
}
const mapStateToProps = ({posts}) => ({
  dataPosts: posts.dataPosts
})

const mapDispatchToProps = {
  getPostsApi
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(App));
