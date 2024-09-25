import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { basketContainer, basketQuantity, pumpQuantity, basketName } = styles;
const HeaderCounter = ({
  count,
  title,
  navigateTo,
  icon,
}: {
  count: number;
  title: string;
  navigateTo: string;
  icon: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${basketQuantity} ${isAnimate ? pumpQuantity : ""}`;

  useEffect(() => {
    if (count == 0) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(debounce);
  }, [count]);
  return (
    <div
      className="basketContainer d-flex align-items-center gap-1"
      onClick={() => navigate(`/${navigateTo}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={`${basketContainer} `}>
        {icon}
        {!(count == 0) && <div className={quantityStyle}>{count}</div>}
      </div>
      <h6 className={`m-0 ${basketName}`} style={{ fontSize: "14px" }}>
        {title}
      </h6>
    </div>
  );
};

export default HeaderCounter;
