import { FC } from 'react';

type Props = {
  name: string,
  setHasError: (flag: boolean) => void,
};

export const HourDropdown: FC<Props>  = ({ name, setHasError }) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <select name={name} onChange={() => setHasError(false)}>
      <option value="">Select time</option>
      {hours.map(hour => (
        <option 
          key={hour}
          value={hour}
        >
            {hour.toString().padStart(2, '0')}:00
        </option>
      ))}
    </select>
  );
}