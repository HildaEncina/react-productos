

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';



const ListaProductos = (props) => {
 
  const parametros = useParams();
  const navegacion = useNavigate();
  console.log("props", props);
  console.log("parametros", parametros);


  const eliminarProducto = async (productoId) => {
    try {
      const URL = `http://localhost:8080/producto/eliminar/${productoId}`;
      await axios.delete(URL);
      props.eliminarProductoDeLaLista(productoId);
      navegacion("/productos");
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  }

  return (
    <>
      <h2>All Products:</h2>
      {props.listaProductos.map((producto, indice) => (
        <ul key={indice}>
          <div>
            <Link to={`/detalle/producto/${producto._id}`}>
              {producto.name}
            </Link>
            <button onClick={() => eliminarProducto(producto._id)}> Eliminar </button>
          </div>
        </ul>
      ))}
    </>
  );
};

export default ListaProductos;