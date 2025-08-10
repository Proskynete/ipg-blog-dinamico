interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-light text-gray-900">{title}</h3>
      <div className="divider divider-neutral my-0" />
    </div>
  );
};
