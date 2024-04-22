interface InfoProps {
  src: string;
  title: string;
  value: string;
}

export function Info({ src, title, value }: InfoProps) {
  return (
    <div className="flex justify-between items-center w-full bg-gray-200 rounded-md px-2">
      <p className="flex items-center gap-1 text-xs text-center uppercase text-gray-800 p-1">
        <img src={src} alt="icon" height={16} width={16} />
        {title}
      </p>
      <p className="text-sm text-right text-gray-800">{value}</p>
    </div>
  );
}
