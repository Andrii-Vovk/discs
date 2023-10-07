const propMapping: Record<string, string> = {
  country: "Country",
  released: "Date Of Release",
  estimated_weight: "Estimated Weight",
  vinyl_info: "Vinyl Info",
  genres: "Genres",
  styles: "Styles",
  lowest_price: "Lowest Price",
};

interface Props {
  params: Record<string, any>;
}

const MappedProps: React.FC<Props> = ({ params }) => {
  const formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

  const mappedProps = Object.entries(params).map(([key, value]) => {
    if (propMapping[key]) {
      return (
        <div className="flex justify-between items-start" key={key}>
          <span className="subtitle">{propMapping[key]}</span>
          <span className="subtitle !font-medium flex flex-col items-end justify-start gap-2">
            {Array.isArray(value) ? value.map((v: string) => <div className='subtitle !font-medium' key={v}>{v}</div>) : value}
          </span>
        </div>
      );
    }
  });
  return (
    <div className="relative flex flex-col gap-4">
      <div className="h4">Details:</div>
      {mappedProps}
    </div>
  );
};

export default MappedProps;
