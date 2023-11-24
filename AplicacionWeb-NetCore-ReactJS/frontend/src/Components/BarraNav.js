import { Container, Form, FormControl, Navbar, Nav, Button } from 'react-bootstrap';


const BarraNav = ({searchMovies, changeHandler, query}) => {
    return(
        <Navbar bg='dark' expand="lg" variant='dark'>
        <Container fluid>
          <Navbar.Brand href='/home' >MovieDB App</Navbar.Brand>
          <Navbar.Brand href='/home'>Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>
            <Form className='d-flex' onSubmit={searchMovies}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="query"
                value={query}
                onChange={changeHandler}
                ></FormControl>
              <Button variant="secondary" type="submit">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default BarraNav;