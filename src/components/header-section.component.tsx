interface Action {
  label: string | React.ReactNode;
  className?: string;
  onClick: () => void;
}

interface HeaderSectionProps {
  title: string;
  actions?: Action[];
}

export const HeaderSection = ({ title, actions }: HeaderSectionProps) => {
  return (
    <div className="mb-6">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-2xl font-light text-gray-900">{title}</h3>
        {actions && (
          <div className="flex items-centermt-4">
            {actions.map((action, index) => (
              <button
                key={index}
                className={action.className}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="divider divider-neutral my-0" />
    </div>
  );
};
