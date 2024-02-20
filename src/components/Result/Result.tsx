import { FC } from 'react';
import './Result.scss';
import { Loader } from '../Loader';

type Props = {
  smartValue: number,
  feverValue: number,
  isLoading: boolean,
};

export const Result: FC<Props> = ({ smartValue, feverValue, isLoading }) => {
  return (
    <section className="result">
      <div className="result__container">
        <h1 className="result__title">Cost comparison</h1>
        <p className="result__description">
          Here you can compare the cost of charging with and without our solution.
        </p>
        <div className="card result__view">
          {isLoading ? <Loader /> : (
            <div className="result__content">
              <div className="result__section">
                <h3 className="result__name">Smart charging</h3>
                <h1 className="result__value">{smartValue} &euro;</h1>
              </div>
              <div className="result__section">
                <h3 className="result__name">Fever charging</h3>
                <h1 className="result__value">{feverValue} &euro;</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}