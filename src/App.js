import { useEffect, useState } from 'react';

import './App.css';
import configData from './config.json';

import Table from 'react-bootstrap/Table';
import { Alert, Button, Toast, ToastContainer } from 'react-bootstrap';


function App() {
  const [formattedFiles, setFormatedFiles] = useState([]);
  const [infoCargada, setinfoCargada] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {

   
    
    if(!infoCargada){
      obtenerFiles("")
      setinfoCargada(true)
    }
    

  });
  const formatFiles = (jsonArray) =>{
    let format = []
    jsonArray.forEach(fileObj => {
      fileObj.lines.forEach(line =>{
        //por cada linea creo un registro con el nombre mas los datos de la linea
        format = format.concat({name: fileObj.file,hex: line.hex, text: line.text,number: line.number})
       })
    });
    
    //let format = jsonArray.foreach()
    //alert(JSON.stringify(format))
    return format;
  }
  const obtenerFiles = async (query) => {
    const options = {
        method: "GET"
    };
    var url = `${configData.SERVER_URL}` + (query? "?fileName="+query : "")
    
    await fetch(url, options)
    .then((response) => {
        response.json().then(async(filesJson) =>
        {
          setShowAlert(filesJson.length ===0)            
          setFormatedFiles(formatFiles(filesJson))
    
    }).catch(exception => {
        alert("Hubo un error obteniendo los archivos")

    });
    });
  
    
  }
  function handleChange(event) {
    obtenerFiles(event.target.value)
  }
  return (
    <div className="App">
      <div className='Header p-2'>React test app</div>
      <div className='Container'>
        <div className="input-group">
        <input  type="text" className="form-control CustomInput" placeholder='Ingrese el nombre el archivo' onChange={handleChange}></input>

        </div>
        <Table size="sm" striped bordered >
        <thead>
          <tr>
            <th>File name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
        {formattedFiles?.map((item, index) => {
              return <tr key={item.hex}>
                      <td>{item?.name}</td>                    
                      <td>{item?.text}</td>
                      <td>{item?.number}</td>
                      <td>{item?.hex}</td>
                    </tr>
          })
          
          }
        </tbody>
        </Table>
      </div>
      
      <ToastContainer position="top-end" >
        <Toast onClose={() => setShowAlert(false)} show={showAlert} delay={5000} autohide >
          <Toast.Header>
            <strong className="me-auto">Atención!</strong>
          </Toast.Header>
          <Toast.Body>No se encontraron archivos con el nombre solicitado</Toast.Body>
        </Toast>
      </ToastContainer>

        
    </div>
    
  );
}

export default App;
