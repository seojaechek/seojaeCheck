import Image from "next/image";

interface IconButtonProps {
  key?: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  disabled?: boolean;
  buttonClassName?: string;
  imgClassName?: string;

  onClick: (e: React.MouseEvent<HTMLButtonElement>, someParam?: string) => void;
}

export default function IconButton({
  key,
  src,
  alt,
  width,
  height,
  disabled,
  buttonClassName,
  imgClassName,
  onClick,
}: IconButtonProps) {
  return (
    <button
      key={key}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
      />
    </button>
  );
}
