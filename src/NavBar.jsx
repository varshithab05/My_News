import './NavBar.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/logo.png';
import context from './context';
import { useContext, useEffect, useState } from 'react';
import NewsData from './NewsData';
import axios from 'axios';

function NavBar() {
  const [message, setMessage] = useState('');
  const c = useContext(context);
  useEffect(()=>{
      console.log(c.linkClicked);
  },[c.linkClicked]);
  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };
  const searchClick = (event)=>{
    event.preventDefault();
    c.setLinkClicked("search");

    const controller = new AbortController();
    const signal = controller.signal;

    axios.get(`https://newsdata.io/api/1/news?apikey=pub_367340a2a3e775420498d8596f658144a308f&q=${message}&country=in&language=en`,signal)
    .then((response)=>{
      console.log(response.data.results);
      c.setSearchnews(response.data.results);
    }).catch(function(error){
        if (error.name === 'AbortError') {
            console.log('Request aborted');
        } else {
            console.log('Error:', error);
        }
    });
    return () => {
        controller.abort();
    };
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-dark nav">
      <Container fluid>
        <Navbar.Brand href="#">
            <img
              alt=""
              src={logo}
              width="60"
              height="30"
              className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Button variant='custom' className='btn-link' value={"top"} onClick={(e)=>c.setLinkClicked(e.target.value)}>Top News</Button>
            <Button variant='custom' className='btn-link' value={"sports"} onClick={(e)=>c.setLinkClicked(e.target.value)}>Sports</Button>
            <Button variant='custom' className='btn-link' value={"technology"} onClick={(e)=>c.setLinkClicked(e.target.value)}>Technology</Button>
            <Button variant='custom' className='btn-link' value={"health"} onClick={(e)=>c.setLinkClicked(e.target.value)}>Health</Button>
            <Button variant='custom' className='btn-link' value={"science"} onClick={(e)=>c.setLinkClicked(e.target.value)}>Science</Button>
            <Button variant='custom' className='btn-link' value={"business"} onClick={(e)=>c.setLinkClicked(e.target.value)}>Business</Button>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for Specific News"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
              value={message}
            />
            <Button variant='custom' onClick={searchClick} className='search-Btn'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;