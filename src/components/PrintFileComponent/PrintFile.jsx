import React from 'react'
import FileDetails from '../FileDetails/FileDetails'
import { useLocation } from "react-router-dom";
import { IoIosPrint } from "react-icons/io";

const PrintFile = () => {


    const location = useLocation();
    const { fileUtn } = location.state || {} ;
    console.log("print file:"+ fileUtn);

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return (
        <div>
             <FileDetails
              fileUtn={fileUtn}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />
            <div style={{display:'flex', alignItems:"center", justifyContent:"center", margin:'20px'}}>
                {/* <img width="50" height="50"  onClick={() => { window.print() }} src="https://img.icons8.com/ios-filled/50/print.png" alt="print"/> */}
                <IoIosPrint size={50} onClick={() => { window.print() }} />

            </div>
        </div>
    )
}

export default PrintFile
