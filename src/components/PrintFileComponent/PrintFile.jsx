import React from 'react'
import FileDetails from '../FileDetails/FileDetails'
import { useLocation } from "react-router-dom";
import { FcPrint } from "react-icons/fc";
import styles from './printfile.module.css'
import { useNavigate } from 'react-router-dom';

const PrintFile = () => {
    const location = useLocation();
    const { fileUtn } = location.state || {} ;
    const navigate = useNavigate();

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return (
        <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
            <div style={{padding:'30px', width:'60%'}}>
                <div className="viteReactText"></div>
                <div className="browserInfo"></div>
                <div className="pageFooter"></div>
                <FileDetails
                      fileUtn={fileUtn}
                    capitalizeFirstLetter={capitalizeFirstLetter}
                />
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", margin: '20px'}}>
                    <FcPrint size={80} className={styles.printIcon} onClick={() => { window.print(); navigate("/new-file");}} />
                </div>

            </div>
        </div>
    )
}

export default PrintFile
