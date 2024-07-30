import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FormularioProducto = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navegacion = useNavigate();

  const enviarFormularioProducto = async (e) => {
    e.preventDefault(); 
    try {
      const nuevoProducto = { name, price, description };
      const URL = "http://localhost:8080/producto/nuevo";
      const respuesta = await axios.post(URL, nuevoProducto);

      props.actualizarListaProducto(respuesta.data);
      setName("");
      setPrice(0);
      setDescription("");
      navegacion("/productos");
    } catch (error) {
      console.log("Algo falló", error);
      setError(error.response.statusText);
    }
  }

  return (
    <>
      <h2>Agregar un nuevo producto</h2>
      <form onSubmit={enviarFormularioProducto}>
        <div>
          <label htmlFor="name">Title:</label>
          <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input type='number' id='price' name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type='text' id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button>Create</button>
        <div>{error}</div>
      </form>
    </>
  );
}

export default FormularioProducto;