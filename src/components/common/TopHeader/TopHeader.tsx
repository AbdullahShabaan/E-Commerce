import styles from "./styles.module.css";
const { headerContainer } = styles;

const TopHeader = () => {
  return (
    <div className={headerContainer}>
      <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
      <span>ShopNow</span>
    </div>
  );
};

export default TopHeader;
