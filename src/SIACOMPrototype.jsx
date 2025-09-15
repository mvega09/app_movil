// SIACOM Prototype - React + Tailwind
// Canvas & Single-file prototype component
// Author: ChatGPT for Mateo Vega Castaño
// Description: Simple, functional prototype for SIACOM (hospital accompaniment app)
// - Includes: Login, Dashboard, Patient, Surgery, Contacts, Evolution modules
// - Tailwind utility classes are used. This is a single-file React component (default export).
// - Designed for quick iteration and can be split into files for production.

import React, { useState } from "react";

// Sample seed data
const SAMPLE_PATIENTS = [
  {
    id: 1,
    name: "Ana Pérez",
    age: 48,
    room: "UCI-12",
    photo: "https://via.placeholder.com/120x120.png?text=Ana",
    status: "En cirugía",
    contacts: [
      { id: 1, name: "Carlos Pérez", phone: "+57 300 123 4567", relation: "Esposo" },
    ],
    evolutions: [
      { ts: "2025-09-12T09:30:00", hr: 82, spo2: 96, notes: "Estable antes de ingresar" },
      { ts: "2025-09-12T10:45:00", hr: 88, spo2: 94, notes: "Iniciado procedimiento" },
    ],
  },
  {
    id: 2,
    name: "Juan Gómez",
    age: 62,
    room: "UCI-03",
    photo: "https://via.placeholder.com/120x120.png?text=Juan",
    status: "Recuperación",
    contacts: [
      { id: 2, name: "María López", phone: "+57 313 765 4321", relation: "Hija" },
    ],
    evolutions: [
      { ts: "2025-09-11T14:00:00", hr: 76, spo2: 97, notes: "Salida de quirófano" },
    ],
  },
];

// Small presentational components
function Topbar({ currentUser, onLogout }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-indigo-600">SIACOM</div>
        <div className="text-sm text-gray-500">Acompañamiento UCI</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-700">{currentUser?.name || "Invitado"}</div>
        <button onClick={onLogout} className="px-3 py-1 border rounded text-sm">Cerrar sesión</button>
      </div>
    </header>
  );
}

function Sidebar({ view, setView }) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "patients", label: "Pacientes" },
    { key: "surgery", label: "Cirugías" },
    { key: "contacts", label: "Contactos" },
    { key: "evolution", label: "Evolución" },
  ];
  return (
    <aside className="w-56 bg-gray-50 border-r p-4 min-h-[calc(100vh-64px)]">
      <nav className="flex flex-col gap-1">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setView(it.key)}
            className={`text-left px-3 py-2 rounded ${view === it.key ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50"}`}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SmallStat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

