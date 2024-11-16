import styles from "./video.module.css"
import ReactPlayer from "react-player"
import { motion } from "framer-motion"
import { useNavigate, useLoaderData } from "react-router-dom"

export default function Video() {
  const navigate = useNavigate()
  const videoData = useLoaderData()

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 1,
        duration: 0.75,
      }}
      className={styles.videoContainer}
    >
      <div className={styles.signIn}>
        {videoData?.url ? (
          <>
            <ReactPlayer
              url={videoData.url}
              controls={true}
              playing={true}
              height="85vh"
              width="100%"
            />

            <div className={styles.quizNavigation}>
              <div
                onClick={() => navigate(`/quiz?video=${videoData.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://w7.pngwing.com/pngs/394/1024/png-transparent-arrow-arrows-forward-navigation-next-pointer-right-arrow-set-icon-thumbnail.png"
                  alt="Next Quiz"
                  width={50}
                />
              </div>
            </div>
          </>
        ) : (
          <div>Sorry, no video found for that grade.</div>
        )}
      </div>
    </motion.div>
  )
}
