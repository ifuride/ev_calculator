import { useState } from 'react'
import { Header } from './components/Header';
import { Form } from './components/Form';
import { Result } from './components/Result';
import { Footer } from './components/Footer';
import { getValues } from './utils/fetchClient';

export const App = () => {
  const [params, setParams] = useState('');
  const [smartValue, setSmartValue] = useState(0);
  const [feverValue, setFeverValue] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  const handleCalculateValues = async () => {
    // setIsLoading(true);

    try {
      const valuesFromServer = await getValues(params)
      
      setSmartValue(valuesFromServer.smart_charging);
      setFeverValue(valuesFromServer.fever)
    } catch(error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="calculator">
      <Header />
      <main className="calculator__content">
        <Form 
          setParams={setParams}
          onCalculate={handleCalculateValues}
        />
        <Result 
          smartValue={smartValue}
          feverValue={feverValue}
        />
      </main>
      <Footer />
    </div>
  )
}
