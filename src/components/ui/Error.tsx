import Image from "next/image";

type ErrorProps = {
  text: string;
};

export function Error({ text }: ErrorProps) {
  return (
    <div className="flex gap-3 px-2">
      <Image
        src="/errorCircle.svg"
        width="14"
        height="14"
        alt="error circle"
      ></Image>
      <p className="text-error">{text}</p>
    </div>
  );
}
