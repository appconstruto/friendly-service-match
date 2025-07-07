import React from 'react';

const cores = [
  { nome: 'orange-1', cor: 'bg-orange-1' },
  { nome: 'orange-2', cor: 'bg-orange-2' },
  { nome: 'orange-3', cor: 'bg-orange-3' },
  { nome: 'orange-4', cor: 'bg-orange-4' },
  { nome: 'orange-5', cor: 'bg-orange-5' },
  { nome: 'orange-6', cor: 'bg-orange-6' },
  { nome: 'orange-7', cor: 'bg-orange-7' },
  { nome: 'orange-8', cor: 'bg-orange-8' },
  { nome: 'orange-9', cor: 'bg-orange-9' },
  { nome: 'orange-10', cor: 'bg-orange-10' },
  { nome: 'orange-11', cor: 'bg-orange-11' },
];

export default function ExemploCores() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {cores.map(({ nome, cor }) => (
        <div
          key={nome}
          className={`${cor} rounded-lg h-20 flex items-center justify-center shadow text-black font-semibold border border-gray-200`}
        >
          {cor}
        </div>
      ))}
    </div>
  );
} 