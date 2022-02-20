import styles from './index.css';
import logo from '../assets/logo.png';
function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.logoBox}>
          <img className={styles.logoImage} src={logo} />
        </div>
      {props.children}
    </div>
  );
}

export default BasicLayout;
