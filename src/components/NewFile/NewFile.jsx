import React from "react";
import styles from "./newfile.module.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";

const NewFile = () => {
  // const [whome, setWhome] = useState();
  // const [where, setWhere] = useState();
  // const [workflow, setWorkflow] = useState();

  // function setwhomeValue(changeEvent) {
  //   setWhome({ state: changeEvent.target.value });
  //   console.log(changeEvent.target.value + "whome");
  // }
  // function setwhereValue(changeEvent) {
  //   setWhere({ state: changeEvent.target.value });
  //   console.log(changeEvent.target.value + "where");
  // }
  // function setworkflowValue(changeEvent) {
  //   setWorkflow({ state: changeEvent.target.value });
  //   console.log(changeEvent.target.value + "workflow");
  // }

  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.form_container}>
          <h2>Create New File</h2>
          <form>
            <div className={styles.form_group}>
              <label htmlFor="document-type">Type of Document</label>
              <select id={styles.document_type}>
                <option>Select Document Type</option>
                <option>Agenda for Meeting</option>
                <option>Annual Report</option>
                <option>Annual Subscription</option>
                <option>Approval Form for PC/Printer</option>
                <option>Attendence Sheet</option>
                <option>Audit Requisition/Audit Enquiry</option>
                <option>Awards</option>
                <option>Bank Payment Voucher</option>
                <option>Bill/Invoice</option>
                <option>Canteen Bill</option>
                <option>Cash Receipts</option>
                <option>Catalog/Brochure</option>
                <option>Cheque Slip</option>
                <option>Circular</option>
                <option>Closed Cover</option>
                <option>Closure Report</option>
                <option>College Certificate</option>
                <option>Copy Right</option>
                <option>Depulation File</option>
                <option value="diploma-trainee">Diploma Trainee</option>
                <option value="draft">Draft</option>
                <option value="email-internet-request-form">
                  Email/Internet Request Form
                </option>
                <option value="email">Email</option>
                <option value="exhibition">Exhibition</option>
                <option value="expenditure-statement">
                  Expenditure Statement
                </option>
                <option value="fax-messages">Fax Messages</option>
                <option value="feedback">Feedback</option>
                <option value="fee-distribution">Fee Distribution</option>
                <option value="file">File</option>
                <option value="form-16a-tds-certificate">
                  Form 16A/TDS Certificate
                </option>
                <option value="fund-transfer-release">
                  Fund Transfer/Release
                </option>
                <option value="fvc">FVC</option>
                <option value="graduate-trainee">Graduate Trainee</option>
                <option value="guest-house-request-accomodation">
                  Guest House Request Accommodation
                </option>
                <option value="guest-house-request-refreshment">
                  Guest House Request Refreshment
                </option>
                <option value="hiring-of-consultant">
                  Hiring of Consultant
                </option>
                <option value="hotel-bill">Hotel Bill</option>
                <option value="id-extension">ID Extension</option>
                <option value="iom">IOM</option>
                <option value="iso-review-of-projects">
                  ISO Review of Projects
                </option>
                <option value="induction-of-trainees">
                  Induction of Trainees
                </option>
                <option value="internship-training">Internship/Training</option>
                <option value="inspection-report">Inspection Report</option>
                <option value="invitation">Invitation</option>
                <option value="leave-letter">Leave Letter</option>
                <option value="lecture-notice">Lecture Notice</option>
                <option value="letter">Letter</option>
                <option value="meeting-notice">Meeting Notice</option>
                <option value="minutes">Minutes</option>
                <option value="mou-nda-agreement">MOU/NDA/Agreement</option>
                <option value="multimedia-request">Multimedia Request</option>
                <option value="naltech-bills">NALTech Bills</option>
                <option value="nomination-for-awards">
                  Nomination for Awards
                </option>
                <option value="note">Note</option>
                <option value="notification">Notification</option>
                <option value="ob-list">OB List</option>
                <option value="others">Others</option>
                <option value="paper-presentation">Paper Presentation</option>
                <option value="paper-publication">Paper Publication</option>
                <option value="parliament-loksabha-question">
                  Parliament/Loksabha Question
                </option>
                <option value="patent-filing">Patent Filing</option>
                <option value="proceedings">Proceedings</option>
                <option value="progress-report">Progress Report</option>
                <option value="project-assistant">Project Assistant</option>
                <option value="project-extension">Project Extension</option>
                <option value="project-proposal">Project Proposal</option>
                <option value="project-report">Project Report</option>
                <option value="project-sanction">Project Sanction</option>
                <option value="project-work-request">
                  Project Work Request
                </option>
                <option value="purchase-file">Purchase File</option>
                <option value="purchase-indent">Purchase Indent</option>
                <option value="purchase-of-pc">Purchase of PC</option>
                <option value="purchase-order">Purchase Order</option>
                <option value="quarterly-review">Quarterly Review</option>
                <option value="receipt">Receipt</option>
                <option value="reminder">Reminder</option>
                <option value="request-for-invoice">Request for Invoice</option>
                <option value="resume-for-job">Resume for Job</option>
                <option value="revolving-fund">Revolving Fund</option>
                <option value="RFQ">RFQ</option>
                <option value="RTI">RTI</option>
                <option value="Samudaya Bhavan Request">
                  Samudaya Bhavan Request
                </option>
                <option value="School Admission">School Admission</option>
                <option value="Seminar/Workshop/Conference Announcement">
                  Seminar/Workshop/Conference Announcement
                </option>
                <option value="Seminar/Workshop/Conference Proposal">
                  Seminar/Workshop/Conference Proposal
                </option>
                <option value="Souvenir/Abstract">Souvenir/Abstract</option>
                <option value="Status of the Project">
                  Status of the Project
                </option>
                <option value="Stores Demand Note">Stores Demand Note</option>
                <option value="Supply Order">Supply Order</option>
                <option value="TA/DA Adjustment Claim">
                  TA/DA Adjustment Claim
                </option>
                <option value="Taxi Bills">Taxi Bills</option>
                <option value="Technology Transfer">Technology Transfer</option>
                <option value="Testing Charges">Testing Charges</option>
                <option value="Telephone/STD Prints">
                  Telephone/STD Prints
                </option>
                <option value="Test Completion Report">
                  Test Completion Report
                </option>
                <option value="Tour Program">Tour Program</option>
                <option value="TPC/NC Meeting">TPC/NC Meeting</option>
                <option value="Utilization Certificate">
                  Utilization Certificate
                </option>
                <option value="Visits">Visits</option>
                <option value="">Work order</option>
                <option value="">Work Package</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label>Priority</label>
              <div className={styles.radio_group}>
                <label>
                  <input type="radio" name="priority" value="normal" /> Normal
                </label>
                <label>
                  <input type="radio" name="priority" value="immediate" />{" "}
                  Immediate
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="">Subject</label>
              <input type="text" className={styles.subject} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="description">Description</label>
              <textarea id={styles.description}></textarea>
            </div>
            <div className={styles.form_group}>
              <label>Through whom are we sending it?</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="self"
                    checked={sender === "self"}
                    onChange={handleSenderChange}
                  />
                  Self
                </label>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="others"
                    checked={sender === "others"}
                    onChange={handleSenderChange}
                  />
                  Others
                </label>
              </div>
              {sender === "others" && (
                <input
                  type="text"
                  placeholder="Enter the Name"
                  className={styles.subject}
                />
              )}
            </div>

            <div className={styles.form_group_whome}>
              <label>Sending To :</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="receiver"
                    value="employee_of_my_division"
                    checked={receiver === "employee_of_my_division"}
                    onChange={handleReceiverChange}
                  />
                  Employees of My Division
                </label>
                <label>
                  <input
                    type="radio"
                    name="receiver"
                    value="divisional_office"
                    checked={receiver === "divisional_office"}
                    onChange={handleReceiverChange}
                  />
                  Divisional Office
                </label>
              </div>
              {receiver === "divisional_office" && (
                <div className={styles.form_group}>
                  <select id={styles.document_type}>
                    <option>Select Division</option>
                    <option>ICTD</option>
                    <option>ADMIN</option>
                    <option>S&P</option>
                  </select>
                </div>
              )}
              {receiver === "employee_of_my_division" && (
                <div className={styles.form_group}>
                
                <select id={styles.document_type}>
                <option>Select Employee</option>
                    <option>Pragathi</option>
                    <option>Harsha</option>
                    <option>Vivek</option>
                    <option>Tarun</option>
                </select>
              </div>
              )}
            </div>
            <div className={styles.form_group}>
              <label>Do you want to mention Workflow</label>
              <div className={styles.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value={true}
                    // onChange={setworkflowValue}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="workflow"
                    value={false}
                    // onChange={setworkflowValue}
                  />
                  No
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <button type="submit" className={styles.submit_btn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewFile;