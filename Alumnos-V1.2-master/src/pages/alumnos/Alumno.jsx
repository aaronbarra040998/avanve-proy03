import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Alumno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      pos: null,
      titulo: "AGREGAR ALUMNO",
      id: 0,
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      foto: "",
    };
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);
    this.cambioFecha = this.cambioFecha.bind(this);
    this.cambioFoto = this.cambioFoto.bind(this);
    // luego de guardar
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);

    this.guardar = this.guardar.bind(this);
  }

  cambioNombre(e) {
    console.log();
    this.setState({
      nombre: e.target.value,
    });
  }

  cambioApellido(e) {
    console.log();
    this.setState({
      apellido: e.target.value,
    });
  }

  cambioFecha(e) {
    this.setState({
      fecha_nacimiento: e.target.value,
    });
  }

  cambioFoto(e) {
    this.setState({
      foto: e.target.files[0],
    });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/alumno/").then((res) => {
      console.log(res.data);
      this.setState({ alumnos: res.data });
    });
  }

  // Metodos

  // mostrar punto 5
  mostrar(cod, index) {
    axios.get("http://127.0.0.1:8000/alumno/" + cod).then((res) => {
      this.setState({
        pos: index,
        titulo: "Editar",
        id: res.data.id,
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        fecha_nacimiento: res.data.fecha_nacimiento,
        foto: res.data.foto_url, // Cambia "foto" por el nombre del campo de la imagen en la respuesta del servidor
      });
    });
  }

  guardar(e) {
    e.preventDefault(); // sin el preventDefault las acciones dentro de la página web no funcionarán
    let cod = this.state.id;
    const datos = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      fecha_nacimiento: this.state.fecha_nacimiento,
      foto_url: this.state.foto,
    };
    console.log(datos);
    if (cod > 0) {
      // edición de un registro
      axios
        .put("http://127.0.0.1:8000/alumno/" + cod, datos)
        .then((res) => {
          let indx = this.state.pos;
          this.state.alumnos[indx] = res.data;
          var temp = this.state.alumnos;
          this.setState({
            pos: null,
            titulo: "Nuevo",
            id: 0,
            nombre: "",
            apellido: "",
            fecha_nacimiento: "",
            foto: "",
            alumnos: temp,
          });
        })
        .catch((error) => {
          console.log(error.toString());
        });
    } else {
      // nuevo registro
      axios
        .post("http://127.0.0.1:8000/alumno/", datos)
        .then((res) => {
          this.state.alumnos.push(res.data); // push agrega un valor a la data
          var temp = this.state.alumnos;
          this.setState({
            id: 0,
            nombre: "",
            apellido: "",
            fecha_nacimiento: "",
            foto: "",
            alumnos: temp,
          });
        })
        .catch((error) => {
          console.log(error.toString());
        });
    }
  }

  // eliminar 7
  eliminar(cod) {
    let rpta = window.confirm("Desea Eliminar?");
    if (rpta) {
      axios.delete("http://127.0.0.1:8000/alumno/" + cod).then((res) => {
        var temp = this.state.alumnos.filter((alumno) => alumno.id !== cod);
        this.setState({
          alumnos: temp,
        });
      });
    }
  }

  render() {
    return (
      <>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="index.html">
            Start Bootstrap
          </a>

          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <i className="fas fa-bars"></i>
          </button>

          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />
              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#!">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Activity Log
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">MODULOS</div>
                  <a
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    Usuarios
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Static Navigation</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item">
                    <a href="index.html">Inicio</a>
                  </li>
                  <li className="breadcrumb-item active">Parentescos</li>
                </ol>
                <div className="card mb-4">
                  <div className="card-body">
                    <Container>
                      <h1>{this.state.titulo}</h1>
                      <Form onSubmit={this.guardar}>
                        <Form.Control
                          type="hidden"
                          defaultValue={this.state.id}
                        />
                        <Form.Group className="mb-3">
                          <Form.Label>Ingrese Nombre:</Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.nombre}
                            onChange={this.cambioNombre}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Ingrese Apellido:</Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.apellido}
                            onChange={this.cambioApellido}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Fecha:</Form.Label>
                          <Form.Control
                            type="date"
                            value={this.state.fecha_nacimiento}
                            onChange={this.cambioFecha}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Foto:</Form.Label>
                          <Form.Control
                            type="file"
                            defaultValue={this.state.foto}
                            onChange={this.cambioFoto}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          GUARDAR
                        </Button>
                      </Form>
                      <hr />
                    </Container>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Fecha</th>
                          <th>Foto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.alumnos.map((alumno, index) => {
                          return (
                            <tr key={alumno.id}>
                              <td>{alumno.id}</td>
                              <td>{alumno.nombre}</td>
                              <td>{alumno.apellido}</td>
                              <td>{alumno.fecha_nacimiento}</td>
                              <td>
                                <img
                                  src={`http://localhost:8000/${alumno.foto}`}
                                />
                              </td>
                              <td>
                                <Button
                                  variant="success"
                                  onClick={() => this.mostrar(alumno.id, index)}
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => this.eliminar(alumno.id)}
                                >
                                  Eliminar
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; Your Website 2022
                  </div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

export default Alumno;
