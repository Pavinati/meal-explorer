type TagProps = {
  value: string;
};

export function Tag({ value }: TagProps) {
  return (
    <div className="rounded-md bg-(--color-accent) px-2 py-1 text-sm font-semibold text-white">
      {value}
    </div>
  );
}
