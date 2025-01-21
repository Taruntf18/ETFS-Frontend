import Navbar from '../Navbar/Navbar';
import styles from './received_file.module.css'

const ReceivedFile = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.body}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Type of Document</th>
            <th className={styles.th}>Document Data</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Priority</th>
            <th className={styles.th}>To whom I'm sending</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.td}>Invoice</td>
            <td className={styles.td}>2023-10-01</td>
            <td className={styles.td}>Invoice for October services</td>
            <td className={`priority_immediate ${styles.td}`}>Immediate</td>
            <td className={styles.td}>John Doe</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>Report</td>
            <td className={styles.td}>2023-09-30</td>
            <td className={styles.td}>Monthly performance report</td>
            <td className={`priority_normal ${styles.td}`}>Normal</td>
            <td className={styles.td}>Jane Smith</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>Memo</td>
            <td className={styles.td}>2023-09-29</td>
            <td className={styles.td}>Internal memo regarding policy changes</td>
            <td className={`priority_normal ${styles.td}`}>Normal</td>
            <td className={styles.td}>All Staff</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ReceivedFile;
