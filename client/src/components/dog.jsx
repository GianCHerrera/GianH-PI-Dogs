export default function Dog({name, image, temperamento, peso}){
    return <div> 
        <h3>{name}</h3>
        <img src={image} alt="imagen de raza" />
        <p>{temperamento}</p>
        <p>Peso Máximo: {peso} Libras</p>
    </div>
}