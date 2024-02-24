import React, { FC, useRef } from "react";
import "./Form.scss";
import { HourDropdown } from "../HourDropdown";

type Props = {
  onCalculate: (formState: Record<string, string>) => void,
  resultRef: React.RefObject<HTMLFormElement>,
};

export const Form: FC<Props> = ({ 
  onCalculate, resultRef 
}) => {
  const formRef = useRef(null);
  const formState: Record<string, string> = {};
  const executeScroll = () => {
    if (!resultRef.current) return;

    resultRef.current.scrollIntoView({behavior: 'smooth'});
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    for (const [key, value] of formData.entries()) {
      formState[key] = value as string;
    }

    onCalculate(formState);
    executeScroll();
  };

  return (
    <section className="form">
      <div className="form__container">
        <h1 className="form__title">
          Calculate your EV charging infrastructure costs
        </h1>
        <p className="form__description">
          Enter details about your EV charging infrastructure and find out the
          cost of charging with or without our solution.
        </p>
        <form
          className="form__content"
          action=""
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="field">
            <label className="label">Battery size(kWh)</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="batterySize"
                placeholder="Battery size"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Daily consumption(percentage)</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="dailyConsumption"
                min={0}
                max={100}
                step={1}
                placeholder="Daily consumption"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Charging speed(kW)</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="chargingSpeed"
                min={0}
                placeholder="Charging speed"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Amount of assets</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="amoutOfAssets"
                min={0}
                step={1}
                placeholder="Amount of assets"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Availability start</label>
            <div className="select">
              <HourDropdown name="startTime" />
            </div>
          </div>

          <div className="field">
            <label className="label">Availability end</label>
            <div className="select">
              <HourDropdown name="endTime" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  name="weekendIncluded"
                  type="checkbox"
                  style={{ marginRight: "8px" }}
                />
                Including weekend
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Calculate
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light" type="reset">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
