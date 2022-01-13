import React from "react";
import Lottie from "react-lottie";
import rocket from "../../assets/rocket.json";

const Rocket = (props: any) => {
  const { styles } = props;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rocket,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      style={{
        maxWidth: styles.maxWidth,
        minWidth: styles.minWidth,
        position: styles.position,
        top: styles.top,
      }}
      height={styles.height}
    />
  );
};

export default React.memo(Rocket);
