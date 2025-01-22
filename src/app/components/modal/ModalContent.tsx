type IProps = {
  title: string;
  content: string | string[];
};

export default function ModalContent(props: IProps) {
  const formatList = (data: string[]) => {
    if (data.length === 1) {
      return data[0];
    } else if (data.length <= 2) {
      return data.join(", ");
    } else {
      return `${data[0]}, ${data[1]} 외 ${data.length - 2}명`;
    }
  };

  if (typeof props.content === "object" && props.content.length === 0) {
    return;
  }

  return (
    <div className="flex gap-7">
      <span className="w-10 text-sm font-normal">{props.title}</span>
      <span className="line-clamp-1 text-sm font-semibold">
        {typeof props.content === "string"
          ? props.content
          : formatList(props.content)}
      </span>
    </div>
  );
}