// Screens
function Dashboard({ patients, openPatient }) {
  const inSurgery = patients.filter((p) => p.status.toLowerCase().includes("cirug")).length;
  const recovering = patients.filter((p) => p.status.toLowerCase().includes("recuper")).length;
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SmallStat title="Pacientes" value={patients.length} />
        <SmallStat title="En cirugía" value={inSurgery} />
        <SmallStat title="En recuperación" value={recovering} />
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="font-medium mb-2">Pacientes recientes</h3>
        <ul className="divide-y">
          {patients.map((p) => (
            <li key={p.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={p.photo} alt="foto" className="w-12 h-12 rounded-full border" />
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.room} • {p.status}</div>
                </div>
              </div>
              <div>
                <button onClick={() => openPatient(p.id)} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Ver</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Patients({ patients, onSelect }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Pacientes</h2>
      <div className="grid grid-cols-1 gap-4">
        {patients.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={p.photo} alt="foto" className="w-14 h-14 rounded-md border" />
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">{p.age} años • {p.room}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onSelect(p.id)} className="px-3 py-1 rounded border text-sm">Editar</button>
              <button className="px-3 py-1 rounded bg-red-600 text-white text-sm">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Surgery({ patients, openPatient }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión Transoperatoria</h2>
      <div className="grid grid-cols-2 gap-4">
        {patients.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.status}</div>
            </div>
            <div className="text-sm text-gray-600 mb-3">Sala: {p.room}</div>
            <div className="flex gap-2">
              <button onClick={() => openPatient(p.id)} className="px-2 py-1 rounded bg-indigo-600 text-white text-sm">Detalles</button>
              <button className="px-2 py-1 rounded border text-sm">Marcar como Finalizada</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contacts({ patients }) {
  // flatten contacts
  const contacts = patients.flatMap((p) => p.contacts.map((c) => ({ ...c, patientName: p.name })));
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Contactos autorizados</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <ul className="divide-y">
          {contacts.map((c) => (
            <li key={c.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name} <span className="text-sm text-gray-400">• {c.relation}</span></div>
                <div className="text-sm text-gray-500">{c.phone} • {c.patientName}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border text-sm">Llamar</button>
                <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Notificar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Evolution({ patients }) {
  // show latest evolutions per patient
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Evolución Clínica</h2>
      <div className="grid grid-cols-1 gap-4">
        {patients.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{p.name} • {p.room}</div>
              <div className="text-sm text-gray-500">Última actualización</div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Signos vitales recientes</div>
                <div className="flex gap-3">
                  {p.evolutions.slice(-1).map((ev, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded">
                      <div className="text-sm">HR: <span className="font-semibold">{ev.hr}</span></div>
                      <div className="text-sm">SpO2: <span className="font-semibold">{ev.spo2}%</span></div>
                      <div className="text-sm text-gray-500">{new Date(ev.ts).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/3">
                <div className="text-sm text-gray-600 mb-1">Notas</div>
                <div className="bg-gray-50 p-3 rounded h-24 overflow-auto">
                  {p.evolutions.slice(-3).reverse().map((ev, i) => (
                    <div key={i} className="text-sm text-gray-700 mb-2">• {ev.notes} <span className="text-xs text-gray-400">({new Date(ev.ts).toLocaleTimeString()})</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientDetail({ patient, onBack }) {
  if (!patient) return null;
  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 px-3 py-1 rounded border text-sm">← Volver</button>
      <div className="bg-white p-6 rounded shadow-sm grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <img src={patient.photo} alt="foto" className="w-40 h-40 rounded-md border mb-4" />
          <div className="font-medium text-lg">{patient.name}</div>
          <div className="text-sm text-gray-500">{patient.age} años • {patient.room}</div>
          <div className="mt-3 text-sm">Estado: <span className="font-semibold">{patient.status}</span></div>
        </div>
        <div className="col-span-2">
          <h3 className="font-medium mb-2">Evolución (últimas entradas)</h3>
          <ul className="divide-y">
            {patient.evolutions.slice().reverse().map((e, idx) => (
              <li key={idx} className="py-3">
                <div className="text-sm text-gray-500">{new Date(e.ts).toLocaleString()}</div>
                <div className="font-medium">HR: {e.hr} • SpO2: {e.spo2}%</div>
                <div className="text-sm text-gray-700">{e.notes}</div>
              </li>
            ))}
          </ul>

          <h3 className="font-medium mt-4 mb-2">Contactos autorizados</h3>
          <ul className="divide-y">
            {patient.contacts.map((c) => (
              <li key={c.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name} <span className="text-sm text-gray-400">• {c.relation}</span></div>
                  <div className="text-sm text-gray-500">{c.phone}</div>
                </div>
                <div>
                  <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Notificar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Main app component
export default function SIACOMPrototype() {
  const [user, setUser] = useState({ name: "Dr. Lucas" });
  const [view, setView] = useState("dashboard");
  const [patients, setPatients] = useState(SAMPLE_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const openPatient = (id) => {
    setSelectedPatientId(id);
    setView("patientDetail");
  };

  const logout = () => {
    setUser(null);
    setView("login");
  };

  if (view === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">SIACOM - Iniciar sesión</h2>
          <p className="text-sm text-gray-500 mb-4">Acceso para personal médico y familiares (acceso limitado)</p>
          <button
            onClick={() => { setUser({ name: "Dr. Lucas" }); setView("dashboard"); }}
            className="w-full py-2 rounded bg-indigo-600 text-white"
          >
            Entrar como Dr. Lucas
          </button>
        </div>
      </div>
    );
  }

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Topbar currentUser={user} onLogout={logout} />
      <div className="flex flex-1">
        <Sidebar view={view} setView={setView} />
        <main className="flex-1 overflow-auto">
          {view === "dashboard" && <Dashboard patients={patients} openPatient={openPatient} />}
          {view === "patients" && <Patients patients={patients} onSelect={openPatient} />}
          {view === "surgery" && <Surgery patients={patients} openPatient={openPatient} />}
          {view === "contacts" && <Contacts patients={patients} />}
          {view === "evolution" && <Evolution patients={patients} />}
          {view === "patientDetail" && <PatientDetail patient={selectedPatient} onBack={() => setView("patients")} />}
        </main>
      </div>
    </div>
  );
}

/*
HOW TO USE:
- Paste this file into a React project (e.g. create-react-app or Vite).
- Ensure Tailwind CSS is configured in the project.
- This is a single-file prototype; split components and persist data as needed.

SUGGESTED NEXT STEPS:
- Convert screens into routes using react-router.
- Add API calls for real data (backend in Django as in your architecture doc).
- Add authentication and RBAC (role-based access control).
- Wire real-time updates for surgery status via WebSockets or SSE.
*/
