import './App.css';
import React, { useEffect, useState } from 'react';
import FormularioProducto from './componentes/FormularioProducto/FormularioProducto';
import ListaProductos from './componentes/ListaProductos/ListaProductos'; 
import DetalleProducto from './componentes/ListaProductos/DetalleProducto';
import axios from 'axios';
import { Route, Routes, Link } from "react-router-dom";

const App = () => {
  const [listaProductos, setListaProductos] = useState([]);

  const actualizarListaProducto = (nuevoProducto) => {
    setListaProductos([...listaProductos, nuevoProducto]);
  };

  useEffect(() => {
    const obtenerListaProductos = async () => {
      const URL = "http://localhost:8080/producto";
      const respuesta = await axios.get(URL);
      setListaProductos(respuesta.data);
    }
    obtenerListaProductos();
  }, []);

  const eliminarProductoDeLaLista = (_id) => {
    const listaTemporal = [...listaProductos];
    for(let i = 0; i < listaTemporal.length; i ++){
      if(listaTemporal[i]._id ===_id){
        listaTemporal.splice(i, 1);
      }
    }
    setListaProductos(listaTemporal);
  }



return (
    <>
      <h1>Product Manager</h1>
      <Link to="/productos">Lista de Productos</Link> - 
      <Link to="/formulario/producto">Agregar Producto</Link>
      <Routes>
        <Route path='/formulario/producto' element={<FormularioProducto actualizarListaProducto={actualizarListaProducto} />} />
        <Route path='/productos' element={<ListaProductos listaProductos={listaProductos} eliminarProductoDeLaLista={eliminarProductoDeLaLista}  />} />
        <Route path='/detalle/producto/:id' element={<DetalleProducto listaProductos={listaProductos} eliminarProductoDeLaLista={eliminarProductoDeLaLista} />} />
      </Routes>
    </>
  );
}

export default App;