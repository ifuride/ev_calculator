import React, { FC, useRef } from "react";
import "./Form.scss";

type Props = {
  onCalculate: (formState: Record<string, string>) => void;
};

export const Form: FC<Props> = ({ onCalculate }) => {
  const formRef = useRef(null);
  const formState: Record<string, string> = {};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    for (const [key, value] of formData.entries()) {
      formState[key] = value as string;
    }
    onCalculate(formState);
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
              <select name="startTime">
                <option value="">Select time</option>
                <option value="0">00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Availability end</label>
            <div className="select">
              <select name="endTime">
                <option value="">Select time</option>
                <option value="0">00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
              </select>
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
