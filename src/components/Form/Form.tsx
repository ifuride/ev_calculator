import React, { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import './Form.scss';
import { HourDropdown } from '../HourDropdown';
import * as Yup from 'yup';

type Props = {
  onCalculate: (formState: Record<string, string>) => void,
  resultRef: React.RefObject<HTMLFormElement>,
};

export const Form: FC<Props> = ({ 
  onCalculate, resultRef 
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const executeScroll = () => {
    if (!resultRef.current) return;

    resultRef.current.scrollIntoView({behavior: 'smooth'});
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;
  
    const formData = new FormData(formRef.current);
    const formState: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      formState[key] = value as string;
    }

    try {
      const schema = Yup.object().shape({
        batterySize: Yup.number()
          .transform((val, orig) => orig == '' ? undefined : val)
          .required('Battery size is required')
          .positive('Battery size must be a positive number')
          .integer('Battery size must be an integer')
          .typeError('Battery size must be a number'),
        dailyConsumption: Yup.number()
          .transform((val, orig) => orig == '' ? undefined : val)
          .min(0, 'Daily consumption must be greater than or equal to 0')
          .max(100, 'Daily consumption must be less than or equal to 100')
          .integer('Daily consumption must be an integer')
          .required('Daily consumtion is required')
          .typeError('Daily consumption must be an integer value beetween 0-100'),
        chargingSpeed: Yup.number()
          .transform((val, orig) => orig == '' ? undefined : val)
          .required('Charging speed is required')
          .positive('Charging speed must be a positive number')
          .typeError('Charging speed must be a number'),
        amoutOfAssets: Yup.number()
          .transform((val, orig) => orig == '' ? undefined : val)
          .required('Amount of chargers is required')
          .min(1, 'Amount of chargers must be greater than 0')
          .integer('Amount of chargers must be an integer value')
          .typeError('Amount of chargers must be an integer value'),
        startTime: Yup.string()
          .required('Availability start is required'),
        endTime: Yup.string()
          .required('Availability end is required'),
      });

      await schema.validate(formState, {abortEarly: false});
      console.log('form submitted');
      onCalculate(formState);
      executeScroll();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};

        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
  
        setErrors(newErrors);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setErrors({ ...errors, [name]: '' });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;

    setErrors({ ...errors, [name]: '' });
  };

  const handleReset = () => {
    setErrors({});
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
                  'is-danger': errors.batterySize,
                })}
                id="battery-size"
                name="batterySize"
                placeholder="Battery size"
                onChange={handleInputChange}
              />
            </div>
            {errors.batterySize && (
              <p className="help is-danger">{errors.batterySize}</p>
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
                  'is-danger': errors.dailyConsumption,
                })}
                id="daily-consumption"
                name="dailyConsumption"
                placeholder="Daily consumption"
                onChange={handleInputChange}
              />
            </div>
            {errors.dailyConsumption && (
              <p className="help is-danger">{errors.dailyConsumption}</p>
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
                  'is-danger': errors.chargingSpeed,
                })}
                name="chargingSpeed"
                placeholder="Charging speed"
                onChange={handleInputChange}
              />
            </div>
            {errors.chargingSpeed && (
              <p className="help is-danger">{errors.chargingSpeed}</p>
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
                  'is-danger': errors.amoutOfAssets,
                })}
                id="amount-of-chargers"
                name="amoutOfAssets"
                placeholder="Amount of chargers"
                onChange={handleInputChange}
              />
            </div>
            {errors.amoutOfAssets && (
              <p className="help is-danger">{errors.amoutOfAssets}</p>
            )}
          </div>

          <div className="field">
            <label className="label">Availability start</label>
            <div className={classNames('select', {
            'is-danger': errors.startTime,
          })}>
              <HourDropdown 
                name="startTime" 
                setHasError={handleSelectChange}
              />
            </div>
            {errors.startTime && (
              <p className="help is-danger">Availability start is required</p>
            )}
          </div>

          <div className="field">
            <label className="label">Availability end</label>
            <div className={classNames('select', {
            'is-danger': errors.endTime,
          })}>
              <HourDropdown 
                name="endTime" 
                setHasError={handleSelectChange}
              />
            </div>
            {errors.endTime && (
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
