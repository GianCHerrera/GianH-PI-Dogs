import Dog from './Dog';


export default function Dogs({ currentDogs }) {
  return <div>
    {
      currentDogs && currentDogs.map((dog,i) => {
        return <Dog
          key={dog.id}
          id={dog.id}
          nombre={dog.nombre}
          imagen={dog.imagen}
          temperamentos={dog.temperamentos}
          pesoMaximo={dog.pesoMaximo}
          pesoMinimo={dog.pesoMinimo}
          alturaMaxima={dog.alturaMaxima}
          alturaMinima={dog.alturaMinima}
          añosDeVida={dog.añosDeVida}
        />
      })
  }
  </div>
}