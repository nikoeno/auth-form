const ICON_SIZE = 24;

type Props = {
  className?: string;
};

export const CheckIcon = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={ICON_SIZE}
    height={ICON_SIZE}
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M10 13.94l6.47-6.47a.75.75 0 0 1 1.06 1.06l-7 7a.748.748 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06L10 13.94z" />
  </svg>
);
