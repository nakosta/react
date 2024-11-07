import { Typography, Image } from "antd";
import styles from "../index.module.css";

const { Text, Title, Paragraph } = Typography;

const Optimization = () => {
  return (
    <>
      <Image
        className={styles.iconTop}
        src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4df.svg"
      />
      <Title>React.memo, useMemo, UseCallback</Title>
    </>
  );
};

export default Optimization;
