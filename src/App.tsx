import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getAllPlayersByLastName } from './api/player-requests';
import { QPlayerCreator } from './components/q-player-creator';
import { QPlayerViewer } from './components/q-player-viewer';


const queryClient = new QueryClient();

// Sometimes you will find components with a convention endining in provider
// Your components are wrapped in between the provder tag
// that provider component will inject some functionality into every wrapped component

function App() {

  //query client provider will allow us to use custom hooks provided by react query
  return <>
  <QueryClientProvider client={queryClient}>

    <QPlayerViewer/>
    <QPlayerCreator/>
    

  </QueryClientProvider>
  </>
}

export default App;
