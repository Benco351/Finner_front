export const Card = (props: any) => {
  const { minHeight, maxHeight, backgroundColor } = props;
  return (
    <div
      className="card-article rounded"
      style={{
        minHeight,
        maxHeight,
        backgroundColor,
      }}
    >
      {props.children}
    </div>
  );
};
