const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="my-4" style={{ fontSize: "28px" }}>
      {children}
    </h2>
  );
};

export default Heading;
