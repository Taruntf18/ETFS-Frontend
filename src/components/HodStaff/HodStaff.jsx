import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HodStaff.module.css"; // Import the external CSS file
import { useUser } from "../UserContext/UserContext";
import Navbar from "../Navbar/Navbar";

const HodStaff = () => {
  const { user } = useUser();
  const [employeeNames, setEmployeeNames] = useState([]);
  const [typeOfEmp, setTypeOfEmp] = useState("");
  console.log(typeOfEmp);

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getEmployeeByDivision/${user.userDivision.divname}/0`
        );
        setEmployeeNames(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchEmployeeNames();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h1 className={styles.title}>DIVISIONAL STAFF</h1>

          <div>
            <div className={styles.employee_list}>
              <h3 className={styles.subtitle}>List of Employees</h3>
              <div className={styles.listbox}>
                <div className={styles.listbox_item}>Employee</div>
              </div>
            </div>

            <select
              name="employeeType"
              value={typeOfEmp} // Bind state to select value
              onChange={(e) => setTypeOfEmp(e.target.value)} // Update state on change
              className={styles.document_type}
            >
              <option value="">Select Type of Employee</option>
              <option value="Regular">Regular</option>
              <option value="Contract">Contract</option>
            </select>
            <div className={styles.options_container}>
              <div className={styles.add_incharge}>
                <div>
                  <div className={styles.select_container}>
                    <h4 className={styles.subtitle}>EMPLOYEES</h4>
                    <select id="employees" className={styles.select}>
                      {employeeNames.map((item, key) => (
                        <option key={key} value={item.empname}>
                          {item.empname}
                        </option>
                      ))}
                    </select>
                  </div>
                  {typeOfEmp == "Contract" && (
                    <div>
                      <h4 className={styles.subtitle}>Others</h4>
                      <input className={styles.other_contract_emp} type="text" />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.remove_incharge}>
                <h4 className={styles.subtitle}>REMOVE EXISTING</h4>

                <div className={styles.listbox}>
                  {Array.from({ length: 8 }, (_, i) => (
                    <div className={styles.listbox_item} key={i}>
                      <input type="checkbox" className={styles.checkbox} />{" "}
                      Employee {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.submit_container}>
              <button className={styles.submit_button}>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HodStaff;
