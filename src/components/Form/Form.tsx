import React, { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import './Form.scss';
import { HourDropdown } from '../HourDropdown';

type Props = {
  onCalculate: (formState: Record<string, string>) => void,
  resultRef: React.RefObject<HTMLFormElement>,
};

export const Form: FC<Props> = ({ 
  onCalculate, resultRef 
}) => {
  const [hasBatterySizeError, setHasBatterySizeError] = useState(false);
  const [hasDailyConsumptionError, setHasDailyConsumptionError] = useState(false);
  const [hasChargingSpeedError, setHasChargingSpeedError] = useState(false);
  const [hasChargesAmountError, setHasChargesAmountError] = useState(false);
  const [hasStartTimeError, setHasStartTimeError] = useState(false);
  const [hasEndTimeError, setHasEndTimeError] = useState(false);

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

    const {
      batterySize,
      dailyConsumption,
      chargingSpeed,
      amoutOfAssets,
      startTime,
      endTime,
    } = formState;
    
    setHasBatterySizeError(!batterySize);
    setHasDailyConsumptionError(!dailyConsumption);
    setHasChargingSpeedError(!chargingSpeed);
    setHasChargesAmountError(!amoutOfAssets);
    setHasStartTimeError(!startTime);
    setHasEndTimeError(!endTime);

    if (!batterySize || !dailyConsumption || !chargingSpeed || !amoutOfAssets || !startTime || !endTime) {
      return;
    }

    onCalculate(formState);
    executeScroll();
  };

  const handleReset = () => {
    setHasBatterySizeError(false);
    setHasDailyConsumptionError(false);
    setHasChargingSpeedError(false);
    setHasChargesAmountError(false);
    setHasStartTimeError(false);
    setHasEndTimeError(false);
  }

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
          onReset={handleReset}
          ref={formRef}
        >
          <div className="field">
            <label className="label" htmlFor="battery-size">Battery size (kWh)</label>
            <div className="control">
              <input
                className={classNames('input', {
                  'is-danger': hasBatterySizeError,
                })}
                id="battery-size"
                type="number"
                name="batterySize"
                placeholder="Battery size"
                onChange={() => setHasBatterySizeError(false)}
              />
            </div>
            {hasBatterySizeError && (
              <p className="help is-danger">Battery size is required</p>
            )}
          </div>

          <div className="field">
            <label 
              className="label" 
              htmlFor="daily-consumption"
            >
              Daily consumption (percentage)
            </label>
            <div className="control">
              <input
                className={classNames('input', {
                  'is-danger': hasDailyConsumptionError,
                })}
                id="daily-consumption"
                type="number"
                name="dailyConsumption"
                min={0}
                max={100}
                step={1}
                placeholder="Daily consumption"
                onChange={() => setHasDailyConsumptionError(false)}
              />
            </div>
            {hasDailyConsumptionError && (
              <p className="help is-danger">Daily consumption is required</p>
            )}
          </div>

          <div className="field">
            <label 
              className="label"
              htmlFor="charging-speed"
            >
              Charging speed (kW)
            </label>
            <div className="control">
              <input
                id="charging-speed"
                className={classNames('input', {
                  'is-danger': hasChargingSpeedError,
                })}
                type="number"
                name="chargingSpeed"
                min={0}
                placeholder="Charging speed"
                onChange={() => setHasChargingSpeedError(false)}
              />
            </div>
            {hasChargingSpeedError && (
              <p className="help is-danger">Charging speed is required</p>
            )}
          </div>

          <div className="field">
            <label 
              className="label"
              htmlFor="amount-of-chargers"
            >
              Amount of chargers
            </label>
            <div className="control">
              <input
                className={classNames('input', {
                  'is-danger': hasChargesAmountError,
                })}
                id="amount-of-chargers"
                type="number"
                name="amoutOfAssets"
                min={0}
                step={1}
                placeholder="Amount of chargers"
                onChange={() => setHasChargesAmountError(false)}
              />
            </div>
            {hasChargesAmountError && (
              <p className="help is-danger">Amount of chargers is required</p>
            )}
          </div>

          <div className="field">
            <label className="label">Availability start</label>
            <div className={classNames('select', {
            'is-danger': hasStartTimeError,
          })}>
              <HourDropdown 
                name="startTime" 
                setHasError={setHasStartTimeError}
              />
            </div>
            {hasStartTimeError && (
              <p className="help is-danger">Availability start is required</p>
            )}
          </div>

          <div className="field">
            <label className="label">Availability end</label>
            <div className={classNames('select', {
            'is-danger': hasEndTimeError,
          })}>
              <HourDropdown 
                name="endTime" 
                setHasError={setHasEndTimeError}
              />
            </div>
            {hasEndTimeError && (
              <p className="help is-danger">Availability end is required</p>
            )}
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
