"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import ConfettiCelebration from "@/assets/celebration/Celebration-confetti.gif";
import styles from "./celebration.module.css";

const Celebration: React.FC = () => {
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const handleCancel = () => setShowMessage(false);

  return (
    <>
      <Modal
        title="Congratulations on the Engagement Eggman!!"
        open={showMessage}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.eggCon}>
          <img src={ConfettiCelebration.src} alt="Egg Wedding" />
        </div>
        <Button
          onClick={() => setShowMessage(false)}> OK </Button>
      </Modal>
    </>
  );
};

export default Celebration;
