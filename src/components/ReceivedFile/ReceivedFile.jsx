import Navbar from "../Navbar/Navbar";
import styles from "./received_file.module.css";

const ReceivedFile = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Type of Document</th>
              <th className={styles.th}>Priority</th>
              <th className={styles.th}>Subject</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Through whom I'm sending</th>
              <th className={styles.th}>Sending To</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <td className={styles.td}>Invoice</td>
              <td className={`${styles.priority_immediate} ${styles.td}`}>
                Immediate
              </td>
              <td className={styles.td}>Invoice for October services</td>
              <td className={styles.td}>John Doe</td>
              <td className={styles.td}>John Doe</td>
              <td className={styles.td}>John Doe</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Report</td>
              <td className={`${styles.priority_normal} ${styles.td}`}>
                Normal
              </td>
              <td className={styles.td}>Monthly performance report</td>
              <td className={styles.td}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consectetur doloremque quidem, culpa iusto natus suscipit vitae?
                Repudiandae quo ipsa nihil? Sint aperiam veritatis odio facere
                omnis ratione aliquid! Perspiciatis laudantium nostrum quia
                velit aperiam! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Blanditiis ipsa quo corporis. Deleniti
                nesciunt cumque, aliquid explicabo doloremque sunt neque magni
                vero veritatis, eveniet accusamus cupiditate perferendis.
                Excepturi qui vel totam doloremque? Corrupti sapiente, numquam
                accusamus excepturi magni unde, quasi animi facilis non ullam
                voluptate modi nostrum iusto ipsa vel!
              </td>
              <td className={styles.td}>John Doe</td>
              <td className={styles.td}>John Doe</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Memo</td>
              <td className={`${styles.priority_normal} ${styles.td}`}>
                Normal
              </td>
              <td className={styles.td}>
                Internal memo regarding policy changes
              </td>
              <td className={styles.td}>All Staff</td>
              <td className={styles.td}>John Doe</td>
              <td className={styles.td}>John Doe</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReceivedFile;