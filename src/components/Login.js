import React, { useState, useEffect } from 'react'
import { Button, Form, Card } from 'react-bootstrap';
import { login } from '../store/actions/loginAction'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl'
import es from '../i18n/es'
import en from '../i18n/en'
const Login = ({ isLoggedIn, lang, login }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPasssword ] = useState('')
  const [ isLogged, setIsLogged ] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const messages = {
    es: es,
    en: en
}
  useEffect(() => {
    if(isLogged){
      navigate('/')
    }
  }, [isLogged])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email !== '' && password !== ''){
      await login(email, password)
      setIsLogged(true)
    }else{
      console.log("ingresa los datos")
      return;
    }
  }

  return (
    <IntlProvider locale={lang ? lang : 'es'} messages={messages[lang] ? messages[lang] : messages['es'] }>
      <Card className="m-auto" style={{ maxWidth: '400px' }}>
        <Card.Header style={{ textAlign: 'center' }}><FormattedMessage id="login" /></Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label><FormattedMessage id="email" /></Form.Label>
              <Form.Control type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><FormattedMessage id="password" /></Form.Label>
              <Form.Control type="password" placeholder="*********" value={password} onChange={(e) => setPasssword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              <FormattedMessage id="btnLogin" />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </IntlProvider>
  );
}


const mapStateToProps = ({session, lang}) => ({
  isLoggedIn: session.isLoggedIn,
  lang: lang.lang
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
