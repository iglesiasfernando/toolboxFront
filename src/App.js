import { useEffect, useState } from 'react';

import './App.css';
import configData from './config.json';

import Table from 'react-bootstrap/Table';


function App() {
  const [formattedFiles, setFormatedFiles] = useState([]);
  const [infoCargada, setinfoCargada] = useState(false);

  useEffect(() => {

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
    const obtenerFiles = async () => {
      const options = {
          method: "GET"
      };

      await fetch(`${configData.SERVER_URL}`, options)
      .then((response) => {
          response.json().then(async(json) =>
          {
            
            setFormatedFiles(formatFiles(json))
          
      
      }).catch(exception => {
          alert("Hubo un error obteniendo los archivos")

      });
      });
    
      
    }
    if(!infoCargada){
      obtenerFiles()
      setinfoCargada(true)
    }
    

  });
  

  return (
    <div className="App">
      <div className='Header p-2'>React test app</div>
      <div className='Container'>
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
    
    </div>
  );
}

export default App;
