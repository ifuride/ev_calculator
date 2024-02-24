import { FC } from "react";

type Props = {
  name: string,
};

export const HourDropdown: FC<Props>  = ({ name }) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <select name={name}>
      <option value="">Select time</option>
      {hours.map(hour => (
        <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00</option>
      ))}
    </select>
  );
}