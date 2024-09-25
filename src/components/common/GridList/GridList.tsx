type propsTypes<T> = {
  data: T[];
  message: string;
  iteration: (item: T) => React.ReactNode;
};
type THasId = {
  id?: number;
};
const GridList = <T extends THasId>({
  data,
  iteration,
  message,
}: propsTypes<T>) => {
  const categoriesList =
    data.length > 0
      ? data.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6">
            {iteration(item)}
          </div>
        ))
      : `${message}`;

  return <div className="row gy-4">{categoriesList}</div>;
};

export default GridList;
