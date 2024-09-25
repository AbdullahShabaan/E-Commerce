import { memo } from "react";

const Heading = memo(({ title }: { title: string }) => {
  return (
    <h2 className="my-4" style={{ fontSize: "28px" }}>
      {title}
    </h2>
  );
});

export default Heading;
