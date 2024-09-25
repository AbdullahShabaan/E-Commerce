import styles from "./style.module.css";
const { titleSection, titleIcon } = styles;
const TitleSection = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <div className="pt-5 d-flex align-items-center gap-3">
        <div className={`${titleIcon}`}></div>
        <h4 className={`${titleSection} m-0`}>{children}</h4>
      </div>
      <h3 className="pt-3">{title}</h3>
    </>
  );
};

export default TitleSection;
