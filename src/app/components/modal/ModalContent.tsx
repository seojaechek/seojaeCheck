type IProps = {
  title: string;
  content: string | string[];
};

export default function ModalContent(props: IProps) {
  const formatList = (data: string[]) => {
    return data.reduce(
      (init: string, author: string, i: number) =>
        i !== 0 ? init + `, ${author}` : init + author,
      "",
    );
  };

  if (typeof props.content === "object" && props.content.length === 0) {
    return;
  }

  return (
    <div className="flex gap-7">
      <span className="text-sm font-normal">{props.title}</span>
      <span className="line-clamp-1 text-sm font-semibold">
        {typeof props.content === "string"
          ? props.content
          : formatList(props.content)}
      </span>
    </div>
  );
}
