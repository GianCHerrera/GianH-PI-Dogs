import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDbTemperaments } from "../store/actions";
import { BigDiv, Campo, FlexCenterDiv, Height, InputForm, Label, SpanObligatoriedad, Tamanio } from "../Styles/CreateStyle";
import OptionSelect from "./OptionSelect";
import OptionSelectDefault from "./OptionSelectDefault";
import '../Styles/CreateStyle.css'

export default function CreateDog() {

    const [dog, setDog] = useState({});
    const [error, setError] = useState({})
    const [temperamentosAll, setTemperamentosAll] = useState(['No hay Temperamentos Seleccionados'])
    const temps = useSelector((state) => state.filteredTemperaments)
    const dispatch = useDispatch()
    const t = []
    useEffect(() => {
        dispatch(getDbTemperaments())
    }, [])
    let history = useHistory();
    let boton = document.getElementById('enviar')
    let botonTemperamentos = document.getElementById('enviarTemps')
    let str = '';

    function validarInput(e) {

        let validate;
        if (e.target.name === 'nombre') {
            if (e.target.value.length < 2) {
                setError({
                    ...error,
                    [e.target.name]: 'El nombre no puede tener solo un caracter'
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ''
                })
            }
        }
        if (e.target.name === 'alturaMaxima') {
            validate = parseFloat(e.target.value)
            if (e.target.value.length === 0) {
                setError({
                    ...error,
                    alturaMaxima: 'La altura máxima no puede estar vacía'
                })
            } else if (isNaN(validate)) {
                setError({
                    ...error,
                    alturaMaxima: 'La altura máxima tiene que ser un número'
                })
            } else if (validate >= 50 || validate < 2) {
                setError({
                    ...error,
                    alturaMaxima: 'La altura máxima no puede ser mayor a 49 pulgadas o menor a 1'
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ''
                })
            }
        }
        if (e.target.name === 'alturaMinima') {
            validate = parseFloat(e.target.value)
            console.log('saber si estado sirve', dog.alturaMaxima);
            if (validate > dog.alturaMaxima || validate < 1) {
                setError({
                    ...error,
                    [e.target.name]: 'La altura mínima no puede ser mayor a la altura maxima ni menor a 1'
                })
            } else if (isNaN(validate)) {
                setError({
                    ...error,
                    [e.target.name]: 'La altura mínima tiene que ser un número'
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ''
                })
            }
        }
        if (e.target.name === 'pesoMaximo') {
            validate = parseFloat(e.target.value)
            if (e.target.value.length <= 0) {
                setError({
                    ...error,
                    [e.target.name]: 'El peso máximo no puede estar vacío'
                })
            } else if (isNaN(validate)) {
                setError({
                    ...error,
                    [e.target.name]: 'El peso máximo tiene que ser un número'
                })
            } else if (e.target.value < 1) {
                setError({
                    ...error,
                    [e.target.name]: 'El peso máximo no puede ser 0'
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ''
                })
            }
        }
        if (e.target.name === 'pesoMinimo') {
            validate = parseFloat(e.target.value)
            if (isNaN(validate)) {
                setError({
                    ...error,
                    [e.target.name]: 'La altura mínima tiene que ser un número'
                })
            } else if (validate < 1) {
                setError({
                    ...error,
                    [e.target.name]: 'El peso mínimo no puede ser menor a 1'
                })
            } else if (validate > dog.pesoMaximo) {
                setError({
                    ...error,
                    [e.target.name]: 'El peso minimo no puede ser mayor al peso máximo'
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ''
                })
            }
        }
        if (e.target.name === 'añosDeVida') {
            validate = parseFloat(e.target.value)
            if (isNaN(validate)) {
                setError({
                    ...error,
                    [e.target.name]: 'Los años de vida tiene que ser un número'
                })
            } else if (validate <= 0 || validate > 100) {
                setError({
                    ...error,
                    [e.target.name]: 'Los años de vida no pueden ser menores a 0 ni mayores a 100'
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ''
                })
            }
        }
    }

    function onInputChange(e) {
        validarInput(e);
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        if (dog.nombre && dog.alturaMaxima && dog.pesoMaximo) {
            boton.disabled = false
        }

        // && dog.alturaMaxima && dog.alturaMaxima !== '' && dog.pesoMaximo && dog.pesoMaximo !== ''
    }

    function onSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/api/dogs/', dog)
            .then(() => {
                history.push('/main')
            }).catch(error => console.log(error))
            return false
    }

    function onClickAdd() {
        if (!(temperamentosAll[0] === 'No hay Temperamentos Seleccionados')) {
            temperamentosAll.map(z => {
                str = str + z + ', '
            })
            setDog({
                ...dog,
                temperamentos: str
            })
        }
    }
    function onSelectChange(e) {
        if (!temperamentosAll.includes(e.target.value)) {
            if (temperamentosAll[0] === 'No hay Temperamentos Seleccionados') {
                setTemperamentosAll([
                    e.target.value
                ])
            } else {

                setTemperamentosAll([
                    ...temperamentosAll,
                    e.target.value]
                )
            }
        }
    }


    return <div className="contenedorCreate">
        <BigDiv>
            <FlexCenterDiv>
                <h3 style={Tamanio}>Crea Tu Propia Raza!</h3>

                <SpanObligatoriedad>
                    <span>Los datos con * son obligatorios</span>
                </SpanObligatoriedad>
                <form onSubmit={onSubmit}>
                    <Campo>
                        <label style={Label} name='nombre' htmlFor="nombre">Nombre de Raza<span>*</span> </label>

                        <input required inp style={InputForm} onChange={onInputChange} type="text" name='nombre' value={dog.nombre} id="nombre" minLength='2' />

                    </Campo>
                    {error && error.nombre !== '' && <div>{error.nombre}</div>}
                    <br />

                    <Campo>
                        <label style={Label} htmlFor="alturaMaxima" name='alturaMaxima'>Altura Máxima<span>*</span> </label>

                        <input required style={InputForm} id="alturaMaxima" onChange={onInputChange} type="number" name='alturaMaxima' value={dog.alturaMaxima} />
                    </Campo>
                    {error && error.alturaMaxima && <div>{error.alturaMaxima}</div>}
                    <br />

                    <Campo>
                        <label style={Label} htmlFor="alturaMinima" name='alturaMinima'>Altura Mínima </label>
                        <input style={InputForm} id="alturaMinima" onChange={onInputChange} type="number" name='alturaMinima' value={dog.alturaMinima} />
                    </Campo>
                    {error && error.alturaMinima && <div>{error.alturaMinima}</div>}
                    <br />


                    <Campo>
                        <label style={Label} htmlFor="pesoMaximo" name='pesoMaximo'>Peso Máximo<span>*</span> </label>

                        <input required style={InputForm} id="pesoMaximo" onChange={onInputChange} type="number" name='pesoMaximo' value={dog.pesoMaximo} />
                    </Campo>
                    {error && error.pesoMaximo && <div>{error.pesoMaximo}</div>}
                    <br />

                    <Campo>
                        <label style={Label} htmlFor="pesoMinimo" name='pesoMinimo'>Peso Mínimo </label>

                        <input style={InputForm} id="pesoMinimo" onChange={onInputChange} type="number" name='pesoMinimo' value={dog.pesoMinimo} />
                    </Campo>
                    {error && error.pesoMinimo && <div>{error.pesoMinimo}</div>}
                    <br />

                    <Campo>
                        <label style={Label} htmlFor="añosDeVida" name='añosDeVida'>Años de Vida </label>

                        <input style={InputForm} id="añosDeVida" onChange={onInputChange} type="number" name='añosDeVida' value={dog.añosDeVida} />
                    </Campo>
                    {error && error.añosDeVida && <div>{error.añosDeVida}</div>}
                    <br />

                    <Campo>
                        <label style={Label} htmlFor="imagen" name='imagen'>Imagen </label>
                        <input style={InputForm} id="imagen" onChange={onInputChange} type="text" name='imagen' value={dog.imagen} />
                    </Campo>
                    <div className="contenedorTemperamentos">
                        <select name="agregarTemperamento" onChange={onSelectChange} className="selectTemps">

                            <OptionSelectDefault text='Agregar Temperamento' />
                            {temps.map((temperamento) => {
                                return t.push(temperamento.nombre)
                            })}
                            {
                                t.sort((a, b) => {
                                    if (a > b) {
                                        return 1;
                                    }
                                    if (a < b) {
                                        return -1;
                                    }
                                    return 0;
                                })
                            }
                            {t.map((temp, i) => {
                                return <OptionSelect value={temp} text={temp} key={i} />
                            })}
                        </select>
                        <div className="contenedorSpanTemperamentos">
                            {temperamentosAll[0] === 'No hay Temperamentos Seleccionados' ? <span className="spanTemperament"> No hay Temperamentos</span> :
                                temperamentosAll.map((e, i) => {
                                    return <span className="spanTemperament" key={i} value={e} onClick={() => {
                                        let a = temperamentosAll.indexOf(e)
                                        let b = temperamentosAll.filter(z => z !== e)
                                        setTemperamentosAll(
                                            [...b]
                                        )

                                    }}>{e} <br /> </span>
                                })
                            }
                        </div>
                    </div>

                    <span className="botonAgregarTemps" onClick={onClickAdd}   > Agregar Temperamentos Seleccioandos</span>

                    <input type="submit" value='Enviar' id="enviar" className="botonEnviar" disabled />
                </form>
            </FlexCenterDiv>
        </BigDiv>
    </div>
}