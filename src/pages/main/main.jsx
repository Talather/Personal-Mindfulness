import SignInFormComponent from "../../components/sign-in/form"
import myImage from "../../assets/logo-profile.png"
import styles from "./main.module.css"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"

// import {getUser} from "../../firebase"
// ...

export default function Main() {
  return (
    <div className={styles.signIn}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <img height={100} width={100} src={myImage} alt="My Image" />
        </div>

        <div className={styles.signInWrapper}>
          <div className={styles.signInLeft}>
            <h1>Enter The Following Details</h1>
            <div className={styles.signInFormWrapper}>
              <SignInFormComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
