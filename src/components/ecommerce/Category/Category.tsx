import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { TCategories } from "src/types/TCategories";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, prefix, img }: TCategories) => {
  return (
    <div className={category}>
      <Link
        to={`/categories/products/${prefix}`}
        className="text-decoration-none text-black"
      >
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
