import Dog from './Dog';


export default function Dogs({ currentDogs }) {
  return <div>
    {
      console.log(currentDogs)
    }
    {
      currentDogs && currentDogs.map((dog) => {
        return <Dog
          id={dog.id}
          name={dog.nombre}
          image={dog.imagen}
          temperamento={dog.temperamentos}
          peso={dog.peso}
        />
      })
  }
  </div>
}