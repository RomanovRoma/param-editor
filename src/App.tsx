import React, { useState } from 'react';
import styles from './App.module.css';
import stylesParamEditor from './ParamEditor.module.css'

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
  onModelChange: (updatedModel: Model) => void;
}

const ParamEditor: React.FC<Props> = ({ params, model, onModelChange }) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value };
      }
      return paramValue;
    });
    setParamValues(updatedParamValues);
    onModelChange({ paramValues: updatedParamValues });
  };

  return (
      <div className={stylesParamEditor.paramEditor}>
        {params.map((param) => (
            <div className={stylesParamEditor.paramRow} key={param.id}>
              <label htmlFor={param.name} className={stylesParamEditor.label}>{param.name}</label>
              <input
                  className={stylesParamEditor.input}
                  type="text"
                  id={param.name}
                  value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
                  onChange={(e) => handleParamChange(param.id, e.target.value)}
              />
            </div>
        ))}
      </div>
  );
};

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
  };

  const handleModelChange = (updatedModel: Model) => {
    console.log('Updated Model:', updatedModel);
  };

  return (
      <div className={styles.app}>
        <h1 className={styles.appHeader}>Param Editor</h1>
        <ParamEditor params={params} model={model} onModelChange={handleModelChange} />
      </div>
  );
};

export default App;
