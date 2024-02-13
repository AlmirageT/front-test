import React, { Fragment, useEffect, useState } from 'react'
import { Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../store/actions/loginAction'
import { setLangAction } from '../store/actions/langAction'
import { IntlProvider, FormattedMessage } from 'react-intl'
import es from '../i18n/es'
import en from '../i18n/en'

const AuthLayout = ({children, isLoggedIn, user, lang, logOut, setLangAction}) => {
    const [ defaultLang, setDefaultLang ] = useState('es')
    useEffect(() => {
        const handleLang = async (defaultLang) => {
            setLangAction(defaultLang)
        }
        handleLang(defaultLang)
    }, [defaultLang])
    useEffect(() => {
    if(lang){
        setDefaultLang(lang)
    }
    }, [])
    
    
    const navigate = useNavigate();
    const messages = {
        es: es,
        en: en
    }
    
    const handleLogOut = async () => {
        logOut()
        navigate('/')
    }

    return (
        <Fragment>
            <IntlProvider locale={defaultLang} messages={messages[defaultLang]}>
                <Nav variant="pills" style={{display: 'flow-root'}}>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate("/")} className="text-dark" style={{float: 'left'}}>
                            <FormattedMessage id="navHeader" />
                        </Nav.Link>
                    </Nav.Item>
                    <NavDropdown title={defaultLang} id="nav-dropdown-es" className="text-dark" style={{float: 'right', color:'black'}}>
                        <NavDropdown.Item onClick={() => setDefaultLang('es')}>es</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setDefaultLang('en')}>en</NavDropdown.Item>
                    </NavDropdown>
                    {isLoggedIn ? 
                        <NavDropdown title={isLoggedIn ? user.name : <FormattedMessage id="navHeader" />} id="nav-dropdown" className="text-dark" style={{float: 'right', color:'black'}}>
                            <NavDropdown.Item onClick={() => navigate('/posts')}><FormattedMessage id="dropdownUserFirst" /></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogOut}><FormattedMessage id="logOut" /></NavDropdown.Item>
                        </NavDropdown>
                    :
                        <Nav.Item style={{float: 'right'}}>
                            <Nav.Link onClick={() => navigate('/login')} className="text-dark" >
                                <FormattedMessage id="login" />
                            </Nav.Link>
                        </Nav.Item>
                    }
                    
                </Nav>
                <br/>
                {children}
            </IntlProvider>
        </Fragment>
    );
}

const mapStateToProps = ({session, lang}) => ({
    isLoggedIn: session.isLoggedIn,
    user: session.user,
    lang: lang.lang
})

const mapDispatchToProps = {
    logOut,
    setLangAction
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);