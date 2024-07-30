import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const DetalleProducto = (props) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const navegacion = useNavigate();
  // const parametros = useParams();
  // console.log(parametros);
  console.log(props);
  useEffect(() => {
    const obtenerDetalleProducto = async () => {
      try {
        const URL = `http://localhost:8080/producto/producto/${id}`;
        const respuesta = await axios.get(URL);
        setProducto(respuesta.data);
      } catch (error) {
        setError(error.response ? error.response.statusText : 'Error de conexión');
      }
    };
    obtenerDetalleProducto();
  }, [id]);


  const productoActual = props.listaProductos.find((producto) => producto._id === id);

    const eliminarProducto = async () => {
        const URL = `http://localhost:8080/producto/eliminar/${producto._id}`;
        await axios.delete(URL);
        props.eliminarProductoDeLaLista(productoActual._id);
        navegacion("/productos");
    }


    const redireccionaraListaProductos = () => {
      navegacion(`/productos`);
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <>
     <div>
      <h2>Detalle del Producto</h2>
      <p>Nombre: {producto.name}</p>
      <p>Precio: ${producto.price}</p>
      <p>Descripción: {producto.description}</p>
    </div>
    <button onClick={eliminarProducto}> Eliminar </button>
    <button onClick={redireccionaraListaProductos}> Agregar Producto </button>

    </>
   
  );
};

export default DetalleProducto;
